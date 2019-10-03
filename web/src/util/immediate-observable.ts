import { Observable } from "rxjs";
import { Query } from "@datorama/akita";

export class ImmediateObservable<A, S> extends Observable<A> {
  constructor(private readonly q: Query<S>, private readonly projection: (s: S) => A) {
    super(subscriber => {
      q.select(projection).subscribe(subscriber);
    });
  }

  get value(): A {
    return this.projection(this.q.getValue());
  }
}
