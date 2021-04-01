import React from 'react';
import priceCalc from '../lib/fomo-calculate';
import Select from 'react-select';

const options = [];

export default class Fomo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null,
      calculated: false,
      investment: null,
      coin: null,
      date: null,
      error: false,
      oldPrice: null,
      currentCash: null
    };

    this.investmentChange = this.investmentChange.bind(this);
    this.coinChange = this.coinChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.reset = this.reset.bind(this);

  }

  componentDidMount() {
    fetch('/api/market', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coins: data });
      })
      .then(() => {
        for (let i = 0; i < this.state.coins.length; i++) {
          const option = {
            value: this.state.coins[i].id,
            label: this.state.coins[i].name
          };
          options.push(option);
        }
        console.log(options);
      });

  }

  investmentChange() {
    this.setState({ investment: event.target.value });
  }

  coinChange(coin) {
    this.setState({ coin });
  }

  dateChange() {
    this.setState({ date: event.target.value });
  }

  onFormSubmit(e) {
    console.log(this.state.coin);
    e.preventDefault();

    const coin = this.state.coin.value.toLowerCase();
    const date = this.state.date;

    fetch(`/api/date/${coin}/${date}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({ error: true });
        } else {
          this.setState({ oldPrice: data });
        }
      })
      .then(fetch(`/api/coin/${coin}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            this.setState({ error: true });
          } else {
            this.setState({
              currentCash: Math.floor(priceCalc(this.state.oldPrice, data.market_data.current_price.usd, this.state.investment))
            });
          }
        })
        .then(() => {
          this.setState({ calculated: true });
        })
      );
  }

  reset() {
    this.setState({
      coins: this.state.coins,
      calculated: false,
      investment: null,
      coin: null,
      date: null,
      error: false,
      oldPrice: null,
      currentCash: null
    });
  }

  renderI() {
    const { coin } = this.state;

    return <>
            <div className="text-center mx-auto mt-5 fbackground">
              <p className="fomo-font font mt-3">Welcome to the FOMO Calculator!
              <br></br>
              <br></br>
              <span className="fomo-font font pt-3">This is where you can calculate the following:</span>
              <br></br>
              <br></br>
              <span className="pt-3 fomo-font fst-italic fw-bold">If I had invested X amount in Y cryptocurrency on Z date, today I'd have $$$.</span>
              <br></br>
              <br></br>
              <span className="pt-3 font fomo-font">Fill out the form below to calculate your FOMO!</span>
              </p>
            </div>
            <form className="mt-5 mb-5 d-flex align-items-center flex-column" onSubmit={this.onFormSubmit}>
              <input className="mt-5 fomo-width mx-auto form-control" type="text" placeholder="Initial Investment" onChange={this.investmentChange} required></input>
              <Select className ="mt-5 fomo-width" placeholder="Enter Coin Name" onChange={this.coinChange} value={coin} options={options} isSearchable={true} required />
              <input className="mt-5 fomo-width mx-auto form-control" onChange={this.dateChange} placeholder="Enter investment date: dd-mm-yyyy (i.e. 20-05-2010)" required></input>
              <button className="mt-3 mb-5 mx-auto btn btn-danger">Calculate</button>
            </form>
          </>;

  }

  renderD() {
    return <>
            <div className="fbackground mt-5 mx-auto">
              <p className="text-center fomo-font">If you invested <span className="fst-italic fw-bold">{(this.state.investment).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span> in <span className="fst-italic fw-bold">{this.state.coin.value}</span> on <span className="fst-italic fw-bold">{this.state.date}</span>, you would have <span className="fst-italic fw-bold">{(this.state.currentCash).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span> today.</p>
            </div>
            <div className="d-flex mt-5 justify-content-center">
              <button className="btn btn-danger" onClick={this.reset}>Try Again</button>
            </div>
          </>;
  }

  render() {
    console.log(options);
    if (this.state.error === true) {
      return <div className="fbackground mt-5 mx-auto">
              <p className="text-center fomo-font">Oh no, the data you're looking for was not found</p>
              <div className="d-flex mt-5 justify-content-center">
                <button className="btn btn-danger" onClick={this.reset}>Click here to try again</button>
              </div>
            </div>;
    } else if (this.state.coins === null && this.state.calculated === false) {
      return <>
            <div className="mt-5 d-flex justify-content-center">
                <i className="fas fa-cog fa-spin big-text"></i>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <p className="text">Loading...</p>
            </div>;
            </>;
    } else if (this.state.coins !== null && this.state.calculated === false) {
      return this.renderI();
    } else if (this.state.calculated === true) {
      return this.renderD();
    }
  }
}
