const NEWS = [
  {
    id: 1,
    title: "First news title Item",
    author: "First author: Valera",
    display: true,
    date: "Jun 03, 2018",
    text: "First News: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  },
  {
    id: 2,
    title: "Second news title Item",
    author: "Second author: Ololo",
    display: true,
    date: "Jun 13, 2018",
    text: "Second News: There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
  },
  {
    id: 3,
    title: "First Hidden news title Item",
    author: "First Hidden author: NeValera",
    date: "Jul 9, 2018",
    display: false,
    text: "First Hidden News: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dictum ullamcorper. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
  },
  {
    id: 4,
    title: "Second Hidden news title Item",
    author: "Second Hidden author: NeOlolo",
    date: "Jul 14, 2018",
    display: false,
    text: "Second Hidden News: Nullam leo libero, gravida ut mollis eget, feugiat ut libero. Curabitur ac diam nec tortor sodales scelerisque. Donec tortor nunc, consequat in sapien eu, eleifend auctor ipsum."
  },
  {
    id: 5,
    title: "Third Hidden news title Item",
    author: "Third Hidden author: NeValera2",
    date: "Jul 19, 2018",
    display: false,
    text: "Third Hidden News: Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
  },
  {
    id: 6,
    title: "Last Hidden news title Item",
    author: "Last Hidden author: NeValera2",
    date: "Jul 21, 2018",
    display: false,
    text: "Last Hidden News: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec et pretium ipsum, in dignissim massa. Nunc at massa non nisl varius ultricies id id risus. Donec tincidunt libero id lectus euismod tincidunt. Vestibulum congue lacus eget quam auctor aliquet. Cras pretium magna quis arcu accumsan, id commodo urna fermentum. In auctor massa in erat vestibulum congue. Suspendisse semper ipsum eget turpis sodales facilisis."
  }
];

const hideNews = () => {
  const news = JSON.parse(localStorage.getItem("news"));
  if (!Array.isArray(news) && !news.length) return;
  return news.map(item => {
    if (item.display) item.display = !item.display;
    return item;
  });
};

const showHiddenNews = (count) => {
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
};

const News = React.createClass({
  getInitialState() {
    return {
      isChange: false
    };
  },

  changeNews(e) {
    e.preventDefault();
    const changeNews = {
      id: this.props.id,
      title: this.state.title,
      date: this.state.date,
      display: this.state.display,
      author: this.state.author,
      text: this.state.text
    };
    this.props.change(changeNews);

    this.setState({
      isChange: false
    });
  },

  handleChange() {
    this.setState({
      isChange: true,
      title: this.props.title,
      date: this.props.date,
      display: this.props.display,
      author: this.props.author,
      text: this.props.text
    });
  },

  render() {
    const { id, remove, title, date, author, text } = this.props;
    return (
      <section className="news-item">
        {
          this.state.isChange ? (
            <form onSubmit={this.changeNews} className="news-change">
              <input
                onChange={e =>                 
                  this.setState({
                    title: e.target.value
                  })
                }
                type="text"
                value={this.state.title}
              />
              <input
                onChange={e =>                 
                  this.setState({
                    date: e.target.value
                  })
                }
                type="text"
                value={this.state.date}
              />
              <input
                onChange={e =>                 
                  this.setState({
                    author: e.target.value
                  })
                }
                type="text"
                value={this.state.author}
              />
              <input
                onChange={e =>                 
                  this.setState({
                    text: e.target.value
                  })
                }
                type="text"
                value={this.state.text}
              />
              <div className="checkbox_wrapper">
                <label className="checkbox_label">
                  Show this news?
                </label>
                <input
                    className="form__checkbox"
                    id={this.state.id}
                    name={this.state.id}
                    onChange={() => {
                        this.setState({
                          display: !this.state.display
                        })
                      }
                    }
                    type="checkbox"
                    checked={this.state.display}
                  />
              </div>
              <button>save</button>
            </form>
          ) 
          :(
            <div>
              <div className="news__action">
                <button className="action__edit" id={id} onClick={this.handleChange}>
                    (e)dit
                </button>
                <button className="action__remove" onClick={() => remove(id)}>
                    remove (x)
                </button>
              </div>
              <div className="news-header">
                <div className="header__title">{title}</div>
                <div className="header__date">{date}</div>
              </div>
              <div className="news-author">{author}</div>
              <div className="news-text">{text}</div>
          </div>
          )
        }
      </section>
    );
  }
});

const NewsList = React.createClass({
  render() {
    const { news, changeNews, removeNews, showNews, hideNews } = this.props;
    return (
      <div className="news-wrapper">
        <nav className="nav">
          <h2>Nav Menu</h2>
          <ul>
            <li>
              <button onClick={showNews}>
                show more
              </button>
            </li>
            <li>
              <button onClick={hideNews}>hide all</button>
            </li>
          </ul>
        </nav>
        <main className="main-content">
          {
            news && news.length &&
              news.map(item => {
                return (
                  item.display ? 
                  <News
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    date={item.date}
                    display={item.display}
                    author={item.author}
                    change={changeNews}
                    remove={removeNews}
                    text={item.text}
                  /> : null
                )
              })
            }
        </main>
        <aside className="sidebar">
          <h2>Sidebar</h2>
          <p>colum for not main news.</p>
        </aside>
      </div>
    );
  }
});

const Form = React.createClass({
  getInitialState() {
    return {
      title: "",
      date: "",
      display: true,
      author: "",
      text: ""
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text) {
      const nextNews = {
        id: Date.now(),
        title: this.state.title,
        date: this.state.date,
        display: this.state.display,
        author: this.state.author,
        text: this.state.text
      };

      this.props.handleNewsItem(nextNews);
      this.clearText();
    }
  },
  
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  },

  clearText() {
    this.setState({
      title: "",
      date: "",
      display: true,
      author: "",
      text: ""
    });
  },

  render() {
    const { title, date, display, author, text } = this.state;
    return (
      <form className="form__add_news" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          className="form__title"
          placeholder="Enter News Title"
          value={title}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="date"
          className="form__date"
          placeholder="Enter News Date format: M d, Y"
          value={date}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="author"
          className="form__author"
          placeholder="Enter News Author name"
          value={author}
          onChange={this.handleInputChange}
        />
        <textarea
          placeholder="Write News Text"
          name="text"
          className="form__textarea"
          value={text}
          rows="5"
          onChange={this.handleInputChange}
        />
        <div className="checkbox_wrapper">
          <label className="checkbox_label">
            Show this News?
          </label>
          <input
            type="checkbox"
            name="display"
            className="form__checkbox"
            value={display}
            checked={display}
            onChange={this.handleInputChange}/>
        </div>
        <button className="form__button">Save News</button>
      </form>
    );
  }
});

