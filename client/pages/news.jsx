import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  RedditIcon

} from 'react-share';
import Select from 'react-select';

const options = [{
  value: 'All News',
  label: 'All News'
}];

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNews: null,
      coins: null,
      currentCoin: null,
      searchNews: null,
      type: false
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {

    fetch('/api/news', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          allNews: data
        });
      });

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
      });
  }

  onHandleChange(currentCoin) {
    this.setState({ currentCoin });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let coin = this.state.currentCoin.label;
    if (coin === 'Theta Network') {
      coin = 'Theta crypto currency';
    }

    if (coin === 'All News') {
      this.setState({ type: false });
    } else {

      fetch(`/api/news/${coin}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          this.setState({
            searchNews: data
          });
        })
        .then(() => {
          this.setState({
            type: true
          });
        });
    }
  }

  renderAllNews() {
    const { currentCoin } = this.state;
    return <>
          <form className="font d-flex justify-content-center mt-4" onSubmit={this.onFormSubmit}>
            <Select className="input-width" onChange={this.onHandleChange} value={currentCoin} options={options} isSearchable={true} />
            <button className="font ms-3 btn btn-danger">Submit</button>
          </form>
          <div className="d-flex flex-column align-items-center mx-5 mb-4">
            {this.state.allNews.articles.map((val, index) => {
              return <div key={index} className="mt-4 border mx-2 cbackground news-width" >
                            <p className="fw-bold fs-1 font text-center white-text pt-2">{this.state.allNews.articles[index].source.name}</p>
                            <a href={this.state.allNews.articles[index].url}><p className="fst-italic font text-center white-text pt-3">Link: <span>{this.state.allNews.articles[index].title}</span></p></a>
                          <div className="d-flex justify-content-center flex-wrap mb-4">
                            <EmailShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <EmailIcon size={35} round/>
                            </EmailShareButton>
                            <FacebookShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <FacebookIcon size={35} round/>
                            </FacebookShareButton>
                            <LinkedinShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <LinkedinIcon size={35} round/>
                            </LinkedinShareButton>
                            <RedditShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <RedditIcon size={35} round/>
                            </RedditShareButton>
                            <TwitterShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <TwitterIcon size={35} round/>
                            </TwitterShareButton>
                        </div>
                    </div>;
            })}
          </div>
          </>;
  }

  renderSearchNews() {
    const { currentCoin } = this.state;
    return <>
          <form className="d-flex font justify-content-center mt-4" onSubmit={this.onFormSubmit}>
            <Select className="input-width" onChange={this.onHandleChange} value={currentCoin} options={options} isSearchable={true} />
            <button className="font ms-3 btn btn-danger">Submit</button>
          </form>
          <div className="d-flex flex-column align-items-center mx-5 mb-4">
            {this.state.allNews.articles.map((val, index) => {
              return <div key={index} className="mt-4 border mx-2 cbackground news-width" >
                            <p className="fw-bold fs-1 font text-center white-text pt-2">{this.state.searchNews.articles[index].source.name}</p>
                            <a href={this.state.searchNews.articles[index].url}><p className="fst-italic font text-center white-text pt-3">{this.state.searchNews.articles[index].title}</p></a>
                          <div className="d-flex justify-content-center flex-wrap mb-4">
                            <EmailShareButton className="mx-2" url={this.state.searchNews.articles[index].url}>
                              <EmailIcon size={35} round/>
                            </EmailShareButton>
                            <FacebookShareButton className="mx-2" url={this.state.searchNews.articles[index].url}>
                              <FacebookIcon size={35} round/>
                            </FacebookShareButton>
                            <LinkedinShareButton className="mx-2" url={this.state.searchNews.articles[index].url}>
                              <LinkedinIcon size={35} round/>
                            </LinkedinShareButton>
                            <RedditShareButton className="mx-2" url={this.state.searchNews.articles[index].url}>
                              <RedditIcon size={35} round/>
                            </RedditShareButton>
                            <TwitterShareButton className="mx-2" url={this.state.searchNews.articles[index].url}>
                              <TwitterIcon size={35} round/>
                            </TwitterShareButton>
                        </div>
                    </div>;
            })}
          </div>
          </>;

  }

  render() {
    if (this.state.allNews === null || this.state.coins === null) {
      return <>
            <div className="mt-5 d-flex justify-content-center">
                <i className="fas fa-cog fa-spin big-text"></i>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <p className="text">Loading...</p>
            </div>;
            </>;
    } else if (this.state.allNews !== null && this.state.coins !== null && this.state.type === false) {
      return this.renderAllNews();
    } else if (this.state.searchNews !== null && this.state.coins !== null && this.state.type === true) {
      return this.renderSearchNews();
    }
  }
}
