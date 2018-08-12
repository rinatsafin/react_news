import React from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import NewsList from "../NewsList";

import styles from "./app.css";

class App extends React.Component {
  constructor(props) {
    super();
    const news = JSON.parse(window.localStorage.getItem("news")) || [];
    if (!news.length && props.news.length) {
      window.localStorage.setItem("news", JSON.stringify(props.news));
      news.push(props.news.slice());
    } else {
      news.push({
        id: Date.now(),
        title: "no notes yet :(",
        date: "",
        display: false,
        author: "",
        text: "",
      });
    }

    this.state = { news, };

    this.hideNews = this.hideNews.bind(this);
    this.showHiddenNews = this.showHiddenNews.bind(this);
    this.hideNewsHandler = this.hideNewsHandler.bind(this);
    this.addNews = this.addNews.bind(this);
    this.removeNews = this.removeNews.bind(this);
    this.changeNews = this.changeNews.bind(this);
  }

  componentWillMount() {
    const news = JSON.parse(window.localStorage.getItem("news"));
    if (news) this.setState({ news, });
  }

  componentDidUpdate() {
    const { news, } = this.state;
    const newsUpdated = JSON.stringify(news);
    window.localStorage.setItem("news", newsUpdated);
  }

  hideNews() {
    const news = JSON.parse(window.localStorage.getItem("news"));
    if (!Array.isArray(news) && !news.length) return;
    return news.map(item => {
      if (item.display) item.display = !item.display;
      return item;
    });
  }

  showHiddenNews(count) {
    const news = JSON.parse(window.localStorage.getItem("news"));
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

  showHiddenNewsHandler(count) {
    this.setState({ news: this.showHiddenNews(count), });
  }

  hideNewsHandler() {
    const { news, } = this.state;
    this.setState({ news: this.hideNews(news), });
  }

  addNews(news) {
    const { currentNewsList, }= this.state;
    if (currentNewsList[0].title == "no notes yet :(") currentNewsList.shift();
    this.setState({ news: [news, ...currentNewsList, ], });
  }

  removeNews(id) {
    const { news, } = this.state;
    const newsRemoved = news.filter(news => news.id !== id);
    if (!news.length) news.push({ id: Date.now(), title: "no notes yet :(", date: "", display: false, author: "", text: "", });
    this.setState({ news: newsRemoved, });
  }

  changeNews(objNews) {
    const { news, } = this.state;
    const newsChanged = news.map(newsItem => {
      if (newsItem.id === objNews.id) return objNews;
      return newsItem;
    });
    this.setState({ news: newsChanged, });
  }

  render() {
    const { news, } = this.state;
    return (
      <div className={styles.app}>
        <h1 className={styles.app__header}>
          Create News
        </h1>

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

App.propTypes = {
  news: PropTypes.array.isRequired,
}

export default App;
