import React from "react";
import Article from "./Article";

const NewsList = (props) => {
  return (
    <div>
      <ul className="collection">
        {props.articles.map((article, index) => {
          return (
            <Article
              key={index}
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              url={article.url}
              author={article.author}
              publishedAt={
                article.publishedAt.replace('Z', ' ').replace('T', ' ')
              }
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NewsList;
