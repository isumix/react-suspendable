
export const PENDING   = undefined;
export const FULFILLED = true;
export const REJECTED  = false;

export interface Suspendable<T> {
  promise: Promise<T>;
  state?: boolean; // PENDING | FULFILLED | REJECTED
  result?: T | unknown;
}

export const makeSuspendable = <T>(promise: Promise<T>): Suspendable<T> => {
  const s: Suspendable<T> = { promise }; // PENDING

  promise.then(value => {
    s.state = FULFILLED;
    s.result = value;
  });

  promise.catch(reason => {
    s.state = REJECTED;
    s.result = reason;
  });

  return s;
};

export const useSuspendable = <T>({ promise, state, result }: Suspendable<T>): T => {
  switch (state) {
    case FULFILLED: return result as T;
    case PENDING  : throw  promise    ;
    default       : throw  result     ; // REJECTED
  }
};

export const makeSuspendableHook = <T>(promise: Promise<T>) => {
  const s = makeSuspendable(promise);

  return () => useSuspendable(s);
}
