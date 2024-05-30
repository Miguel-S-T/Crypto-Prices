# Crypto Price Tracker ₿

(https://crypto-prices-tracker.netlify.app/)

This app tracks the price & market changes for top 100 cryptocurrencies.

![Crypto-tracker screenshot](https://github.com/Miguel-S-T/Crypto-Prices/assets/70488920/a5745800-37ca-44bc-a160-40f0f309a672)

---

## Technologies used 🛠️

- [React](https://es.reactjs.org/) - Frontend JavaScript library
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [Chart.js](https://www.chartjs.org/) - Frontend charting library
- [Material-UI] (https://mui.com/) - Frontend component library
- [Bootstrap] (https://getbootstrap.com/) - Frontend component library

---

## Run Locally 💻

1. Clone this repo

```bash
git clone https://github.com/Miguel-S-T/Crypto-Prices.git && cd Crypto-Prices
```

2. Install project dependecies

```bash
npm install
```

3. Start a local server

```bash
 npm run dev
```

---

## Functionalities

### 1. Bitcoin List Display

- **Feature:** Display a comprehensive list of bitcoins.
- **Details:** Each bitcoin entry includes its name, symbol, and current price.
- **Purpose:** Provide users with up-to-date information on various bitcoins in the market.

### 2. Top 4 Bitcoins Highlight

- **Feature:** Highlight the top 4 bitcoins.
- **Details:** These top 4 bitcoins are displayed prominently at the top of the page based on market metrics such as price or market capitalization.
- **Purpose:** Quickly inform users of the leading bitcoins in the market.

### 3. Favorites Management

- **Feature:** Add to Favorites
- **Details:** Users can mark their preferred bitcoins as favorites by clicking on a star icon next to the bitcoin's entry in the table.
- **Purpose:** Allow users to easily track and access their favorite bitcoins.

### 4. Price Trend Visualization

- **Feature:** Bitcoin Price Chart
- **Details:** By clicking on a bitcoin's name, users can view a line chart displaying the bitcoin's price trend over the last 7 days.
- **Purpose:** Provide users with visual insights into the short-term price movement of the selected bitcoin.

---

## Data Sources 📊

The data for this app is generously provided by the following api/sources:

- [Crptocurrency API by CoinGecko](https://www.coingecko.com/en/api)
