// import React, { useState, useEffect } from "react";
// import NewsList from "./components/NewsList";

// const App = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/articles")
//       .then((res) => res.json())
//       .then((data) => setArticles(data.articles));
//   }, []);

//   return (
//     <div>
//       <section class="hero is-small is-link">
//       <div class="hero-body">
//       <p class="title">NewsApp </p>
//           </div>
//         </section>
//         <NewsList articles={articles} />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import NewsList from "./components/NewsList";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/articles", {
      method: "POST",
      body: JSON.stringify({ page, search }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  };

  useEffect(() => {
    fetch("http://localhost:3001/articles", {
      method: "POST",
      body: JSON.stringify({ page, search }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));

    // Add event listener for scroll event
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = () => {
    // Check if user has scrolled to bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="hero is-small is-link">
        <div className="hero-body">
          <p className="title">NewsFront </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search for news..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </p>
        <p className="control">
          <button type="submit" className="button is-success">
            Search
          </button>
        </p>
      </form>

      <NewsList articles={articles} />
    </div>
  );
};

export default App;
