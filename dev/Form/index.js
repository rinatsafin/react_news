import React from "react";

class Form extends React.Component {
  constructor() {
    super();

    this.state = { title: "", date: "", display: true, author: "", text: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.title &&
      this.state.date &&
      this.state.author &&
      this.state.text
    ) {
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
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  clearText() {
    this.setState({
      title: "",
      date: "",
      display: true,
      author: "",
      text: ""
    });
  }

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
          <label className="checkbox_label">Show this News?</label>
          <input
            type="checkbox"
            name="display"
            className="form__checkbox"
            value={display}
            checked={display}
            onChange={this.handleInputChange}
          />
        </div>
        <button className="form__button">Save News</button>
      </form>
    );
  }
}

export default Form;
