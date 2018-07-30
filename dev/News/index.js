import React from "react";

class News extends React.Component {
  constructor() {
    super();
    this.state = { isChange: false };
    this.changeNews = this.changeNews.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
  }

  handleChange() {
    this.setState({
      isChange: true,
      title: this.props.title,
      date: this.props.date,
      display: this.props.display,
      author: this.props.author,
      text: this.props.text
    });
  }

  render() {
    const { id, remove, title, date, author, text } = this.props;
    return (
      <section className="news-item">
        {this.state.isChange ? (
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
              <label className="checkbox_label">Show this news?</label>
              <input
                className="form__checkbox"
                id={this.state.id}
                name={this.state.id}
                onChange={() => {
                  this.setState({
                    display: !this.state.display
                  });
                }}
                type="checkbox"
                checked={this.state.display}
              />
            </div>
            <button>save</button>
          </form>
        ) : (
          <div>
            <div className="news__action">
              <button
                className="action__edit"
                id={id}
                onClick={this.handleChange}
              >
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
        )}
      </section>
    );
  }
}

export default News;
