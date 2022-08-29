console.log('Часы и календарь +15\nПриветствие +10\nСмена фонового изображения +20\nВиджет погоды +15\nВиджет цитата дня +10\nАудиоплеер +15\nПродвинутый аудиоплеер (реализуется без использования библиотек) +17\nПеревод приложения на два языка (en/ru) +15\nПолучение фонового изображения от API +10\nНастройки приложения +17\nДополнительный функционал на выбор +10\nИтого: 154');
console.log('Если есть вопросы, свяжитесь со мной в Discord: carinaguseva#3582\nСпасибо за проверку!')

let currentLang = 'en'
const translate = {
  en:{      
    morning: "Good morning, ",
    afternoon: "Good afternoon, ",
    evening:"Good evening, ",
    night: "Good night, ",
    placeholder: "[Enter name]",
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind speed",
    mS: "m/s",
    time: "en-EN",
    weather: "en",
    quote: "data.json",
    todoAdd: "Add",
    setClock: "Clock",
    setDate: "Date",
    setGreeting: "Greeting",
    setWeather: "Weather",
    setPlayer: "Player",
    setQuotes: "Quotes",
    setTodoList: "todo list",
    setLang: "Language",
    placeTodo: "What you want to do?",
    placeTodowrong: "Task not added",
    titleTodo: "My tasks",
    noTasks: "No tasks yet",
    done: "Done",
    delete: "Delete"
  },  
   ru: {     
    morning: "Доброе утро, ",
    afternoon: "Добрый день, ",
    evening:"Добрый вечер, ",
    night: "Доброй ночи, ",
    placeholder: "[Введите имя]",
    temperature: "Температура",
    humidity: "Влажность",
    wind: "Ветер",
    mS: "м/с",
    time: "ru-RU",
    weather: "ru",
    quote: "data-ru.json",
    todoAdd: "Добавить",
    setClock: "Часы",
    setDate: "Дата",
    setGreeting: "Приветствие",
    setWeather: "Погода",
    setPlayer: "Плеер",
    setQuotes: "Цитаты",
    setTodoList: "todo лист",
    setLang: "Язык",
    placeTodo: "Что будем делать?",
    placeTodowrong: "Вы не ввели задачу",
    titleTodo: "Мои задачи",
    noTasks: "Еще нет задач",
    done: "Готово",
    delete: "Удалить"
  }
}
//1. Часы и календарь

function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.innerHTML = currentTime;
    setTimeout(showTime, 1000);
    function showDate() {
        const data = document.querySelector('.date');
        const options = {weekday: 'long', month: 'long', day: 'numeric' , timeZone: 'UTC'};
        const currentDate = date.toLocaleDateString(translate[currentLang].time, options);
        data.innerHTML = currentDate;
      }
      showDate();

      
