import { Indexed } from "./indexed";
import { Observable, zip } from "rxjs";
import { map, tap } from "rxjs/operators";
import { hot } from "jest-marbles";

export function runEffect<A>(timeline: string, values: Indexed<A>, sideEffect: (t: A) => void): Observable<A> {
  return hot(timeline, values).pipe(tap(t => sideEffect(t)));
}

export function withEffect<A, B>(a: Observable<A>, b: Observable<B>): Observable<B> {
  return zip(a, b).pipe(map(t => t[1]));
}
