export abstract class Belt {
  private static _offsetToServer = 0;

  public static strEnum<T extends string>(o: T[]) {
    return o.reduce((res, key) => {
      res[key] = key;

      return res;
    }, Object.create(null)) as {[K in T]: K};
  }

  public static formatTimer(timer: number, minutesOnly: boolean = false) {
    let minutes = timer / 60;
    minutes = timer < 0 ? Math.ceil(minutes) : Math.floor(minutes);

    const seconds = Math.floor(Math.abs(timer) % 60);
    let formattedTime = `${timer < 0 && minutes === 0 ? '-' : ''}${minutes.toString()}`;

    if (!minutesOnly) {
      formattedTime += `:${(seconds < 10 ? `0${seconds}` : seconds)}`;
    }

    return formattedTime;
  }

  public static setOffset(serverTime: Date) {
    this._offsetToServer = new Date().getTime() - serverTime.getTime();
  }

  public static timeToMs({ minutes = 0, seconds = 0 }): number {
    return (Math.max(0, minutes) * 60 + Math.max(0, Math.min(59, seconds))) * 1000;
  }
}
