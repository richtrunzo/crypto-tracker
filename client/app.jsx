import React from 'react';
import Coin from './pages/coin';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';
import News from './pages/news';
import Fomo from './pages/fomo';
import Footer from './components/footer';

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
              <Footer />
           </>;
    } else if (this.state.route.path === 'news') {
      return <>
              <Navbar />
              <News />
              <Footer />
           </>;
    } else if (this.state.route.path === 'fomo') {
      return <>
              <Navbar />
              <Fomo />
              <Footer />
           </>;
    }
  }

  render() {
    return this.renderPage();
  }
}
