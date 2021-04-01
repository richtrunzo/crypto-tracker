// require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');

const app = express();

app.use(staticMiddleware);

app.get('/api/volume', (req, res) => {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=200&page=1&sparkline=true', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/market', (req, res) => {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/coin/:coin', (req, res) => {
  const { coin } = req.params;
  fetch(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/coins/:coin', (req, res) => {
  const { coin } = req.params;
  fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/news', (req, res) => {
  fetch('https://newsapi.org/v2/everything?q=crypto&language=en&sortBy=publishedAt&apiKey=4de66897540141d293573da3a34666a0', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/news/:coin', (req, res) => {
  const { coin } = req.params;
  fetch(`https://newsapi.org/v2/everything?q=${coin}&language=en&sortBy=publishedAt&apiKey=4de66897540141d293573da3a34666a0`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/date/:coin/:date', (req, res, next) => {
  const { coin, date } = req.params;
  fetch(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date}`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data.market_data.current_price.usd);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/coinval/:coinValue', (req, res) => {
  const { coinValue } = req.params;
  fetch(`https://api.coingecko.com/api/v3/coins/${coinValue}?tickers=true&market_data=true&community_data=true`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/coinMarket/:coinMarket', (req, res) => {
  const { coinMarket } = req.params;
  fetch(`https://api.coingecko.com/api/v3/coins/${coinMarket}/market_chart?vs_currency=usd&days=30&interval=daily`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
