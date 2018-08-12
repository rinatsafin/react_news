import React from "react";
import PropTypes from "prop-types";
import styles from "./form.css";

class Form extends React.Component {

  constructor() {
    super();

    this.state = { title: "", date: "", display: true, author: "", text: "", };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {title, date, display, author, text, } = this.state;
    const { handleNewsItem, } = this.props;
    if (title && date && author && text) {
      const nextNews = { id: Date.now(), title, date, display,author, text, };

      handleNewsItem(nextNews);
      this.clearText();
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value, });
  }

  clearText() {
    this.setState({ title: "", date: "", display: true, author: "", text: "", });
  }

  render() {
    const { title, date, display, author, text, } = this.state;
    return (
      <form className={styles.add_news} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          className={styles.title}
          placeholder="Enter News Title"
          value={title}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="date"
          className={styles.date}
          placeholder="Enter News Date format: M d, Y"
          value={date}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="author"
          className={styles.author}
          placeholder="Enter News Author name"
          value={author}
          onChange={this.handleInputChange}
        />
        <textarea
          placeholder="Write News Text"
          name="text"
          className={styles.textarea}
          value={text}
          rows="5"
          onChange={this.handleInputChange}
        />
        <div className={styles.checkbox_wrapper}>
          <div className={styles.checkbox_label}>
            Show this News?
          </div>
          <input
            type="checkbox"
            name="display"
            className={styles.checkbox}
            value={display}
            checked={display}
            onChange={this.handleInputChange}
          />
        </div>
        <button className={styles.button} type="submit">
          Save News
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  handleNewsItem: PropTypes.func.isRequired,
};

export default Form;
