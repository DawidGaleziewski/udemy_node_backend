// we do not have fetch in js, it is a browser api. Therefore we cannot use it in node
const parTitle = document.querySelector("#par-title");
const parDetails = document.querySelector("#par-details");

const getWeatherFor = (location) => {
  const url = `/weather?address=${location}`;
  parTitle.innerText = "Loading...";
  parDetails.innerText = "loading...";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // console.log(data.error)
        parTitle.innerText = "ERROR";
        parDetails.innerText = data.error;
      } else {
        console.log(data);
        parTitle.innerText = data.address;
        parDetails.innerText = `It is currently ${data.temperature}, wind speed is ${data.wind}, pressure is ${data.pressure}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchElement = event.target.querySelector("input");
  getWeatherFor(searchElement.value);
});
