import React, { useState, useEffect } from "react";
import NewsList from "./components/NewsList";
import axios from "axios";
import DatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const API_URL_HEADLINES = "https://gnews.io/api/v4/top-headlines";
  const API_URL_EVERYTHING = "https://gnews.io/api/v4/search";
  const API_KEY = process.env.REACT_APP_API_KEY;


  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
      fetchArticles();
  }, []);

  const fetchArticles = () => {
      if (page > 1) { // set page limit since this is a free API
        console.log("max page: ", page)
        setHasMore(false);
        return;
      }

      axios
        .get(API_URL_HEADLINES, {
          params: {
            lang: "en",
            token: API_KEY,
            page: page
          },
        })
        .then((res) => {
          setArticles([...articles, ...res.data.articles]);
          setPage(page + 1);
          if (res.data.articles.length === 0) {
            setHasMore(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(page)
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();

    if (search === "" && startDate === null && endDate === null) {
      console.log("skip search");
      return;
    }

    let searchAPI = "";
    if (search) {
      searchAPI = API_URL_EVERYTHING;
    } else {
      searchAPI = API_URL_HEADLINES;
    }

    if (startDate !== null && endDate !== null && startDate > endDate) {
      console.log("startDate > endDate");
      return;
    }
    if (startDate !== null) {
      startDate.setHours(0, 0, 0, 0);
    }
    if (endDate !== null) {
      endDate.setHours(24, 0, 0, 0);
    }

    // console.log(startDate, endDate, search);

    axios
      .get(searchAPI, {
        params: {
          ...(search !== "" && { q: search }),
          lang: "en",
          token: API_KEY,
          ...(startDate !== null && {
            from: startDate.toISOString().split(".")[0] + "Z",
          }),
          ...(endDate !== null && {
            to: endDate.toISOString().split(".")[0] + "Z",
          }),
          sortby: "relevance",
        },
      })
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isActive, setIsActive] = useState(false);

  const handleTopicChange = (event) => {
    event.preventDefault();

    console.log(event.target.dataset.value);

    axios
      .get(API_URL_HEADLINES, {
        params: {
          lang: "en",
          token: API_KEY,
          topic: event.target.dataset.value,
        },
      })
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (

    <div>
      <nav
        className="navbar hero is-top is-black"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item">
            <p className="title">NewsFront </p>
          </div>

          <a
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={handleClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="content">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search for news..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-dark"
                      onClick={handleSubmitSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-item">
              <div className="field is-horizontal is-grouped">
                <div className="control is-expanded">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="input"
                    placeholderText={"01/29/2023"}
                  />
                </div>
                <div className="control is-expanded">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="input"
                    placeholderText={"01/30/2023"}
                  />
                </div>
              </div>
            </div>

            <div className="navbar-item">
              <a
                href="#"
                data-value={"breaking-news"}
                onClick={handleTopicChange}
              >
                Breaking News
              </a>
            </div>
            <div className="navbar-item">
              <a href="#" data-value={"business"} onClick={handleTopicChange}>
                Business
              </a>
            </div>
            <div className="navbar-item">
              <a href="#" data-value="technology" onClick={handleTopicChange}>
                Technology
              </a>
            </div>
            <div className="navbar-item">
              <a
                href="#"
                data-value={"entertainment"}
                onClick={handleTopicChange}
              >
                Entertainment
              </a>
            </div>
            <div className="navbar-item">
              <a href="#" data-value={"science"} onClick={handleTopicChange}>
                Science
              </a>
            </div>
            <div className="navbar-item">
              <a href="#" data-value={"sports"} onClick={handleTopicChange}>
                Sports
              </a>
            </div>
            <div className="navbar-item">
              <a href="#" data-value={"health"} onClick={handleTopicChange}>
                Health
              </a>
            </div>
          </div>
        </div>
      </nav>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        hasMore={hasMore}
        loader={<div className="loader"></div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <NewsList articles={articles} />
      </InfiniteScroll>
      
    </div>
  );
};

export default App;
