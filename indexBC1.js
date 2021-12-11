//! ----10/12/2021 22:00

// let countriesDict = {}; //key=contry value=country code
let selectedCountry = "";
let contriesByContinent = {}; //key=continent value array of object (key=country:value=code)
//!------------------------------------------
async function getCounries(continent) {
  let countriesDict = {}; //key=contry value=country code
  let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1//region/${continent}`);
  let counriesList = await countriesApi.json();

  for (let i = 0; i < counriesList.length; i++) {
    let key = counriesList[i].name.common;
    let value = counriesList[i].cca2;
    if (key !== "" && value !== "") countriesDict = { ...countriesDict, [key]: value };
  }
  if (!contriesByContinent[continent]) contriesByContinent = { ...contriesByContinent, [continent]: countriesDict };
  return counriesList;
}
//!----------------------------------------------------------------------
async function getWorldCounries() {
  let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1`);
  let counriesList = await countriesApi.json();
  return counriesList;
}
async function getCountryStatistic(counryCode) {
  let covid19Api = await fetch(`https://intense-mesa-62220.herokuapp.com/http://corona-api.com/countries/${counryCode}`);
  let countryStatistics = await covid19Api.json();
  console.log("cor", countryStatistics);
  return countryStatistics;
}
async function getCountriesStatistic() {
  let covid19Api = await fetch(`https://intense-mesa-62220.herokuapp.com/http://corona-api.com/countries`);
  let countriesStatistics = await covid19Api.json();
  console.log("cor", countriesStatistics);
  return countriesStatistics;
}

// getCounries("asia");
// getCountryStatistic("IL");
// console.log(getWorldCounries());
// console.log("all", getCountriesStatistic());
setTimeout(() => console.log("contriesByContinent", contriesByContinent), 6000);

let asiaBtn = document.querySelector("[data-asia]");
let europBtn = document.querySelector("[data-europ]");
let africaBtn = document.querySelector("[data-africa]");
let oceaniaBtn = document.querySelector("[data-oceania]");
let americasBtn = document.querySelector("[data-americas]");
let select = document.querySelector("[data-select]");
let hiddenDiv = document.querySelector("[data-hidden-clk]");

let confirmed = document.querySelector("[data-1]");
let deaths = document.querySelector("[data-2]");
let recovered = document.querySelector("[data-3]");
let critical = document.querySelector("[data-4]");

// setTimeout(() => console.log("selectedCountry", select.value), 6000);

//-------------utill functions-----------------------------------------------
function fillSelectOptions(options) {
  select.innerHTML = "";
  select.innerHTML += `<option value="choose country" disabled selected>choose country</option>`;
  for (let i = 0; i < options.length; i++) {
    let option = document.createElement("option");
    option.value = options[i].name.common;
    option.innerHTML = options[i].name.common;
    select.append(option);
  }
}
function btnClickStyle(e) {
  [asiaBtn, europBtn, africaBtn, oceaniaBtn, americasBtn].forEach((e) => (e.style.background = ""));
  e.target.style.background = "pink";
}
//---------------Evenst------------------------------------------------------------------
asiaBtn.addEventListener("click", async (e) => {
  if (hiddenDiv.classList.contains("hidden")) hiddenDiv.classList.remove("hidden");
  btnClickStyle(e);
  let counriesList = await getCounries("Asia");
  fillSelectOptions(counriesList);
});
europBtn.addEventListener("click", async (e) => {
  if (hiddenDiv.classList.contains("hidden")) hiddenDiv.classList.remove("hidden");
  btnClickStyle(e);
  let counriesList = await getCounries("Europe");
  fillSelectOptions(counriesList);
});
africaBtn.addEventListener("click", async (e) => {
  if (hiddenDiv.classList.contains("hidden")) hiddenDiv.classList.remove("hidden");
  btnClickStyle(e);
  let counriesList = await getCounries("Africa");
  fillSelectOptions(counriesList);
});
oceaniaBtn.addEventListener("click", async (e) => {
  if (hiddenDiv.classList.contains("hidden")) hiddenDiv.classList.remove("hidden");
  btnClickStyle(e);
  let counriesList = await getCounries("Oceania");
  fillSelectOptions(counriesList);
});
americasBtn.addEventListener("click", async (e) => {
  if (hiddenDiv.classList.contains("hidden")) hiddenDiv.classList.remove("hidden");
  btnClickStyle(e);
  let counriesList = await getCounries("Americas");
  fillSelectOptions(counriesList);
});
//------------corona Events--------------------------------------------------------
confirmed.addEventListener("click", (e) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
  }
});
deaths.addEventListener("click", (e) => {});
recovered.addEventListener("click", (e) => {});
critical.addEventListener("click", (e) => {});
//----------singel country statistics--------------------
addEventListener("change", async function () {
  selectedCountry = select.value;
  // console.log("kkkk", selectedCountry);
  console.log("result", await getCountryStatistic(countriesDict[selectedCountry]));
});