//2. Приветствие

    function getTimeOfDay() {
    const hours = date.getHours();
    const greeting = document.querySelector('.greeting');
        if (hours >= 6 && hours < 12){
            greeting.textContent = (translate[currentLang].morning) 
        }
        else if(hours >= 12 && hours < 18){
            greeting.textContent = (translate[currentLang].afternoon) 
        }
        else if(hours >= 18 && hours < 24){
            greeting.textContent = (translate[currentLang].evening) 
        }
        else if(hours >= 0 && hours < 6){
            greeting.textContent = (translate[currentLang].night)   
        }
      }
      getTimeOfDay();
    }
  showTime();


  function setLocalStorage() {
    let name = document.querySelector('input.name');
    localStorage.setItem('name', name.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    let name = document.querySelector('input.name');
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)

//3. Слайдер изображений

let randomNum = Math.floor(Math.random() * 20) + 1;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
/*const body = document.querySelector('.body');*/

slideNext.addEventListener('click', () => {
  if(photoLink === 'GitHub'){
    randomNum == 20 ? randomNum = 1 : randomNum++
  setBg()
  }
  if(photoLink === 'Unsplash'){
    getUnsplashImage()
  }
  if(photoLink === 'Flickr'){
    getFlickrImage()
  }
})

slidePrev.addEventListener('click', () => {
  if(photoLink === 'GitHub'){
    randomNum == 1 ? randomNum = 20 : randomNum--
  setBg()
  }
  if(photoLink === 'Unsplash'){
    getUnsplashImage()
  }
  if(photoLink === 'Flickr'){
    getFlickrImage()
  }
})

function setBg(){
  const getTime = () => {
    const d = new Date()
    const h = d.getHours()
    if (h >= 6 && h < 12) return "morning"
    if (h >= 12 && h < 18) return "afternoon"
    if (h >= 18 && h < 24) return "evening"
    if (h >= 0 && h < 6) return "night"
  }
const bgNum = String(randomNum).padStart(2, "0");
const img = new Image();
img.src = `https://raw.githubusercontent.com/karinaguseva/stage1-tasks/assets/images/${getTime()}/${bgNum}.jpg`;
img.onload = () =>{
  document.body.style.backgroundImage = `url(${img.src})`;

  photoLink = 'GitHub'
}
}
setBg()

async function getUnsplashImage() {
  let url;
  const getTime = () => {
    const d = new Date()
    const h = d.getHours()
    if (h >= 6 && h < 12) 
    return url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=morning&client_id=NUZPUlN9dyLPz7PpodlAEPKgxSHZp3efSuLeM5QiDtw';
    if (h >= 12 && h < 18) 
    return url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=afternoon&client_id=NUZPUlN9dyLPz7PpodlAEPKgxSHZp3efSuLeM5QiDtw';
    if (h >= 18 && h < 24) 
    return url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=evening&client_id=NUZPUlN9dyLPz7PpodlAEPKgxSHZp3efSuLeM5QiDtw';
    if (h >= 0 && h < 6) 
    return url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=night&client_id=NUZPUlN9dyLPz7PpodlAEPKgxSHZp3efSuLeM5QiDtw';
  }
  const res = await fetch(getTime());
  const data = await res.json();
  const img = new Image();
  img.src = (data.urls.regular)
  img.onload = () =>{
    document.body.style.backgroundImage = `url(${img.src})`;
    document.body.style.backgroundSize = `cover`
  }
 }

 function getRandomInt() {
  return Math.floor(Math.random() * 100);
}

 async function getFlickrImage() {
  const img = new Image();
  let url;
  const getTime = () => {
    const d = new Date()
    const h = d.getHours()
    if (h >= 6 && h < 12) 
    return url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b28d8a79065cbd946cfab36807c085d5&tags=morning&extras=url_h&format=json&nojsoncallback=1';
    if (h >= 12 && h < 18) 
    return url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b28d8a79065cbd946cfab36807c085d5&tags=afternoon&extras=url_h&format=json&nojsoncallback=1';
    if (h >= 18 && h < 24) 
    return url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b28d8a79065cbd946cfab36807c085d5&tags=evening&extras=url_h&format=json&nojsoncallback=1';
    if (h >= 0 && h < 6) 
    return url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b28d8a79065cbd946cfab36807c085d5&tags=night&extras=url_h&format=json&nojsoncallback=1';
  }
  const res = await fetch(getTime());
  const data = await res.json(); 
  img.src = data.photos.photo[getRandomInt(1, data.photos.photo)].url_h
  img.onload = () =>{
    document.body.style.backgroundImage = `url('${img.src}')`;
    document.body.style.backgroundSize = `cover`
  }
 }



 const select = document.querySelector('.select')
 let photoLink = [
  {
  text: 'GitHub'
  },
  {
    text: 'Unsplash'
  },
  {
    text: 'Flickr'
  }
]


 function selectBG(){
  const index = select.selectedIndex;
  const options = select.options
  photoLink = options[index].text;  
  if (photoLink === 'GitHub') setBg()
  if (photoLink === 'Unsplash') getUnsplashImage()
  if (photoLink === 'Flickr') getFlickrImage()
 }

 select.addEventListener('change', selectBG)


//4. Виджет погоды

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
let city = document.querySelector('input.city');
const weatherError = document.querySelector('.weather-error')

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${translate[currentLang].weather}&appid=ccfedf23b044ee0af5205b692d720ee2&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if (res.status === 200){
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${translate[currentLang].temperature}: ${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `${translate[currentLang].wind}: ${Math.round(data.wind.speed)} ${translate[currentLang].mS}`;
  humidity.textContent = `${translate[currentLang].humidity}: ${Math.round(data.main.humidity)} %`;
  weatherIcon.style.visibility = "visible";
  weatherError.textContent = "";
  } else if (res.status === 400){
    weatherError.textContent = `Error! Nothing to geocode for '${city.value}'!`;
    weatherIcon.style.visibility = "hidden";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  } else if(res.status === 404){
    weatherError.textContent = `Error! Сity not found for ${city.value}!`;
    weatherIcon.style.visibility = "hidden";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }

  /* try{
  } catch(error){
    weatherError.textContent = `Error! city not found for ${city.value}!`;
    weatherError.style.visibility = "visible";
    temperature.style.visibility = "hidden";
    weatherDescription.style.visibility = "hidden";
    wind.style.visibility = "hidden";
    humidity.style.visibility = "hidden";
  }*/ //Если нужно поймать любые ошибки
}

function setCity(event) {
if (event.code === 'Enter') {
  getWeather();
  city.blur();
}
}

function setLocalStorageWeather() {
localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather)

function getLocalStorageWeather() {
city.value = localStorage.getItem('city') || 'Minsk';
}
window.addEventListener('load', getLocalStorageWeather)

window.addEventListener('load', getWeather);
city.addEventListener('keypress', setCity);

//5. Виджет "цитата дня"

const changeQuote = document.querySelector('.change-quote');
const text = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  let quote = Math.floor( Math.random() * data.length );
  const phrase = data[quote][currentLang].text;
  const auth = data[quote][currentLang].author;
  text.innerHTML = phrase;
  author.innerHTML = auth;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes)


