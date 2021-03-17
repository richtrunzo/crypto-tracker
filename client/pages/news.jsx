import React from 'react';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNews: null,
      searchNews: null
    };
  }

  componentDidMount() {
    fetch('/api/news', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          allNews: data
        });
      });
  }

  renderAllNews() {
    return <>
          <form className="d-flex justify-content-center input-width" onSubmit={this.onFormSubmit}>
              <input type="text" placeholder="Seach for Keywords e.g 'bitcoin'" className="input-width" onChange={this.onHandleChange}/>
              <button>Search</button>
          </form>
          <div className="d-flex flex-wrap mx-3">
            {this.state.allNews.articles.map((val, index) => {
              return <div key={index} className="col-3">
                        <p>{this.state.allNews.articles[index].source.name}</p>
                        <img src={this.state.allNews.articles[index].urlToImage} width="50" />
                        <a href={this.state.allNews.articles[index].url}><p>{this.state.allNews.articles[index].title}</p></a>
                    </div>;
            })}
          </div>
          </>;
  }

  render() {
    if (this.state.allNews === null) {
      return <>
            <div className="mt-5 d-flex justify-content-center">
                <i className="fas fa-cog fa-spin big-text"></i>
            </div>
            <div className="mt-5 d-flex justify-content-center">
                <p className="text">Loading...</p>
            </div>;
            </>;
    } else {
      return this.renderAllNews();
    }
  }
}
