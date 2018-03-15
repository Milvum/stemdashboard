import * as validator from 'validator';

interface IOptions {
  check?: (...args: any[]) => boolean;
  typecast?: any;
  optional?: boolean;
}

interface IValidationRule {
  propertyName: string;
  options: IOptions;
}

export class Validator {
  constructor(private readonly _payload: any, private readonly _rules: IValidationRule[]) { }

  public static validationRule<T>(propertyName: keyof T, options: IOptions = {}) {
    return {
      propertyName,
      options,
    } as IValidationRule;
  }

  public static idValidationRule<T>() {
    return Validator.validationRule<T>('id' as keyof T, {
      check: (val) => validator.isUUID(String(val)),
      typecast: String,
    });
  }

  public static stringValidationRule<T>(propertyName: keyof T, optional?: boolean) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => typeof val === 'string',
      typecast: String,
      optional,
    });
  }

  public static numberValidationRule<T>(propertyName: keyof T, optional?: boolean) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => validator.isFloat(String(val)),
      typecast: Number,
      optional,
    });
  }

  public static booleanValidationRule<T>(propertyName: keyof T, optional?: boolean) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => validator.isBoolean(String(val)),
      typecast: Boolean,
      optional,
    });
  }

  public static dateValidationRule<T>(propertyName: keyof T, optional?: boolean) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => validator.isISO8601(String(val)),
      typecast: (val: any) => new Date(val),
    });
  }

  public static arrayValidationRule<T>(propertyName: keyof T, options: IOptions = {}) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => {
        if (!Array.isArray(val)) {
          return false;
        }

        if (!options.check) {
          return true;
        }

        return (val as any[]).every((member) => {
          return (options.check as any)(member);
        });
      },
      typecast: (val: any[]) => {
        const typecasted = val.map((member) => (options.typecast && options.typecast(member)) || member);

        return typecasted;
      },

    });
  }

  public static enumValidationRule<T>(propertyName: keyof T, enumerator: any, optional?: boolean) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => val in enumerator,
      typecast: String,
      optional,
    });
  }

  public static colorValidationRule<T>(propertyName: keyof T, optional?: boolean) {
    return Validator.validationRule<T>(propertyName, {
      check: (val) => validator.isInt(String(val)) || typeof val === 'string',
      typecast: (val: any) => {
        if (typeof val === 'string') {
          return val;
        }

        return `rgba(${val >> 16 & 0xFF}, ${val >> 8 & 0xFF}, ${val & 0xFF}, ${val >> 24 & 0xFF})`;
      },
    });
  }

  public validate() {
    let exception;
    const payload = Object.assign({}, this._payload);

    const allOk = this._rules.every((rule) => {
      const { check, typecast, optional } = rule.options;

      if (!optional && !(rule.propertyName in this._payload)) {
        exception = `Missing property ${rule.propertyName}`;
        return false;
      }

      if (this._payload[rule.propertyName] === undefined || this._payload[rule.propertyName] === null) {
        return true;
      }

      if (check && !check(this._payload[rule.propertyName])) {
        exception = `Property ${rule.propertyName} has invalid type`;
        return false;
      }

      if (typecast) {
        payload[rule.propertyName] = typecast(this._payload[rule.propertyName]);
      }

      return true;
    });

    if (!allOk) {
      throw new Error(`${exception} -- ${JSON.stringify(this._payload)}`);
    }

    return payload;
  }
}