//6. Аудиоплеер

import playList from './playList.js';
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const audio = new Audio();
let isPlay = false;

let playNum = 0;
audio.src = playList[playNum].src;

function playNext(){
  playNum == playList.length - 1 ? playNum = 0 : playNum++
  audio.src = playList[playNum].src;
  playAudio()
  activeLi()
}

audio.onended = (playNext);

function playPrev(){
  playNum == 0 ? playNum = playList.length - 1 : playNum--
  audio.src = playList[playNum].src;
  playAudio()
  activeLi()
}

nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

function playAudio() {
  audio.play();
  playBtn.style.backgroundImage = `url(assets/svg/pause.svg)`;
  isPlay = true;
  if(playNum === 0){
    liNum[0].classList.add('item-active');
  }
}

function pauseAudio() {
  audio.pause();
  playBtn.style.backgroundImage = `url(assets/svg/play.svg)`;
  isPlay = false;
}

playBtn.addEventListener('click', () => {
  isPlay == false ? playAudio() : pauseAudio(); 
});

const playListContainer = document.querySelector('.play-list')

//создание li элементов в зависимости от количества треков
for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.setAttribute('class', 'liclass');
  li.classList.add('play-item');
  li.textContent = playList[i].title;
  playListContainer.append(li);
};

let liNum = document.querySelectorAll('.liclass')

//активность li элементов во время проигрывания определенного трека
function activeLi(){
  for(let i = 0; i < liNum.length; i++) {
    if(i === playNum){
      liNum[i].classList.add('item-active');
    } else {
      liNum[i].classList.remove('item-active');
    }
  }
};

//работа плеера при нажатии на li элемент
for(let i = 0; i < liNum.length; i++){
  liNum[i].addEventListener('click',() =>{
    playNum = i;
    activeLi()
    audio.src = playList[playNum].src;
    playAudio()
  })  
}

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

//движение прогресс-бара
function updateProgress(e){
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

//нажатие на прогресс-бар
function setsProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setsProgress)

const current = document.querySelector('.current');
const length = document.querySelector('.length');
const title = document.querySelector('.title');

//текущее и общее время трека + текущее название трека
function timeSong(){
  current.innerHTML = (formatTime(audio.currentTime));
  length.innerHTML = playList[playNum].duration;
  title.innerHTML = playList[playNum].title; //название трека
}

audio.addEventListener('timeupdate', timeSong);
audio.addEventListener('loadeddata', timeSong);

//форматирование времени
function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

//кнопка громкости
const volumeBtn = document.querySelector('.volume-button')
let isMuted = false

function mute(){
  isMuted = true
  volumeBtn.classList.add('muted')
  audio.muted = true
}
function noMute(){
  isMuted = false
  volumeBtn.classList.remove('muted')
  audio.muted = false
}

