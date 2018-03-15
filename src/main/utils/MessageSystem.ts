// tslint:disable:no-console

export abstract class MessageSystem {
  public static log(message?: any, ...optionalParams: any[]) {
    if (APP_CONFIG.debug) {
      console.log(message, ...optionalParams);
    }
  }

  public static warn(message?: any, ...optionalParams: any[]) {
    if (APP_CONFIG.debug) {
      console.warn(message, ...optionalParams);
    }
  }

  public static error(message?: any, ...optionalParams: any[]) {
    if (APP_CONFIG.debug) {
      console.error(message, ...optionalParams);
    }
  }
}
