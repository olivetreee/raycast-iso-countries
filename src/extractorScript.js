// Run this from browser console at https://www.iban.com/country-codes

let result = [];
const allRows = document.getElementsByTagName("tr");
for (let row=1; row<allRows.length; row++) {
    const country = allRows[row].children[0].textContent
    const iso2 = allRows[row].children[1].textContent
    const iso3 = allRows[row].children[2].textContent
    const numeric = allRows[row].children[3].textContent
    result.push({country, iso2, iso3, numeric});
}
copy(result);


// Run this from browser console at https://www.iban.com/currency-codes
const countries = []; //PASTE FROM DATA.JSON;
const currencies = {};
const rows = document.getElementsByTagName("tr");
for (row of rows) {
    const data = row.children;
    const country = data[0].textContent.toLowerCase();
    const currency = data[1].textContent;
    const code = data[2].textContent;
    currencies[country] = (currencies[country] || []).concat([{
        name: currency,
        code
    }])
}

const missing = [];
countries.forEach(country => {
    const currencyData = currencies[country.name.toLowerCase()];
    if (!currencyData) {
        missing.push(country.name);
    } else {
        country.currencies = country.currencies.concat([currencyData]);
    }
})


// Run this from browser console at https://www.webnots.com/copy-paste-country-flag-emoji-symbols/

const allRows = document.getElementsByTagName("tr");
let result = {};
for (let row=1; row<allRows.length; row++) {
    const flag = allRows[row].children[0].textContent;
    const iso = allRows[row].children[3].textContent;
    result[iso] = flag;
}
copy(result);