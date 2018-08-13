import React from "react";
import PropTypes from "prop-types";

import styles from "./news.css";
import exampleNewsImg from "./example_news.jpg";

class News extends React.Component {
  constructor() {
    super();
    this.state = { isChange: false, };
    this.changeNews = this.changeNews.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeNews(e) {
    e.preventDefault();
    const { title, date, display, author, text, } = this.state;
    const { id, change, } = this.props;
    const changedNews = { id, title, date, display, author, text, };
    change(changedNews);

    this.setState({ isChange: false, });
  }

  handleChange() {
    const { title, date, display, author, text, } = this.props;
    this.setState({ isChange: true, title, date, display, author,text, });
  }

  render() {
    const { id, remove, title, date, author, text, } = this.props;
    const { isChange, id: sId, date: sDate, display, author: sAuthor, title: sTitle, text: sText,} = this.state;
    return (
      <section className={styles.item}>
        { isChange ? (
          <form onSubmit={this.changeNews} className={styles.change}>
            <input
              onChange={e =>
                this.setState({
                  title: e.target.value,
                })
              }
              type="text"
              value={sTitle}
            />
            <input
              onChange={e =>
                this.setState({
                  date: e.target.value,
                })
              }
              type="text"
              value={sDate}
            />
            <input
              onChange={e =>
                this.setState({
                  author: e.target.value,
                })
              }
              type="text"
              value={sAuthor}
            />
            <input
              onChange={e =>
                this.setState({
                  text: e.target.value,
                })
              }
              type="text"
              value={sText}
            />
            <div className={styles.checkbox_wrapper}>
              <div className={styles.checkbox_label}>
                Show this news?
              </div>
              <input
                className={styles.checkbox}
                id={sId}
                name={sId}
                onChange={() => {
                  this.setState({ display: !display, });
                }}
                type="checkbox"
                checked={display}
              />
            </div>
            <button type="submit">
              save
            </button>
          </form>
        ) : (
          <div>
            <div className={styles.action}>
              <button
                className={styles.action__edit}
                id={id}
                onClick={this.handleChange}
                type="submit"
              >
                (e)dit
              </button>
              <button
                className={styles.action__remove}
                onClick={() => remove(id)}
                type="submit"
              >
                remove (x)
              </button>
            </div>
            <div className={styles.header}>
              <div className={styles.header__title}>
                {title}
              </div>
              <div className={styles.header__date}>
                {date}
              </div>
            </div>
            <img src={exampleNewsImg} alt="" className={styles.prew} />
            <div className={styles.news_author}>
              {author}
            </div>
            <div className={styles.news_text}>
              {text}
            </div>
          </div>
        )}
      </section>
    );
  }
}

News.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
}

export default News;
