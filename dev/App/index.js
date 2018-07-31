import React from "react";

import Form from "../Form";
import NewsList from "../NewsList";

class App extends React.Component {
  constructor(props) {
    super();
    const news = JSON.parse(localStorage.getItem("news")) || [];
    if (!news.length && props.news.length) {
      localStorage.setItem("news", JSON.stringify(props.news));
      news.push(props.news.slice());
    } else news.push({ id: Date.now(), title: "no notes yet :(", date: "", display: false, author: "", text: "" });

    this.state = { news };

    this.hideNews = this.hideNews.bind(this);
    this.showHiddenNews = this.showHiddenNews.bind(this);
    this.hideNewsHandler = this.hideNewsHandler.bind(this);
    this.addNews = this.addNews.bind(this);
    this.removeNews = this.removeNews.bind(this);
    this.changeNews = this.changeNews.bind(this);
  }

  hideNews() {
    const news = JSON.parse(localStorage.getItem("news"));
    if (!Array.isArray(news) && !news.length) return;
    return news.map(item => {
      if (item.display) item.display = !item.display;
      return item;
    });
  }

  showHiddenNews(count) {
    const news = JSON.parse(localStorage.getItem("news"));
    if (!Array.isArray(news) && !news.length) return;
    const checkType = typeof count == "undefined";
    if (news.length < count) count = news.length;
    return news.map(item => {
      if (!item.display && (count > 0 || checkType)) {
        if (!checkType) count--;
        item.display = !item.display;
      }
      return item;
    });
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
    this.setState({ news: this.showHiddenNews(count) });
  }

  hideNewsHandler() {
    this.setState({ news: this.hideNews(this.state.news) });
  }

  addNews(news) {
    const currentNewsList = this.state.news;
    if (this.state.news[0].title == "no notes yet :(") currentNewsList.shift();
    this.setState({ news: [news, ...currentNewsList] });
  }

  removeNews(id) {
    const news = this.state.news.filter(news => news.id !== id);
    if (!news.length) news.push({ id: Date.now(), title: "no notes yet :(", date: "", display: false, author: "", text: "" });
    this.setState({ news });
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
