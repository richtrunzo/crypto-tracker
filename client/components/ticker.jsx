import React from 'react';
import Ticker from 'react-ticker';

export default class Tick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null
    };
    this.renderTick = this.renderTick.bind(this);
  }

  componentDidMount() {
    fetch('/api/market', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coins: data });
      });
  }

  renderTick() {
    return <Ticker className="pt-5 mt-5 grey" offset="10%" speed={8}>
      {() => (
        <div className="d-flex justify-content-center grey">
        {this.state.coins.map((val, index) => (
           <>
            <img className="ms-5 mt-3" src={val.image} width="30" height="30"></img>
            <p className="ms-1 mt-3 white-text">{ (val.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </>
        ))
  }</div>
      )}
    </Ticker>;

  }

  render() {
    if (this.state.coins === null) {
      return <div className="mt-5 d-flex justify-content-center">
                <p className="font">Loading...</p>
                <i className="fas fa-cog fa-spin"></i>
            </div>;

    } else {
      return this.renderTick();
    }
  }

}
