const form = document.getElementById("convertet-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultDiv = document.getElementById("result");
const recentList = document.getElementById("recent-list");
const quickContainer = document.getElementById("quick-currencies");
const swapBtn = document.getElementById("swap-btn");

const darkToggle = document.createElement("button");
darkToggle.textContent = "🌓";
darkToggle.id = "dark-toggle";
document.body.appendChild(darkToggle);

const commonCurrencies = ["USD","EUR","GBP","KES","JPY","CAD"];
let rates = {};

fetch("https://open.er-api.com/v6/latest/USD")
  .then(res => res.json())
  .then(data => {
    console.log("✅ API Data:", data);

    if (!data || !data.rates) {
      throw new Error("Invalid API structure");
    }

    rates = data.rates;
    const currencyCodes = Object.keys(rates);

  currencyCodes.map( code => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = code;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });
  
  fromCurrency.value = "USD";
  toCurrency.value = "KES";
