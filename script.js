const form = document.getElementById("converter-form");
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
let exchangeRates = {};

fetch("https://open.er-api.com/v6/latest/USD")
  .then(response => response.json())
  .then(data => {
    console.log("API Data:", data);

    if (!data || !data.rates) {
      throw new Error("Invalid API structure");
    }

    exchangeRates = data.rates;
    const allCurrencies = Object.keys(exchangeRates);

  allCurrencies.forEach( code => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = code;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });
  
  fromCurrency.value = "USD";
  toCurrency.value = "KES";

   commonCurrencies.forEach(code => {
      const btn = document.createElement("button");
      btn.textContent = code;
      btn.type = "button";
      btn.addEventListener("click", () => {
        fromCurrency.value = "USD";
        toCurrency.value = code;
        form.dispatchEvent(new Event("submit"));
      });
      quickContainer.appendChild(btn);
    });
  })
  .catch(error => {
    console.error(" Could not fetch data:", error);
    resultDiv.textContent = "Failed to load currency data.";
  });

  form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || from === to || !exchangeRates[from] || !exchangeRates[to]) {
    resultDiv.textContent = "Invalid amount or currency.";
    return;
  }

  const usdBase = amount / exchangeRates[from]; 
  const converted = usdBase * exchangeRates[to]; 

  const resultText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  resultDiv.textContent = resultText;
  console.log(resultText);

  const li = document.createElement("li");
  li.textContent = resultText;
  recentList.prepend(li);
  if(recentList.children.length>10){
    recentList.removeChild(recentList.lastChild);
  }

  const common = commonCurrencies.find(curr => curr === to);
  if(common) {
    console.log(`Converted to a common currency: ${common}`);
  }
  });

 swapBtn.addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
 });

 darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
 });
 
 