volumeBtn.addEventListener('click', () => {
    if (isMuted === false) {
      mute()
    } else {
      noMute()
    }
})

//слайдер громкости
const volumeProgress = document.querySelector('.volume-progress');

volumeProgress.oninput = function() {
  volumeProgress.value = this.value;
  audio.volume = this.value / 100; 
  if(this.value != 0){
    noMute()
  } else{
    mute()
  }
}

//TODO List

const todoWrapper = document.querySelector('.wrapper-todo');
const todoBtn = document.querySelector('.todo');

todoBtn.addEventListener('click', () => {
    todoWrapper.classList.toggle('wrapper-todo-active')
})

const todoInput = document.querySelector('.todo-descrip');
const todoTaskBtn = document.querySelector('.todo-btn');
const todosWrapper = document.querySelector('.todos-wrapper');

const titleTodo = document.querySelector('.title-todo')
titleTodo.textContent = translate[currentLang].titleTodo
todoTaskBtn.textContent = translate[currentLang].todoAdd

let tasks = [];
isListEmpty();

if (localStorage.getItem('tasks')){
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task){
  const newClass = task.done ? 'description done-task' : 'description';
  const taskList = `
  <div id="${task.id}" class="todo-item">
    <div class="${newClass}">${task.text}</div>
    <div class="buttons">
      <button data-action="done" class="done-btn">V</button>
      <button data-action="delete" class="delete-btn">X</button>
    </div>
  </div>
  `;
  todosWrapper.insertAdjacentHTML('beforeend', taskList);
  isListEmpty();
})

function addTask(){
  const taskText = todoInput.value;
  
  const newTask = {
    id: Date.now(), //отслеживание задачи в милисекундах
    text: taskText,
    done: false
  }

  tasks.push(newTask);
  todoLocalStorage();

  //формирование css класса
  const newClass = newTask.done ? 'description done-task' : 'description';

  const taskList = `
  <div id="${newTask.id}" class="todo-item">
    <div class="${newClass}">${newTask.text}</div>
    <div class="buttons">
      <button data-action="done" class="done-btn">V</button>
      <button data-action="delete" class="delete-btn">X</button>
    </div>
  </div>
  `;
  todosWrapper.insertAdjacentHTML('beforeend', taskList);
  todoInput.value = '';
  todoInput.focus();
  isListEmpty();
};


const titleChange = document.querySelector('.todo-descrip');
titleChange.placeholder = translate[currentLang].placeTodo
function setTask(event) {
  if (event.code === 'Enter' && todoInput.value != 0) {
    titleChange.placeholder = translate[currentLang].placeTodo;
    addTask();
  }else {
    titleChange.placeholder = translate[currentLang].placeTodowrong;
    todoInput.focus();
  }
};
function setTaskClick() {
    if (todoInput.value != 0) {
        titleChange.placeholder = translate[currentLang].placeTodo;
      addTask();
    }else {
        titleChange.placeholder = translate[currentLang].placeTodowrong;
        todoInput.focus();
    }
  };
todoInput.addEventListener('keypress', setTask);
todoTaskBtn.addEventListener('click', setTaskClick);

function deleteTask(event){
//Проверяем, если клик был не по кнопке удалить
if(event.target.dataset.action !== 'delete') return;
  const parentNode = event.target.closest('.todo-item');

  const id = Number(parentNode.id);
  
  //находим ту задачу, которую удаляем
  const index = tasks.findIndex((task) => task.id === id) 
  
  //удаляем из массива
  tasks.splice(index, 1); 
  todoLocalStorage();

  parentNode.remove();
  isListEmpty();
};

todosWrapper.addEventListener('click', deleteTask);

function doneTask(event){
  if(event.target.dataset.action != 'done') return;
    const parentNode = event.target.closest('.todo-item');
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done
    todoLocalStorage();
    const taskDescr = parentNode.querySelector('.description');
    taskDescr.classList.toggle('done-task');
};

todosWrapper.addEventListener('click', doneTask);

function isListEmpty(){
  if(tasks.length === 0){
    const emptyList = `
    <div class="empty-list">
          <h3 class="empty-title">${translate[currentLang].noTasks}</h3>
    </div>`
    todosWrapper.insertAdjacentHTML('afterbegin', emptyList);
  } else if (tasks.length > 0){
    const emptyListElement = document.querySelector('.empty-list');
    emptyListElement ? emptyListElement.remove() : null;
  }
}


function todoLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//настройки приложения

const sliderBtn = document.querySelectorAll('.slider-btn')
const clockCheck = document.getElementById('clock')
const dateCheck = document.getElementById('datecheck')
const greetingCheck = document.getElementById('greeting')
const weatherCheck = document.getElementById('weather')
const playerCheck = document.getElementById('player')
const quotesCheck = document.getElementById('quotes')
const todoCheck = document.getElementById('todo')

//часы появление/исчезновение + сохранение в localStorage

function isClock(){
  const time = document.querySelector('.time');
  if (clockCheck.checked){
      time.classList.add('hidden-item')
  } else {
    time.classList.remove('hidden-item')}
  localStorage.setItem(clockCheck.name, clockCheck.checked)
}
clockCheck.addEventListener('change', isClock)

if(localStorage.getItem('clock') == 'true'){
  const time = document.querySelector('.time');
  time.classList.add('hidden-item')
  clockCheck.checked = localStorage.getItem('clock')
}

//дата появление/исчезновение + сохранение в localStorage

function isDate(){
  const date = document.querySelector('.date');
  if (dateCheck.checked){
    date.classList.add('hidden-item')
  } else {
    date.classList.remove('hidden-item')}
  localStorage.setItem(dateCheck.name, dateCheck.checked)
}
dateCheck.addEventListener('change', isDate)

if(localStorage.getItem('date') == 'true'){
  const date = document.querySelector('.date');
  date.classList.add('hidden-item')
  dateCheck.checked = localStorage.getItem('date')
}

//приветствие появление/исчезновение + сохранение в localStorage

function isGreeting(){
  const greeting = document.querySelector('.greeting-container');
  const name = document.querySelector('.name');      
  if (greetingCheck.checked){
    greeting.classList.add('hidden-item')
    name.classList.add('hidden-item')
  } else {
    greeting.classList.remove('hidden-item')
    name.classList.remove('hidden-item')}
  localStorage.setItem(greetingCheck.name, greetingCheck.checked)
}
greetingCheck.addEventListener('change', isGreeting)

if(localStorage.getItem('greeting') == 'true'){
  const greeting = document.querySelector('.greeting-container');
  const name = document.querySelector('.name');  
  greeting.classList.add('hidden-item')
  name.classList.add('hidden-item')
  greetingCheck.checked = localStorage.getItem('greeting')
}

//погода появление/исчезновение + сохранение в localStorage

function isWeather(){
  const weather = document.querySelector('.weather');        
  if (weatherCheck.checked){
    weather.classList.add('hidden-item') 
  } else {
    weather.classList.remove('hidden-item') }
  localStorage.setItem(weatherCheck.name, weatherCheck.checked)
}
weatherCheck.addEventListener('change', isWeather)

if(localStorage.getItem('weather') == 'true'){
  const weather = document.querySelector('.weather');
  weather.classList.add('hidden-item') 
  weatherCheck.checked = localStorage.getItem('weather')
}

//плеер появление/исчезновение + сохранение в localStorage

function isPlayer(){
  const player = document.querySelector('.player');
  if (playerCheck.checked){
    player.classList.add('hidden-item')
    pauseAudio()
  } else {
    player.classList.remove('hidden-item')}
  localStorage.setItem(playerCheck.name, playerCheck.checked)
}
playerCheck.addEventListener('change', isPlayer)

if(localStorage.getItem('player') == 'true'){
  const player = document.querySelector('.player');
  player.classList.add('hidden-item')
  playerCheck.checked = localStorage.getItem('player')
}

//цитаты появление/исчезновение + сохранение в localStorage

function isQuotes(){
  const quoteContainer = document.querySelector('.quote-container');
  const changeQuote = document.querySelector('.change-quote');    
  if (quotesCheck.checked){
    quoteContainer.classList.add('hidden-item')
    changeQuote.classList.add('hidden-item')
  } else {
    quoteContainer.classList.remove('hidden-item')
    changeQuote.classList.remove('hidden-item')}
  localStorage.setItem(quotesCheck.name, quotesCheck.checked)
}
quotesCheck.addEventListener('change', isQuotes)

