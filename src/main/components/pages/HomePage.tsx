import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Avatar,
  FontIcon,
} from 'material-ui';

import { Ethereum, IVoteParty } from '../../utils/';
import Page from './Page';

interface IProps extends RouteComponentProps<{}> {
  isLoading: boolean;
}

interface IState {
  votingResults: IVoteParty[] | null;
}

export default class HomePage extends React.Component<IProps, IState> {
  public state: IState = {
    votingResults: null,
  };

  public componentDidMount() {
    Ethereum.getResults().then((votingResults) => this.setState({ votingResults }));
  }

  public render() {
    const { votingResults } = this.state;

    if (votingResults === null) {
      return <Page className="home-page" />;
    }

    return (
      <Page className="home-page">
        {
          (votingResults).sort((p1, p2) => (p2.votes - p1.votes)).map((party) => (
            <Card key={party.name} className="party-card">
              <CardHeader
                className="party-card__header"
                avatar={<Avatar icon={<FontIcon className="material-icons">supervisor_account</FontIcon>} />}
                title={party.name}
                subtitle={`${party.votes} stemmen`}
                titleColor="white"
                subtitleColor="lightgrey"
              />
              <div className="party">
                {
                  party.candidates.sort((c1, c2) => (c2.votes - c1.votes)).map((candidate, index) => (
                    <div key={candidate.name} className="member">
                      <div className="member__content">
                        <div className="member__rank">
                          {index > 0 && party.candidates[index - 1].votes === candidate.votes ? '--' : `${index + 1}.`}
                        </div>
                        <div className="member__name">{candidate.name}</div>
                        <div className="member__votes">{candidate.votes}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </Card>
          ))
        }
      </Page>
    );
  }
}
