/*import translate from './translate.js';*/

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
        const currentDate = date.toLocaleDateString('en-En', options);
        data.innerHTML = currentDate;
      }
      showDate();

      
//2. Приветствие

    function getTimeOfDay() {
    const hours = date.getHours();
    const greeting = document.querySelector('.greeting');
        if (hours >= 6 && hours < 12){
            greeting.textContent = ('Good morning') 
        }
        else if(hours >= 12 && hours < 18){
            greeting.textContent = ('Good afternoon') 
        }
        else if(hours >= 18 && hours < 24){
            greeting.textContent = ('Good evening') 
        }
        else if(hours >= 0 && hours < 6){
            greeting.textContent = ('Good night')   
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
  randomNum == 20 ? randomNum = 1 : randomNum++
  setBg()
})

slidePrev.addEventListener('click', () => {
  randomNum == 1 ? randomNum = 20 : randomNum--
  setBg()
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
/*console.log (bgNum)*/
const img = new Image();
img.src = `https://raw.githubusercontent.com/karinaguseva/stage1-tasks/assets/images/${getTime()}/${bgNum}.jpg`;
img.onload = () =>{
  document.body.style.backgroundImage = `url(${img.src})`;
}
setTimeout(setBg, 1000);
/*console.log (img)*/
}
setBg()



//4. Виджет погоды

  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  let city = document.querySelector('input.city');
  const weatherError = document.querySelector('.weather-error')

  async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=ccfedf23b044ee0af5205b692d720ee2&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    if (res.status === 200){
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
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
  const phrase = data[quote].text;
  const auth = data[quote].author;
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
  playBtn.style.backgroundImage = `url(../assets/svg/pause.svg)`;
  isPlay = true;
  if(playNum === 0){
    liNum[0].classList.add('item-active');
  }
}

function pauseAudio() {
  audio.pause();
  playBtn.style.backgroundImage = `url(../assets/svg/play.svg)`;
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



//получение изоббражений от API

/*async function getLinkToImage() {
 const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=morning&client_id=NUZPUlN9dyLPz7PpodlAEPKgxSHZp3efSuLeM5QiDtw';
 const res = await fetch(url);
 const data = await res.json();
 console.log(data.urls.regular)
}

getLinkToImage()*/



const todoInput = document.querySelector('.todo-descrip');
const todoTaskBtn = document.querySelector('.todo-btn');
const todosWrapper = document.querySelector('.todos-wrapper');

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
      <button data-action="done" class="done-btn">Done</button>
      <button data-action="delete" class="delete-btn">Delete</button>
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
  todoLocalStorege();

  //формирование css класса
  const newClass = newTask.done ? 'description done-task' : 'description';

  const taskList = `
  <div id="${newTask.id}" class="todo-item">
    <div class="${newClass}">${newTask.text}</div>
    <div class="buttons">
      <button data-action="done" class="done-btn">Done</button>
      <button data-action="delete" class="delete-btn">Delete</button>
    </div>
  </div>
  `;
  todosWrapper.insertAdjacentHTML('beforeend', taskList);
  todoInput.value = '';
  todoInput.focus();
  isListEmpty();
};

function setTask(event) {
  if (event.code === 'Enter') {
    addTask();
  };
};
todoInput.addEventListener('keypress', setTask);
todoTaskBtn.addEventListener('click', addTask);

function deleteTask(event){
//Проверяем, если клик был не по кнопке удалить
if(event.target.dataset.action !== 'delete') return;
  const parentNode = event.target.closest('.todo-item');

  const id = Number(parentNode.id);
  
  //находим ту задачу, которую удаляем
  const index = tasks.findIndex((task) => task.id === id) 
  
  //удаляем из массива
  tasks.splice(index, 1); 
  todoLocalStorege();

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
    todoLocalStorege();
    const taskDescr = parentNode.querySelector('.description');
    taskDescr.classList.toggle('done-task');
};

todosWrapper.addEventListener('click', doneTask);

function isListEmpty(){
  if(tasks.length === 0){
    const emptyList = `
    <div class="empty-list">
          <h3 class="empty-title">Add Task</h3>
    </div>`
    todosWrapper.insertAdjacentHTML('afterbegin', emptyList);
  } else if (tasks.length > 0){
    const emptyListElement = document.querySelector('.empty-list');
    emptyListElement ? emptyListElement.remove() : null;
  }
}


function todoLocalStorege(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


