import React from "react";

const Article = (props) => {
  return (
    <div className="box">
      <div className="content">
        <h2 className="title is-4">{props.title}</h2>
        <p className="subtitle is-7">
          Author: {props.author} 
          <br></br>
          Published at: {props.publishedAt}
        </p>
      </div>
      <div className="columns">
        <div className="column is-3">
          <img src={props.urlToImage} alt={props.title} className="image" />
        </div>
        <div className="column">
          <p>{props.description}</p>
        </div>
      </div>
      <div className="has-text-centered">
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="button is-danger"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Article;
