import { Query } from "@datorama/akita";
import { ProposalsStore, ProposalsState } from "./proposals.store";
import { Observable, zip } from "rxjs";
import { filter, map } from "rxjs/operators";
import { VoteProposal } from "../../model/vote-proposal";

export class ProposalsQuery extends Query<ProposalsState> {
  isLoading: boolean = true;
  proposals$ = this.select(s => s.proposals);
  loadedProposals$ = zip(this.selectLoading(), this.proposals$).pipe(
    filter(p => !p[0]),
    map(p => p[1])
  );
  isLoading$ = this.selectLoading();

  constructor(readonly store: ProposalsStore) {
    super(store);
    this.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  get proposals() {
    return this.getValue().proposals;
  }

  byDaoAddress(address: string): VoteProposal[] {
    return this.proposals.filter(p => p.dao.address === address);
  }

  byDaoAddress$(address: string): Observable<VoteProposal[]> {
    return this.loadedProposals$.pipe(map(ps => ps.filter(p => p.dao.address === address)));
  }
}
