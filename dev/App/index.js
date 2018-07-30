import React from "react";

import Form from "../Form";
import NewsList from "../NewsList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      news: function() {
        const news = JSON.parse(localStorage.getItem("news")) || [];
        if (!news.length && NEWS.length) {
          localStorage.setItem("news", JSON.stringify(NEWS));
          news.push(NEWS.slice());
        } else
          news.push([
            {
              id: Date.now(),
              title: "no notes yet :(",
              date: "",
              display: false,
              author: "",
              text: ""
            }
          ]);
        return news;
      }
    };
  }

  componentWillMount() {
    const news = JSON.parse(localStorage.getItem("news"));
    if (news) this.setState({ news });
  }

  componentDidUpdate() {
    const news = JSON.stringify(this.state.news);
    localStorage.setItem("news", news);
  }

  showHiddenNewsHandler(count) {
    this.setState({ news: showHiddenNews(count) });
  }

  hideNewsHandler() {
    this.setState({ news: hideNews(this.state.news) });
  }

  addNews(news) {
    const currentNewsList = this.state.news;
    if (this.state.news[0].title == "no notes yet :(") currentNewsList.shift();
    this.setState({ news: [news, ...currentNewsList] });
  }

  removeNews(id) {
    const list = this.state.news.filter(news => news.id !== id);
    if (!list.length)
      list.push({
        id: Date.now(),
        title: "no notes yet :(",
        date: "",
        display: false,
        author: "",
        text: ""
      });
    this.setState({ news: list });
  }

  changeNews(objNews) {
    const news = this.state.news.map(newsItem => {
      if (newsItem.id === objNews.id) return objNews;
      return newsItem;
    });
    this.setState({ news });
  }

  render() {
    const { news } = this.state;
    return (
      <div className="app">
        <h1 className="app__header">Create News</h1>

        <Form handleNewsItem={this.addNews} />
        <NewsList
          news={news}
          removeNews={this.removeNews}
          changeNews={this.changeNews}
          hideNews={this.hideNewsHandler}
          showNews={() => this.showHiddenNewsHandler(2)}
        />
      </div>
    );
  }
}

export default App;
