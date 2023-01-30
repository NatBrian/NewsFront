import React from "react";

const Article = (props) => {
  return (
    <a href={props.url}>
      <div className="box">
        <div className="content">
          <h2 className="title is-4">{props.title}</h2>
          <p className="subtitle is-7">Published at: {props.publishedAt}</p>
        </div>
        <div className="columns">
          <div className="column is-3">
            <img src={props.image} alt={props.title} className="image" />
          </div>
          <div className="column">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Article;
