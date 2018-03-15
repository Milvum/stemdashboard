import 'mocha';
import { assert } from 'chai';

import { Validator } from '../../main/utils/Validator';

describe('Validator module test', () => {
  interface ITestOptions {
    check?: (...args: any[]) => boolean;
    typecast?: any;
    optional?: boolean;
  }

  interface ITestObject {
    propertyName: string;
    options: ITestOptions;
  }

  it('stringValidationRule test', () => {
    assert.equal(Validator.stringValidationRule<ITestObject>('propertyName').propertyName, 'propertyName');
    assert.equal(Validator.stringValidationRule<ITestObject>('propertyName').options.typecast, String);
    assert.equal(Validator.stringValidationRule<ITestObject>('propertyName').options.optional, null);
  });

  it('idValidationRule test', () => {
    const obj: ITestObject = {
      propertyName: 'id',
      options: {
        check: () => false,
        typecast: String,
        optional: true,
      },
    };

    assert.equal(Validator.idValidationRule<ITestObject>().propertyName, obj.propertyName);
    assert.isFunction(Validator.idValidationRule<ITestObject>().options.check);
    assert.isUndefined(Validator.idValidationRule<ITestObject>().options.optional);
    assert.equal(Validator.idValidationRule<ITestObject>().options.typecast, obj.options.typecast);
  });

  it('numberValidationRule test', () => {
    const obj: ITestObject = {
      propertyName: 'propertyName',
      options: {
        check: () => false,
        typecast: Number,
        optional: true,
      },
    };

    assert.equal(Validator.numberValidationRule<ITestObject>('propertyName').propertyName, obj.propertyName);
    assert.equal(Validator.numberValidationRule<ITestObject>('propertyName').options.typecast, obj.options.typecast);
    assert.isFunction(Validator.numberValidationRule<ITestObject>('propertyName').options.check);
    assert.isUndefined(Validator.numberValidationRule<ITestObject>('propertyName').options.optional);
  });

  it('booleanValidationRule test', () => {
    const obj: ITestObject = {
      propertyName: 'propertyName',
      options: {
        check: () => false,
        typecast: Boolean,
        optional: true,
      },
    };

    assert.equal(Validator.booleanValidationRule<ITestObject>('propertyName').propertyName, obj.propertyName);
    assert.equal(Validator.booleanValidationRule<ITestObject>('propertyName').options.typecast, obj.options.typecast);
    assert.isFunction(Validator.booleanValidationRule<ITestObject>('propertyName').options.check);
    assert.isUndefined(Validator.booleanValidationRule<ITestObject>('propertyName').options.optional);
  });

  it('dateValidationRule test', () => {
    const obj: ITestObject = {
      propertyName: 'propertyName',
      options: {
        check: () => false,
        typecast: Date,
        optional: true,
      },
    };

    assert.equal(Validator.dateValidationRule<ITestObject>('propertyName').propertyName, obj.propertyName);
    assert.isFunction(Validator.dateValidationRule<ITestObject>('propertyName').options.typecast, obj.options.typecast);
    assert.isFunction(Validator.dateValidationRule<ITestObject>('propertyName').options.check);
    assert.isUndefined(Validator.dateValidationRule<ITestObject>('propertyName').options.optional);
  });

  it('arrayValidationRule test', () => {
    const obj: ITestObject = {
      propertyName: 'propertyName',
      options: {
        check: () => false,
        typecast: Date,
        optional: true,
      },
    };

    assert.equal(Validator.arrayValidationRule<ITestObject>('propertyName').propertyName, obj.propertyName);
    assert.isFunction(Validator.arrayValidationRule<ITestObject>('propertyName').options.check);
    assert.isUndefined(Validator.arrayValidationRule<ITestObject>('propertyName').options.optional);
  });

  it('enumValidationRule test', () => {
    enum EnumTest {
      test,
      build,
      Deploy,
    }

    const obj: ITestObject = {
      propertyName: 'propertyName',
      options: {
        check: () => false,
        typecast: String,
        optional: true,
      },
    };

    assert.equal(Validator.enumValidationRule<ITestObject>('propertyName', EnumTest).propertyName, obj.propertyName);
    assert.isFunction(
      Validator.enumValidationRule<ITestObject>('propertyName', EnumTest).options.typecast,
      obj.options.typecast);
    assert.isFunction(Validator.enumValidationRule<ITestObject>('propertyName', EnumTest).options.check);
    assert.isUndefined(Validator.enumValidationRule<ITestObject>('propertyName', EnumTest).options.optional);
  });

  it('colorValidationRule test', () => {
    const obj: ITestObject = {
      propertyName: 'propertyName',
      options: {
        check: () => false,
        typecast: String,
        optional: true,
      },
    };

    assert.equal(Validator.colorValidationRule<ITestObject>('propertyName').propertyName, obj.propertyName);
    assert.isFunction(
      Validator.colorValidationRule<ITestObject>('propertyName').options.typecast,
      obj.options.typecast);
    assert.isFunction(Validator.colorValidationRule<ITestObject>('propertyName').options.check);
    assert.isUndefined(Validator.colorValidationRule<ITestObject>('propertyName').options.optional);
  });
});
