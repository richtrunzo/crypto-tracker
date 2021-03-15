import React from 'react';
import Coin from './pages/coin';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  render() {
    return <>
            <Navbar />
            <Coin />
           </>;
  }
}
