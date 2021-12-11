asiaBtn.addEventListener("click", async (e) => {
  asiaBtn.style.background = "pink";
  let counriesList = await getCounries("Asia");
  fillSelectOptions(counriesList);
  // for (let i = 0; i < counriesList.length; i++) {
  //   console.log(i);
  //   select.innerHTML += `<option value="${counriesList[i].name.common}">${counriesList[i].name.common}</option>`;
  // }
});

// https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/asia

// https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/

// console.log("ddd", counriesList[15].name.common);
// console.log("ddd", counriesList[15].cca2);
// "Asia"
// "Europe"
// "Africa"
// "Oceania"
// "Americas"

// async function getWorldCounries() {
//   let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1`);
//   let counriesList = await countriesApi.json();
//   let f = [];
//   for (let i = 0; i < counriesList.length; i++) {
//     if (counriesList[i].region === "") f.push(counriesList[i]);
//   }

//   return f;
// }

function fillSelectOptions(options) {
  select.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    select.innerHTML += `<option value="${options[i].name.common}">${options[i].name.common}</option>`;
  }
}

async function getCounries(continent) {
  // select.innerHTML = "";
  let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1//region/${continent}`);
  let counriesList = await countriesApi.json();

  for (let i = 0; i < counriesList.length; i++) {
    let key = counriesList[i].name.common;
    let value = counriesList[i].cca2;
    if (key !== "" && value !== "") countriesDict = { ...countriesDict, [key]: value };
  }

  // for (let i = 0; i < counriesList.length; i++) {
  //   select.innerHTML += `<option value="${counriesList[i].name.common}">${counriesList[i].name.common}</option>`;
  // // }
  // console.log("affffff", counriesList);
  // console.log("arrrrr", countriesDict);
  return counriesList;
}

function fillSelectOptions(options) {
  select.innerHTML = "";
  select.innerHTML += `<option value="choose country" disabled selected>choose country</option>`;
  for (let i = 0; i < options.length; i++) {
    let option = document.createElement("option");
    option.value = options[i].name.common;
    option.innerHTML = options[i].name.common;
    option.addEventListener("click", (e) => {
      //   let code=countriesDict[];
      //   getCountryStatistic(code);
      selectedCountry = select.value;
    });
    select.append(option);
  }
}

contriesByContinent.hasOwnProperty("Asia");
contriesByContinent.hasOwnProperty("Europe");
contriesByContinent.hasOwnProperty("Africa");
contriesByContinent.hasOwnProperty("Oceania");
contriesByContinent.hasOwnProperty("Americas");

//!----------------------------------------------------------------------
async function getWorldCounries() {
  const continentList = ["Asia", "Europe", "Africa", "Oceania", "Americas"];
  //if dictionary og continent and countries if full no need to run this func anymore
  // let getCountriesFinish = continentList.every((continent) => contriesByContinent.hasOwnProperty(continent));
  // if (getCountriesFinish) return true;

  let countriesApi = await fetch(`https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1`);
  let countriesList = await countriesApi.json();

  for (let i = 0; i < continentList.length; i++) {
    let countriesDict = {}; //key=contry value=country code
    const continent = continentList[i];
    for (let i = 0; i < countriesList.length; i++) {
      const country = countriesList[i];
      console.log("country", country, country.region);
      if (country.region === continentList[i]) {
        let key = countriesList[i].name.common;
        let value = countriesList[i].cca2;
        if (key !== "" && value !== "") {
          countriesDict = { ...countriesDict, [key]: value };
          countriesDictMain = { ...countriesDictMain, ...countriesDict };
        }
      }
    }
    if (!contriesByContinent[continent]) contriesByContinent = { ...contriesByContinent, [continent]: countriesDict };
  }

  console.log("bla bla ", contriesByContinent);
  // return countriesList;
  return false;
} //
//!-----------chart--------------------------------------------------------------------
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
