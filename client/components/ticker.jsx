import React from 'react';
import Ticker from 'react-ticker';

export default class Tick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null
    };
    this.renderTick = this.renderTick.bind(this);
    this.mapCoins = this.mapCoins.bind(this);
  }

  componentDidMount() {
    fetch('/api/market', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coins: data });
        console.log(this.state.coins);
      });
  }

  mapCoins() {
    this.state.coins.map((val, index) => {
      return <p key={index}>{`${val.symbol.toUpperCase()}: ${(val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}</p>;
    });
  }

  renderTick() {
    return <Ticker className="pt-5 grey" offset="10%" speed={10}>
      {() => (
        <div className="d-flex justify-content-center grey">
        {this.state.coins.map((val, index) => (
           <>
            <img className="ms-5 mt-3" src={val.image} width="30" height="30"></img>
            <p className="ms-1 mt-3">{ (val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </>
        ))
  }</div>
      )}
    </Ticker>;

  }

  render() {
    if (this.state.coins === null) {
      return <div>test</div>;
    } else {
      return this.renderTick();
    }
  }

}
