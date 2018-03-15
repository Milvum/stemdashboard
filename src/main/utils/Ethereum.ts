import PartyManager, { ICandidate, IParty } from 'candidates';

import Axios from 'axios';

// point this to the location of ballot-dispenser
const endpoint = 'http://localhost:8080/votes';

interface IVoteBalance {
  address: string;
  amount: number;
}

interface IVoteCount {
  votes: number;
}

interface IVoteParty extends IParty, IVoteCount {
  candidates: Array<ICandidate & IVoteCount>;
}

abstract class Ethereum {
  private static getVoteAmount(votes: IVoteBalance[], address: string): number {
    const index = votes.findIndex((voteBalance) => Ethereum.addressesAreEqual(voteBalance.address, address));

    let voteAmount = 0;
    if (index >= 0) {
      voteAmount = votes[index].amount;
    }

    return voteAmount;
  }

  private static async getVotes() {
    const response = await Axios.get(endpoint);

    return response.data as IVoteBalance[];
  }

  public static async getResults(): Promise<IVoteParty[]> {
    const voteBalances = await Ethereum.getVotes();

    return PartyManager.parties.map((party, index) => {
      const candidates: Array<ICandidate & IVoteCount> = party.candidates.map((candidate) => ({
        ...candidate,
        votes: Ethereum.getVoteAmount(voteBalances, candidate.address),
      }));

      const votes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

      return {
        ...party,
        candidates,
        votes,
      };
    });
  }

  // Check for equalness of addresses regardless of 0x prefix
  public static addressesAreEqual(addr1: string, addr2: string): boolean {
    const addr1Copy = addr1.replace('0x', '');
    const addr2Copy = addr2.replace('0x', '');

    return addr1Copy === addr2Copy;
  }
}

export {
  Ethereum,
  IVoteParty,
};
