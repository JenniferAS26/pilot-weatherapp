const api = axios.create({
  baseURL: 'http://api.weatherbit.io/v2.0/',
  // headers: {
  //     'Content-Type': 'application/json;charset=utf-8',
  // },
  // params: {
  //     'api_key': API_KEY,
  // }
});

const dateText = document.querySelector('#dateP');

function createCard(data) {

  const container = document.getElementById('contentWrapper');

  // const weatherContainer = document.createElement('section');
  // weatherContainer.classList.add('wrapper');

  const favContainer = document.createElement('div');
  favContainer.classList.add('favSection');
  const dateInformation = document.createElement('p');
  dateInformation.classList.add('date');
  const hourInformation = document.createElement('p');
  hourInformation.classList.add('hour');

  const temperatureContainer = document.createElement('div');
  temperatureContainer.classList.add('temperature');
  const degrees = document.createElement('h1');
  degrees.classList.add('degrees');
  const iconItem = document.createElement('div');
  iconItem.classList.add('icon');
  const iconImg = document.createElement('img');
  iconImg.classList.add('weather-img');
  console.log(data);
  iconImg.setAttribute(
    'src',
    `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`
  );
  const dayDescr = document.createElement('p');
  dayDescr.classList.add('dayDescription');

  const locationName = document.createElement('p');
  locationName.classList.add('city');

  favContainer.appendChild(dateInformation);
  favContainer.appendChild(hourInformation);
  temperatureContainer.appendChild(degrees);
  temperatureContainer.appendChild(iconItem);
  iconItem.appendChild(iconImg);
  iconItem.appendChild(dayDescr);

  container.appendChild(favContainer);
  container.appendChild(temperatureContainer);
  container.appendChild(locationName);

  dateInformation.textContent = data.data[0].timezone;
  hourInformation.textContent = data.data[0].country_code;
  degrees.textContent = `${data.data[0].temp}°C`;
  dayDescr.textContent = data.data[0].weather.description;
  locationName.textContent = data.data[0].city_name;

}


// Llamados a la API

const getData = async () => {
  let APIUrl = '';
  const inputSearch = document.getElementsByClassName('search-input');
  const inputValue = inputSearch[0].value;
  const APIKey = 'd2e4088b81004ebea1f618ddc76bdd25';
  console.log(typeof(inputValue))

  if (!isNaN(inputValue)){
    APIUrl = `current?postal_code=${inputValue}&key=${APIKey}`

} else {
  APIUrl = `current?&country=US&city=${inputValue}&key=${APIKey}`
}
  const { data, status } = await api.get(APIUrl);
  createCard(data);
  console.log(data.data[0]);
}
