import { Query } from "@datorama/akita";
import { ProposalsStore, ProposalsState } from "./proposals.store";
import { zip } from "rxjs";
import { filter, map } from "rxjs/operators";

export class ProposalsQuery extends Query<ProposalsState> {
  isLoading: boolean = true;
  proposals$ = this.select(s => s.proposals);
  loadedProposals$ = zip(this.selectLoading(), this.proposals$).pipe(
    filter(p => !p[0]),
    map(p => p[1])
  );

  constructor(readonly store: ProposalsStore) {
    super(store);
    this.selectLoading().subscribe(isLoading => {
      console.log("setloading", isLoading);
      this.isLoading = isLoading;
    });
  }

  get proposals() {
    return this.getValue().proposals;
  }
}