if(localStorage.getItem('quotes') == 'true'){
  const quoteContainer = document.querySelector('.quote-container');
  const changeQuote = document.querySelector('.change-quote');    
  quoteContainer.classList.add('hidden-item')
  changeQuote.classList.add('hidden-item')
  quotesCheck.checked = localStorage.getItem('quotes')
}

//todo приложение появление/исчезновение + сохранение в localStorage

function isTodo(){
  const todoBtn = document.querySelector('.todo');
  const todoWrapper = document.querySelector('.wrapper-todo');  
  if (todoCheck.checked){
    todoBtn.classList.add('hidden-item')
    todoWrapper.classList.add('hidden-item')
  } else {
    todoBtn.classList.remove('hidden-item')
    todoWrapper.classList.remove('hidden-item')}
  localStorage.setItem(todoCheck.name, todoCheck.checked)
}
todoCheck.addEventListener('change', isTodo)

if(localStorage.getItem('todo list') == 'true'){
  const todoBtn = document.querySelector('.todo');
  const todoWrapper = document.querySelector('.wrapper-todo');
  todoBtn.classList.add('hidden-item')
  todoWrapper.classList.add('hidden-item')
  todoCheck.checked = localStorage.getItem('todo list')
}


  
const settingsBtn = document.querySelector('.settings-btn')
const settingsWrapper = document.querySelector('.settings-wrapper')

settingsBtn.addEventListener('click', () =>{
  settingsWrapper.classList.toggle('settings-wrapper-active')
})

const emptyTitle = document.querySelector('.empty-title')

const settingClock = document.querySelector('.setting-clock')
const settingDate = document.querySelector('.setting-date')
const settingGreeting = document.querySelector('.setting-greeting')
const settingWeather = document.querySelector('.setting-weather')
const settingPlayer = document.querySelector('.setting-player')
const settingQuotes = document.querySelector('.setting-quotes')
const settingTodo = document.querySelector('.setting-todo')
const settingLanguage = document.querySelector('.setting-language')

function settingLang() {
  settingClock.textContent = translate[currentLang].setClock
  settingDate.textContent = translate[currentLang].setDate
  settingGreeting.textContent = translate[currentLang].setGreeting
  settingWeather.textContent = translate[currentLang].setWeather
  settingPlayer.textContent = translate[currentLang].setPlayer
  settingQuotes.textContent = translate[currentLang].setQuotes
  settingTodo.textContent = translate[currentLang].setTodoList
  settingLanguage.textContent = translate[currentLang].setLang
}
settingLang()

let greetingText = document.querySelector('.name')
greetingText.setAttribute('placeholder', translate[currentLang].placeholder);

const langBtn = document.querySelector('.item-lang')
function lang() {
  langBtn.classList.toggle('russian')
  if(langBtn.classList.contains('russian'))
  {
    langBtn.setAttribute('value', 'ru')
  }
  else {
    langBtn.setAttribute('value', 'en')
  }
  currentLang = langBtn.getAttribute('value')
  getWeather();
  getQuotes();
  settingLang();
  todoTaskBtn.textContent = translate[currentLang].todoAdd
  titleChange.placeholder = translate[currentLang].placeTodo
  titleTodo.textContent = translate[currentLang].titleTodo
  greetingText.setAttribute('placeholder', translate[currentLang].placeholder);
  emptyTitle.textContent = translate[currentLang].noTasks
  localStorage.setItem('lang', currentLang);
}

langBtn.addEventListener('click', lang);

if(localStorage.getItem('lang')) {
  currentLang = localStorage.getItem('lang');
  langBtn.setAttribute('value', localStorage.getItem('lang'));
  currentLang = langBtn.getAttribute('value')
  getWeather();
  getQuotes();
  settingLang();
  todoTaskBtn.textContent = translate[currentLang].todoAdd
  titleChange.placeholder = translate[currentLang].placeTodo
  titleTodo.textContent = translate[currentLang].titleTodo
  greetingText.setAttribute('placeholder', translate[currentLang].placeholder);
  emptyTitle.textContent = translate[currentLang].noTasks
  if (langBtn.getAttribute('value') === 'ru') langBtn.classList.add('russian')
  else {
    langBtn.classList.remove('russian')
  }
}