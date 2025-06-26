const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const sourceCurrency = document.getElementById("source-currency");
const targetCurrency = document.getElementById("target-currency");
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
    sourceCurrency.appendChild(option1);
    targetCurrency.appendChild(option2);
  });
  
  sourceCurrency.value = "USD";
  targetCurrency.value = "KES";

   commonCurrencies.forEach(code => {
      const btn = document.createElement("button");
      btn.textContent = code;
      btn.type = "button";
      btn.addEventListener("click", () => {
        sourceCurrency.value = "USD";
        targetCurrency.value = code;
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
  const source = sourceCurrency.value;
  const target = targetCurrency.value;

  if (!amount || source === target || !exchangeRates[source] || !exchangeRates[target]) {
    resultDiv.textContent = "Invalid amount or currency.";
    return;
  }

  const usdBase = amount / exchangeRates[source]; 
  const converted = usdBase * exchangeRates[target]; 

  const resultText = `${amount} ${source} = ${converted.toFixed(2)} ${target}`;
  resultDiv.textContent = resultText;
  console.log(resultText);

  const li = document.createElement("li");
  li.textContent = resultText;
  recentList.prepend(li);
  if(recentList.children.length>10){
    recentList.removeChild(recentList.lastChild);
  }

  const common = commonCurrencies.find(curr => curr === target);
  if(common) {
    console.log(`Converted to a common currency: ${common}`);
  }
  });

 swapBtn.addEventListener("click", () => {
    const temp = sourceCurrency.value;
    sourceCurrency.value = targetCurrency.value;
    targetCurrency.value = temp;
 });

 darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
 });
 
 