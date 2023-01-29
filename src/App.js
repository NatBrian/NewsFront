import React, { useState, useEffect } from "react";
import NewsList from "./components/NewsList";
import axios from "axios";
import DatePicker from "react-datepicker";
import MY_API_KEY from "apikey.js"
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(new Date());

  const API_URL_HEADLINES = "https://newsapi.org/v2/top-headlines";
  const API_URL_EVERYTHING = "https://newsapi.org/v2/everything";
  const API_KEY = MY_API_KEY;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search) {
      axios
        .get(API_URL_EVERYTHING, {
          params: {
            q: search,
            language: "en",
            pageSize: 100,
            apiKey: API_KEY,
            from: startDate,
            to: endDate,
          },
        })
        .then((res) => {
          setArticles(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(API_URL_EVERYTHING, {
          params: {
            domains: "cnn.com,bbc.com",
            language: "en",
            pageSize: 100,
            apiKey: API_KEY,
            from: startDate,
            to: endDate,
          },
        })
        .then((res) => {
          setArticles(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(API_URL_HEADLINES, {
        params: {
          q: search,
          country: "us",
          pageSize: 100,
          apiKey: API_KEY,
        },
      })
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <section className="hero is-small is-black">
        <div className="hero-body">
          <p className="title">NewsFront </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="box">
        <div className="field is-horizontal is-grouped">
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
            <button type="submit" className="button is-dark">
              Search
            </button>
          </p>
        </div>

        <div className="field is-horizontal is-grouped">
          <div className="control is-expanded">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input"
            />
          </div>
          <div className="control is-expanded">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="input"
            />
          </div>
        </div>
      </form>

      <NewsList articles={articles} />
    </div>
  );
};

export default App;
