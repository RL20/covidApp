//-------------11-12-2021----------14:53
let countriesDictMain = {}; //key=contry value=country code
let selectedCountry = "";
let contriesByContinent = {}; //key=continent value array of object (key=country:value=code)
let getCountriesFinish = false;
let currentPressedContinent = "all";
//!------------------------------------------
async function getCounries() {
  const continentList = ["Asia", "Europe", "Africa", "Oceania", "Americas"];
  getCountriesFinish = continentList.every((continent) => contriesByContinent.hasOwnProperty(continent));
  if (getCountriesFinish) return true;
  //let countriesDict = {}; //key=contry value=country code

  for (let i = 0; i < continentList.length; i++) {
    let countriesDict = {}; //key=contry value=country code
    const continent = continentList[i];
    let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1//region/${continent}`);
    let counriesList = await countriesApi.json();

    for (let i = 0; i < counriesList.length; i++) {
      let key = counriesList[i].name.common;
      let value = counriesList[i].cca2;
      if (key !== "" && value !== "") {
        countriesDict = { ...countriesDict, [key]: value };
        countriesDictMain = { ...countriesDictMain, ...countriesDict };
      }
    }
    if (!contriesByContinent[continent]) contriesByContinent = { ...contriesByContinent, [continent]: countriesDict };
  }
  return false;
}
//!----------------------------------------------------------------------
async function getWorldCounries() {
  let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1`);
  let counriesList = await countriesApi.json();
  const continentList = ["Asia", "Europe", "Africa", "Oceania", "Americas"];
  let arr = [];
  for (let i = 0; i < counriesList.length; i++) {
    const contry = counriesList[i];
    if (contry.region === continentList[0]) {
      arr.push(counriesList[i]);
    }
  }

  console.log("bla bla ", arr);
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
console.log(getWorldCounries());
console.log("all", getCountriesStatistic());
// setTimeout(() => console.log("contriesByContinent", contriesByContinent), 6000);

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
    option.value = options[i];
    option.innerHTML = options[i];
    select.append(option);
  }
}
function btnClickStyle(e) {
  [asiaBtn, europBtn, africaBtn, oceaniaBtn, americasBtn].forEach((e) => (e.style.background = ""));
  e.target.style.background = "pink";
}
function removeHiddenClass(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element.classList.contains("hidden")) element.classList.remove("hidden");
  }
}
async function coronaByContinent() {
  //fillter the func getCountriesStatistic() that return all word corona statistis by current continent
  let currentContinentCountries = Object.values(contriesByContinent[currentPressedContinent]); //get all countries code in the current continent
  let allCountriesStatistics = await getCountriesStatistic();
  let allCountriesStatisticsData = allCountriesStatistics.data; //extract array from the the wrap object
  const filteredArray = allCountriesStatisticsData.filter((_, index, array) => currentContinentCountries.includes(array[index].code));
  // console.log("filteredArray", filteredArray);
  return filteredArray;
}
//---------------Evenst------------------------------------------------------------------
asiaBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  counriesList = Object.keys(contriesByContinent["Asia"]);
  fillSelectOptions(counriesList);
  currentPressedContinent = "Asia";
});
europBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  counriesList = Object.keys(contriesByContinent["Europe"]);
  fillSelectOptions(counriesList);
  currentPressedContinent = "Europe";
});
africaBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  counriesList = Object.keys(contriesByContinent["Africa"]);
  fillSelectOptions(counriesList);
  currentPressedContinent = "Africa";
});
oceaniaBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  counriesList = Object.keys(contriesByContinent["Oceania"]);
  fillSelectOptions(counriesList);
  currentPressedContinent = "Oceania";
});
americasBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  counriesList = Object.keys(contriesByContinent["Americas"]);
  fillSelectOptions(counriesList);
  currentPressedContinent = "Americas";
});
//------------corona Events--------------------------------------------------------
confirmed.addEventListener("click", async (e) => {
  let confirmArr = [];
  let res = await coronaByContinent();
  for (let i = 0; i < res.length; i++) {
    let key = res[i].name;
    let value = res[i].latest_data.confirmed;
    confirmArr.push({ [key]: value });
  }
  console.log("confirmArr", confirmArr);
  return confirmArr;
});
deaths.addEventListener("click", async (e) => {
  let deathsArr = [];
  let res = await coronaByContinent();
  for (let i = 0; i < res.length; i++) {
    let key = res[i].name;
    let value = res[i].latest_data.deaths;
    deathsArr.push({ [key]: value });
  }
  console.log("deathsArr", deathsArr);
  return deathsArr;
});
recovered.addEventListener("click", async (e) => {
  let recoveredArr = [];
  let res = await coronaByContinent();
  for (let i = 0; i < res.length; i++) {
    let key = res[i].name;
    let value = res[i].latest_data.recovered;
    recoveredArr.push({ [key]: value });
  }
  console.log("recoveredArr", recoveredArr);
  return recoveredArr;
});
critical.addEventListener("click", async (e) => {
  let criticalArr = [];
  let res = await coronaByContinent();
  for (let i = 0; i < res.length; i++) {
    let key = res[i].name;
    let value = res[i].latest_data.critical;
    criticalArr.push({ [key]: value });
  }
  console.log("criticalArr", criticalArr);
  return criticalArr;
});
//----------singel country statistics--------------------
select.addEventListener("change", async function () {
  selectedCountry = select.value;
  //   name
  // latest_data.confirmed
  // latest_data.critical
  // latest_data.deaths
  // latest_data.recovered
  // today.confirmed
  //  today.deaths
  let r = await getCountryStatistic(countriesDictMain[selectedCountry]);
  const contryStatistic = {
    confirmed: r.data.latest_data.confirmed,
    critical: r.data.latest_data.critical,
    deaths: r.data.latest_data.deaths,
    recovered: r.data.latest_data.recovered,
    newConfirmed: r.data.today.confirmed,
    newDeaths: r.data.today.deaths,
  };
  // console.log("result", r.data.latest_data.confirmed);
  console.log("contryStatistic", contryStatistic);
  return contryStatistic;
});
