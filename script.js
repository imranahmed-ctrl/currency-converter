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
  .catch(err => {
    console.error("❌ API Error:", err);
    resultDiv.textContent = "⚠️ Failed to load currency data.";
  });

  form.addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || from === to || !rates[from] || !rates[to]) {
    resultDiv.textContent = "Invalid amount or currency selection.";
    return;
  }

  const usdBase = amount / rates[from]; 
  const converted = usdBase * rates[to]; 

  const resultText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  resultDiv.textContent = resultText;
  console.log(resultText);

  const li = document.createElement("li");
  li.textContent = resultText;
  recentList.prepend(li);
  if(recentList.children.length>5){
    recentList.removeChild(recentList.lastChild);
  }

  const common = commonCurrencies.find(curr => curr === to);
  if(common) {
    console.log(`Converted to a common currency: ${common}`);
  }
  });

  