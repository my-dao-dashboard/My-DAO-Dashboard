import { ImmediateObservable } from "./immediate-observable";
import { useEffect, useState } from "react";

export function useImmediateObservable<A, S>(observable: ImmediateObservable<A, S>) {
  const [state, setState] = useState<A>(observable.value);

  useEffect(() => {
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable, observable.value]);

  return state;
}
