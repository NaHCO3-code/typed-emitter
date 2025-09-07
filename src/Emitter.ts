/**
 * A simple event emitter with type safety.
 * @license MIT
 * @author Surfish
 */

type EnumLike = Record<string, string | number>;

export interface Listener {
  index: symbol;
  cancel(): void;
}

export class Emitter<
  Events extends EnumLike,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Types extends { [K in Events[keyof Events]]: Record<string, any> },
> {
  listeners: Map<
    Events[keyof Events],
    Map<symbol, (ev: Types[Events[keyof Events]]) => void>
  > = new Map();
  emit<T extends Events[keyof Events]>(event: T, ev: Types[T]) {
    this.listeners.get(event)?.forEach((callback) => callback(ev));
  }
  on<T extends Events[keyof Events]>(
    event: T,
    callback: (ev: Types[T]) => void
  ): Listener {
    const eventMap: Map<symbol, (ev: Types[T]) => void> =
      this.listeners.get(event) ?? new Map();
    const index = Symbol();
    eventMap.set(index, callback);
    this.listeners.set(
      event,
      eventMap as Map<symbol, (ev: Types[Events[keyof Events]]) => void>
    );
    return {
      index,
      cancel: () => {
        eventMap.delete(index);
      },
    };
  }
}
