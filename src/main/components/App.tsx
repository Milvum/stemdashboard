import * as React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import * as classnames from 'classnames';

import {
  HomePage,
} from '../components/pages/';

export default class App extends React.Component<{}, {}> {
  public render() {
    const modernizr = (window as any).Modernizr;

    return (
      <Router>
        <MuiThemeProvider>
          <div
            className={classnames({
              application: true,
              touch: modernizr && modernizr.touchevents,
            })}
          >
            <Route exact path="/" component={HomePage} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
