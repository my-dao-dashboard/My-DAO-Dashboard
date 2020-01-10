import { ajax } from "rxjs/ajax";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { CacheMap } from "../util/cache-map";

export class MessariService {
  private readonly cache = new CacheMap<string, number>(120 * 1000);

  assetPrice(symbol: string): Observable<number> {
    const cached = this.cache.get(symbol);
    if (cached) {
      return of(cached);
    } else {
      const endpoint = `https://data.messari.io/api/v1/assets/${symbol}/metrics`;
      const response = ajax(endpoint);
      return response.pipe(
        map(r => r.response.data.market_data.price_usd as number),
        tap(price => {
          this.cache.set(symbol, price || 0)
        }),
        catchError(err => {
          console.warn(err);
          return of(0);
        })
      );
    }
  }
}
