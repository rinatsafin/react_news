import React from "react";
import PropTypes from "prop-types";
import News from "../News";

import styles from "./newslist.css";

const NewsList = props => {
  const { news, changeNews, removeNews, showNews, hideNews, } = props;
  return (
    <div className={styles.news_wrapper}>
      <nav className={styles.nav}>
        <h2>
          Nav Menu
        </h2>
        <ul>
          <li>
            <button onClick={showNews} type="button">
              show more
            </button>
          </li>
          <li>
            <button onClick={hideNews} type="button">
              hide all
            </button>
          </li>
        </ul>
      </nav>
      <main className={styles.main_content}>
        {news &&
          news.length &&
          news.map(item => {
            return item.display ? (
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
              />
            ) : null;
          })}
      </main>
      <aside className={styles.sidebar}>
        <h2>
          Sidebar
        </h2>
        <p>
          colum for not main news.
        </p>
      </aside>
    </div>
  );
};

NewsList.propTypes = {
  news: PropTypes.array.isRequired,
  changeNews: PropTypes.func.isRequired,
  removeNews: PropTypes.func.isRequired,
  showNews: PropTypes.func.isRequired,
  hideNews: PropTypes.func.isRequired,
};

export default NewsList;