const App = React.createClass({
    getInitialState() {
      const news = JSON.parse(localStorage.getItem("news")) || [];
      if (!news.length && NEWS.length) {
        localStorage.setItem("news", JSON.stringify(NEWS));
        news.push(NEWS.slice());
      } else news.push([ { id: Date.now(), title: "", date: "", display: false, author: "", text: "" }]);
      return { news };
    },

    componentWillMount() {
      const news = JSON.parse(localStorage.getItem("news"));
      if (news) this.setState({ news });
    },

    componentDidUpdate() {
      const news = JSON.stringify(this.state.news);
      localStorage.setItem("news", news);
    },

    showHiddenNewsHandler(count) {
      this.setState({ news: showHiddenNews(count) });
    },
  
    hideNewsHandler() {
      this.setState({ news: hideNews(this.state.news) });
    },

    addNews(news) {
      const currentNewsList = this.state.news;
      if (this.state.news[0].title == "no notes yet :(") currentNewsList.shift();
      this.setState({ news: [news, ...currentNewsList] });
    },

    removeNews(id) {
      const list = this.state.news.filter(news => news.id !== id);
      if (!list.length) list.push({ id: Date.now(), title: "no notes yet :(", date: "", display: false, author: "", text: "" });
      this.setState({ news: list });
    },

    changeNews(objNews) {
      const news = this.state.news.map(newsItem => {
        if (newsItem.id === objNews.id) return objNews;      
        return newsItem;
      });
      this.setState({ news });
    },

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
  });
  
ReactDOM.render(<App />, document.querySelector("#app"));