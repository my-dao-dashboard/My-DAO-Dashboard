import { Indexed } from "./indexed";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { hot } from "jest-marbles";

export function withEffect<A>(timeline: string, values: Indexed<A>, sideEffect: (t: A) => void): Observable<A> {
  return hot(timeline, values).pipe(tap(t => sideEffect(t)));
}
