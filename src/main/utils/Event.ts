export class Event<S, T> {
  private _handlers: Array<(sender?: S, data?: T) => void> = [];

  public on(handler: (sender?: S, data?: T) => void) {
    this._handlers.push(handler);
  }

  public off(handler: (sender?: S, data?: T) => void) {
    this._handlers = this._handlers.filter((h) => h !== handler);
  }

  public invoke(sender?: S, data?: T) {
    this._handlers.forEach((h) => h(sender, data));
  }

  public get totalHandlers(): number {
    return this._handlers.length;
  }
}
