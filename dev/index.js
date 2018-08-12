import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const NEWS = [
  {
    id: 1,
    title: "First news title Item",
    author: "First author: Valera",
    display: true,
    date: "Jun 03, 2018",
    text:
      "First News: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 2,
    title: "Second news title Item",
    author: "Second author: Ololo",
    display: true,
    date: "Jun 13, 2018",
    text:
      "Second News: There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
  },
  {
    id: 3,
    title: "First Hidden news title Item",
    author: "First Hidden author: NeValera",
    date: "Jul 9, 2018",
    display: false,
    text:
      "First Hidden News: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam bibendum dictum ullamcorper. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;",
  },
  {
    id: 4,
    title: "Second Hidden news title Item",
    author: "Second Hidden author: NeOlolo",
    date: "Jul 14, 2018",
    display: false,
    text:
      "Second Hidden News: Nullam leo libero, gravida ut mollis eget, feugiat ut libero. Curabitur ac diam nec tortor sodales scelerisque. Donec tortor nunc, consequat in sapien eu, eleifend auctor ipsum.",
  },
  {
    id: 5,
    title: "Third Hidden news title Item",
    author: "Third Hidden author: NeValera2",
    date: "Jul 19, 2018",
    display: false,
    text:
      "Third Hidden News: Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    id: 6,
    title: "Last Hidden news title Item",
    author: "Last Hidden author: NeValera2",
    date: "Jul 21, 2018",
    display: false,
    text:
      "Last Hidden News: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec et pretium ipsum, in dignissim massa. Nunc at massa non nisl varius ultricies id id risus. Donec tincidunt libero id lectus euismod tincidunt. Vestibulum congue lacus eget quam auctor aliquet. Cras pretium magna quis arcu accumsan, id commodo urna fermentum. In auctor massa in erat vestibulum congue. Suspendisse semper ipsum eget turpis sodales facilisis.",
  },
];

ReactDOM.render(<App news={NEWS} />, document.getElementById("app"));
