
# react-suspendable

### Integrates asynchronous code (Promise) within React's Suspense and Error Boundaries

> Not experimental. Available since React [16.6](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-166-shipped-the-one-with-suspense-for-code-splitting). Works with React Native.

## Description

Suppose we want to use a `Promise` in our `<CustomComponent>`

```html
<Exception fallback="Rejected">
  <Suspense fallback="Pending">
    <CustomComponent /> has asynchronous code and could throw exceptions
  </Suspense>
</Exception>
```

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) has three distinct states:

- *PENDING* - will render *"Pending"* by [\<Suspense>](https://reactjs.org/docs/concurrent-mode-suspense.html)
- *REJECTED* - will render *"Rejected"* by [\<Exception>](https://github.com/isumix/react-exception#readme), which is an [Error Boundary](https://reactjs.org/docs/error-boundaries.html) implementation
- *FULFILLED* - will finally render our `<CustomComponent>`

## Install

```sh
npm install --save @isumix/react-suspendable
```

```sh
yarn add @isumix/react-suspendable
```

## Example

> [Play with **web** example in codesandbox.io](https://codesandbox.io/s/damp-platform-w9t0q?file=/src/App.tsx)

> [Play with **native** example in snack.expo.io](https://snack.expo.io/@isumix/react-suspendable)

```tsx
import React, { Suspense } from "react";
import { makeSuspendableHook } from "@isumix/react-suspendable";

const promise = new Promise<string>(resolve => {
  setTimeout(() => resolve("DELAYED"), 5000);
});

const useDelayedValue = makeSuspendableHook(promise);

const CustomComponent = () => {
  const val = useDelayedValue();
  return (
    <p>
      This component has a <b>{val}</b> value.
    </p>
  );
};

export default () => (
  <Suspense fallback={<i>Waiting...</i>}>
    <CustomComponent />
  </Suspense>
);
```

# makeSuspendableHook

Create a new [Hook](https://reactjs.org/docs/hooks-intro.html) from a `Promise` and return it

```ts
const useDelayedValue = makeSuspendableHook(promise);
```

> This is all you going to need

# For library writers

## makeSuspendable

Create a new `suspendable` object from a `Promise` and return it

```ts
const suspendable = makeSuspendable(promise);
```

## useSuspendable

Hook that uses `suspendable` object and returns *FULFILLED* value or `throw`s an exception

```ts
const val = useSuspendable(suspendable);
```
