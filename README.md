# Typed Emitter

A simple event emitter with zero dependency, type safety and auto completion support.

## Usage

Example code

```ts
import { Emitter } from "@dao3fun/typed-emitter";

// Events
export enum Events {
  MouseDown,
  MouseMove,
}

// Types
export type ServerEventType = {
  [Events.MouseDown]: {
    x: number;
    y: number;
  };
  [Events.MouseMove]: {
    dx: number;
    dy: number;
  };
};

// event emitter
const emitter = new Emitter<
  typeof Events,
  ServerEventType
>();

// register listener
const listener = emitter.on(Events.MouseDown, ({x, y}) => {
  console.log(`Mouse down at (${x}, ${y})`);
})

// emit event
emitter.emit(Events.MouseMove, {dx: 1, dy: 2});

// unregister listener
listener.cancel();
```