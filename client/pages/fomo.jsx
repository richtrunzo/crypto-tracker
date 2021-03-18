import React from 'react';

export default class Fomo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null,
      calculated: false
    };
  }

  componentDidMount() {
    fetch('/api/market', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({ coins: data });
      });

    fetch('/api/date', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  renderI() {
    return <div>
            <div className="mx-auto d-flex justify-content-center flex-column name-width">
              <p>Welcome to the FOMO Calculator!<br></br>
              This is where you can calculate the following: <br></br>
              If I had invested X amount in Y cryptocurrency on Z date, today I'd have $$$.<br></br>
              Fill out the form below to calculate your FOMO!
              </p>
            </div>
            <form className="mx-auto d-flex justify-content-center flex-column name-width">
              <input id="investment" type="text" placeholder="Initial Investment"></input>
              <select id="coin">
                {this.state.coins.map((val, index) => {
                  return <option key={index}>{val.name}</option>;
                })}
              </select>
              <input id="date" placeholder="Enter investment date: dd-mm-yyyy (i.e. 05-20-2010)"></input>
              <button>Calculate</button>
            </form>
          </div>;

  }

  render() {
    if (this.state.coins === null) {
      return <div>test</div>;
    } else {
      return this.renderI();
    }
  }
}
