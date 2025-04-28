
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Binance Price API Server Running!');
});

app.get('/price', async (req, res) => {
    const symbol = req.query.symbol;

    if (!symbol) {
        return res.status(400).json({ error: 'Missing symbol parameter (ex: ADAUSDT)' });
    }

    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const data = await response.json();

        if (data.price) {
            res.send(data.price);
        } else {
            res.status(404).json({ error: 'Symbol not found or API error.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching price.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
