const express = require('express');
const NewsAPI = require('newsapi');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const newsapi = new NewsAPI('API_KEY');

app.post('/articles', (req, res) => {
    const page = req.body.page;
    const search = req.body.search;
    // Use the pageNumber to retrieve the next set of articles
    newsapi.v2.everything({
        sources: 'cnn',
        language: 'en',
        page: page,
        q: search,
        sortBy: 'popularity',
    }).then(response => {
        res.json(response);
    }).catch(err => {
        console.log(err);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
