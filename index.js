//!---------------------Program Variables---------------------------------------------
let countriesDictMain = {}; //key=contry value=country code
let selectedCountry = ""; //when country selected in  drop down list the value replace by the country selected
let contriesByContinent = {}; //key=continent value array of object (key=country:value=code)
let getCountriesFinish = false; //one the getCounries() finish produce the the dictenaries for the program ,the value turn true
let currentPressedContinent = "all"; //when clicking on continent button the value will cheng to the current continent

//!--------------------Dom variables--------------------------------------------------
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

//!--------------------Api Functions--------------------------------------------------
async function getCounries() {
  // this func produce 2 dictionaries 1. all countries with key=country, value =country code
  //2. dictionary of continent key=continent value=list of countries within the continent contains key=country value=code
  const continentList = ["Asia", "Europe", "Africa", "Oceania", "Americas"];
  //if dictionary og continent and countries if full no need to run this func anymore
  let getCountriesFinish = continentList.every((continent) => contriesByContinent.hasOwnProperty(continent));
  if (getCountriesFinish) return true;

  let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1`);
  let countriesList = await countriesApi.json();

  for (let ctt = 0; ctt < continentList.length; ctt++) {
    let countriesDict = {}; //key=contry value=country code
    const continent = continentList[ctt];
    // console.log(`continent${ctt}`, continent);
    for (let i = 0; i < countriesList.length; i++) {
      const country = countriesList[i];
      if (country.region === continentList[ctt]) {
        let key = countriesList[i].name.common;
        let value = countriesList[i].cca2;
        // console.log("country", key, value, country.region);
        if (key !== "" && value !== "") {
          countriesDict = { ...countriesDict, [key]: value };
          countriesDictMain = { ...countriesDictMain, ...countriesDict };
        }
      }
    }
    if (!contriesByContinent[continent]) contriesByContinent = { ...contriesByContinent, [continent]: countriesDict };
  }
  return false;
}

async function getCountryStatistic(counryCode) {
  //return statistic from singel country
  let covid19Api = await fetch(`https://intense-mesa-62220.herokuapp.com/http://corona-api.com/countries/${counryCode}`);
  let countryStatistics = await covid19Api.json();
  console.log("cor", countryStatistics);
  return countryStatistics;
}
async function getCountriesStatistic() {
  //return statistic from all countries
  let covid19Api = await fetch(`https://intense-mesa-62220.herokuapp.com/http://corona-api.com/countries`);
  let countriesStatistics = await covid19Api.json();
  console.log("cor", countriesStatistics);
  return countriesStatistics;
}

//!--------------------utills functions--------------------------------------------------
function fillSelectOptions(options) {
  //fill options in the drop down list
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
  //change buttons style
  [asiaBtn, europBtn, africaBtn, oceaniaBtn, americasBtn].forEach((e) => (e.style.background = ""));
  e.target.style.background = "pink";
}

function removeHiddenClass(arr) {
  //expose hidden elements
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
  countriesList = Object.keys(contriesByContinent["Asia"]);
  fillSelectOptions(countriesList);
  currentPressedContinent = "Asia";
});
europBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  countriesList = Object.keys(contriesByContinent["Europe"]);
  fillSelectOptions(countriesList);
  currentPressedContinent = "Europe";
});
africaBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  countriesList = Object.keys(contriesByContinent["Africa"]);
  fillSelectOptions(countriesList);
  currentPressedContinent = "Africa";
});
oceaniaBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  countriesList = Object.keys(contriesByContinent["Oceania"]);
  fillSelectOptions(countriesList);
  currentPressedContinent = "Oceania";
});
americasBtn.addEventListener("click", async (e) => {
  removeHiddenClass([hiddenDiv, select]);
  btnClickStyle(e);
  while ((await getCounries()) === false) {}
  countriesList = Object.keys(contriesByContinent["Americas"]);
  fillSelectOptions(countriesList);
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

  let r = await getCountryStatistic(countriesDictMain[selectedCountry]);
  const contryStatistic = {
    name: r.data.name,
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
//!--------------------test--------------------------------------------------
// getCounries("asia");
// getCountryStatistic("IL");
// console.log(getWorldCounries());
// console.log("bla  ", contriesByContinent);
// console.log("all", getCountriesStatistic());
// setTimeout(() => console.log("contriesByContinent", contriesByContinent), 6000);
