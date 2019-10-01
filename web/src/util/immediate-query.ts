import { Query } from "@datorama/akita";
import { ImmediateObservable } from "./immediate-observable";

export class ImmediateQuery<S> extends Query<S> {
  immediate<A>(projection: (s: S) => A) {
    return new ImmediateObservable(this, projection);
  }
}
