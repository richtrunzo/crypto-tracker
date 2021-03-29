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
      });
  }

  onHandleChange() {
    this.setState({ currentCoin: event.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let coin = this.state.currentCoin + ' crypto currency';
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
    return <>
          <form className="d-flex justify-content-center mt-4 input-width" onSubmit={this.onFormSubmit}>
            <label className="ms-3" htmlFor="sort">View News By Coin:</label>
            <select defaultValue="All News" name="sort" className="ms-3" onChange={this.onHandleChange}>
               <option>All News</option>
                {this.state.coins.map((val, index) => {
                  return <option key={index}>{val.name}</option>;
                })}
            </select>
            <button>Submit</button>
          </form>
          <div className="d-flex flex-column align-items-center mx-5 mb-4">
            {this.state.allNews.articles.map((val, index) => {
              return <div key={index} className="mt-4 border mx-2 cbackground news-width" >
                            <p className="text-center white-text pt-2">{this.state.allNews.articles[index].source.name}</p>
                            <a href={this.state.allNews.articles[index].url}><p className="text-center white-text pt-3">{this.state.allNews.articles[index].title}</p></a>
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
    return <>
          <form className="d-flex justify-content-center input-width" onSubmit={this.onFormSubmit}>
            <label className="ms-3" htmlFor="sort">View News By Coin:</label>
            <select defaultValue="All News" name="sort" className="ms-3" onChange={this.onHandleChange}>
                <option>All News</option>
                {this.state.coins.map((val, index) => {
                  if (index < 51) {
                    return <option key={index}>{val.name}</option>;
                  }
                })}
            </select>
            <button>Submit</button>
          </form>
          <div className="d-flex flex-column justify-content-center mx-5 mb-4">
            {this.state.searchNews.articles.map((val, index) => {
              return <div key={index} className="col d-flex mt-4 border mx-2 cbackground" >
                        <div>
                          <img className="ms-4 mt-4 mb-4 border" src={this.state.searchNews.articles[index].urlToImage} width="300" height="150"/>
                        </div>
                        <div className="ms-5 col-6">
                          <p className="text-center white-text pt-2">{this.state.searchNews.articles[index].source.name}</p>
                          <a href={this.state.searchNews.articles[index].url}><p className="text-center white-text pt-3">{this.state.searchNews.articles[index].title}</p></a>
                          <div className="d-flex justify-content-center">
                            <EmailShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <EmailIcon size={32} round/>
                            </EmailShareButton>
                            <FacebookShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <FacebookIcon size={32} round/>
                            </FacebookShareButton>
                            <LinkedinShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <LinkedinIcon size={32} round/>
                            </LinkedinShareButton>
                            <RedditShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <RedditIcon size={32} round/>
                            </RedditShareButton>
                            <TwitterShareButton className="mx-2" url={this.state.allNews.articles[index].url}>
                              <TwitterIcon size={32} round/>
                            </TwitterShareButton>
                          </div>
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
