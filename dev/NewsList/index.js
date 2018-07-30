import React from "react";
import News from "../News";

class NewsList extends React.Component {
  render() {
    const { news, changeNews, removeNews, showNews, hideNews } = this.props;
    return (
      <div className="news-wrapper">
        <nav className="nav">
          <h2>Nav Menu</h2>
          <ul>
            <li>
              <button onClick={showNews}>show more</button>
            </li>
            <li>
              <button onClick={hideNews}>hide all</button>
            </li>
          </ul>
        </nav>
        <main className="main-content">
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
        <aside className="sidebar">
          <h2>Sidebar</h2>
          <p>colum for not main news.</p>
        </aside>
      </div>
    );
  }
}

export default NewsList;
