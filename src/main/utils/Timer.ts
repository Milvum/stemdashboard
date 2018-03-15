import { Event } from './Event';

export interface ITimerEvent {
  totalTime: number;
  expiredTime: number;
  remainingTime: number;
  tickNumber: number;
}

export class Timer {
  private readonly _onTick: Event<Timer, ITimerEvent> = new Event<Timer, ITimerEvent>();
  private readonly _onEnd: Event<Timer, void> = new Event<Timer, void>();

  private _timer: number | null;
  private _time: Date;
  private _tick: number;

  public get OnTick(): Event<Timer, ITimerEvent> { return this._onTick; }
  public get OnEnd(): Event<Timer, void> { return this._onEnd; }

  public constructor(
    private _duration: number,
    private _interval: number,
    private _belowZero: boolean = false,
  ) { }

  public start(): void {
    if (this._timer !== null) {
      this.stop();
    }

    this._tick = 0;

    this._time = new Date();

    this._timer = setInterval(() => { this.processInterval(); }, this._interval) as any as number;
  }

  private processInterval(): void {
    const currentTime = new Date();

    const timeDiff = currentTime.getTime() - this._time.getTime();
    const remainingTime = this._duration - timeDiff;

    this._onTick.invoke(this, {
      totalTime: this._duration,
      expiredTime: timeDiff,
      remainingTime,
      tickNumber: ++this._tick,
    });

    if (remainingTime < this._interval && !this._belowZero) {
      this.stop();
    }
  }

  public stop(): void {
    if (this._timer === null) {
      return;
    }

    clearInterval(this._timer);
    this._timer = null;

    this._onEnd.invoke(this);
  }
}
