import React from 'react';
import Coin from './pages/coin';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';
import News from './pages/news';
import Fomo from './pages/fomo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  renderPage() {
    if (this.state.route.path === '') {
      return <>
              <Navbar />
              <Coin />
           </>;
    } else if (this.state.route.path === 'news') {
      return <>
              <Navbar />
              <News />
           </>;
    } else if (this.state.route.path === 'fomo') {
      return <>
              <Navbar />
              <Fomo />
           </>;
    }
  }

  render() {
    return this.renderPage();
  }
}
