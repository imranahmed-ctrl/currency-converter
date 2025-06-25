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


