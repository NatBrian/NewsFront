import React from "react";
import Article from "./Article";

const NewsList = (props) => {
  let str = "28/06/2018 01:30:20";

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
              publishedAt={str.replace(
                article.publishedAt,
                (_, a, b, c) => c + "-" + b + "-" + a
              )}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NewsList;
