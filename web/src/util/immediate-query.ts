import { Query } from "@datorama/akita";
import { ImmediateObservable } from "./immediate-observable";

export class ImmediateQuery<S> extends Query<S> {
  immediate<A>(projection: (s: S) => A): ImmediateObservable<A, S> {
    return new ImmediateObservable(this, projection);
  }
}
