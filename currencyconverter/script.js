

const convert = document.querySelector("#convertBtn");
const amount = document.querySelector("#amount");
const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");
const result = document.querySelector("#result");

convert.addEventListener("click", () => {


const amountValue = amount.value;
const from = fromCurrency.value;
const to = toCurrency.value;

fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {

        const convertedAmount = amountValue * data.rate;

        result.textContent =
            `${amountValue} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

    })
    .catch((error) => {
        console.log(error);
        result.textContent = "Something went wrong";
    });


});