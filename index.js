// Phase 1 (button toggle etc)
let isDOBOpen = false;
let dateOfBirth;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");

// phase 2 *(afterDOBTEXT)
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");


// Phase 3 (year month etx)
const yearEl = document.getElementById("year");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");


// function for showing double digit
const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
};

const updateAge = () => {
    const currentDate = new Date();
    const dateDiff = currentDate - dateOfBirth;
    const year = Math.floor(dateDiff/(1000*60*60*24*365));
    const month = Math.floor(dateDiff/(1000*60*60*24*365) % 12);
    const day = Math.floor(dateDiff/(1000*60*60*24)) % 30;
    const hour = Math.floor(dateDiff/(1000*60*60)) % 24;
    const minute = Math.floor(dateDiff/(1000*60)) % 60;
    const second = Math.floor(dateDiff/(1000)) % 60;
    // console.log(month);
    // console.log("date diff is",dateDiff); // it gives in secondss

    // updating
    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthsEl.innerHTML = makeTwoDigitNumber(month);
    daysEl.innerHTML = makeTwoDigitNumber(day);
    hoursEl.innerHTML = makeTwoDigitNumber(hour);
    minutesEl.innerHTML = makeTwoDigitNumber(minute);
    secondsEl.innerHTML = makeTwoDigitNumber(second);
};

// 
const localStorageGetter = () => {
    const year = localStorage.getItem('year');
    const month = localStorage.getItem('month');
    const date = localStorage.getItem('date');
    // const hour = localStorage.getItem('hour');
    // const minute = localStorage.getItem('minute');
    // const second = localStorage.getItem('second');
    if(year && month && date){
        dateOfBirth = new Date(year,month,date);
    }
    updateAge();
};

const contentToggler = ()=>{
    updateAge();
    if(dateOfBirth){


        initialTextEl.classList.add("hide");
        afterDOBBtnTxtEl.classList.remove("hide");
        
    }
    else{
        afterDOBBtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};

const toggleDateOfBirthSelector = () => {
    if(isDOBOpen){
        settingContentEl.classList.add("hide");
    }
    else{
        settingContentEl.classList.remove("hide");
    }

    isDOBOpen = !isDOBOpen;

    // console.log("Toggle",isDOBOpen);
};




const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;



    if(dateOfBirth){

        localStorage.setItem("year",dateOfBirth.getFullYear());
        localStorage.setItem("month",dateOfBirth.getMonth());
        localStorage.setItem("date",dateOfBirth.getDate());
        // localStorage.setItem("hour",dateOfBirth.getHours());
        // localStorage.setItem("minute",dateOfBirth.getMinutes());
        // localStorage.setItem("second",dateOfBirth.getSeconds());

        
        
    }
    
   
    setInterval(()=>updateAge(),1000);
    contentToggler();
    // console.log("date of birth",dateOfBirth);
};

localStorageGetter();
contentToggler();
// setDOBHandler();



settingCogEl.addEventListener('click', toggleDateOfBirthSelector);
dobButtonEl.addEventListener('click', setDOBHandler);