(function () {
  const date = new Date();
  const bttnMonth = document.querySelector('#arrowbttn');
  const bttnDate = document.querySelector('#selected');
  const toggleSwitch = document.querySelector('.task__dark');
  const backgroundChange = document.querySelector(".container")
  const containerBackgroudChange=document.querySelector(".calender")
  const theme=document.querySelector(".theme")
  const bodyTheme=document.querySelector("body")
  // popUP
   
  const modal = document.getElementById("myModal");
  const  bttnAdd = document.getElementById("addTask");
  const bttnSubmit=document.getElementById("submitEvent");
  const bttnCancel=document.getElementById("cancelEvent");



  const renderUI = (checkSelected = false) => {
    debugger;
    date.setDate(1);

    const monthDays = document.querySelector(".calender__days");

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(),0).getDate();

    const currentMonthStartDate = date.getDay()+6;


    const currentMonthLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextMonthStartDate = 7 - currentMonthLastDate - 1;

    let days = '';

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    document.querySelector('.month').innerHTML = months[date.getMonth()].toLocaleUpperCase();
    document.querySelector('.year').innerHTML = date.getFullYear();

    for (let i = (currentMonthStartDate%7); i > 0; i--) {
      days += `<div class="date date--prevmonth">${prevMonthLastDate - i+1}</div>`;
    }

    for (let dayInc = 1; dayInc <= lastDay; dayInc++) {
     
      if (dayInc === new Date().getDate() &&  date.getMonth() === new Date().getMonth()) {
        days += `<div class="date date--current">${dayInc}</div>`;
      } else {
        // const checkNum = Number(checkSelected.innerHTML);
       
      
        if (Number(checkSelected.innerHTML) == dayInc && dayInc != new Date().getDate() &&(date.getMonth() === new Date().getMonth() || date.getMonth() !== new Date().getMonth())) {
          debugger;
          days += `<div class="date date--selected">${dayInc}</div>`;
        } else {
          days += `<div>${dayInc}</div>`;
        }
      }
    }

    for (let iteration = 1; iteration<= nextMonthStartDate+1; iteration++) {
      days += `<div class="date date--nextmonth">${iteration}</div>`;
     
    }
     monthDays.innerHTML = days;
  }

  function getMonth(e) {

    function nextMonth() {
      date.setMonth(date.getMonth() + 1);
      renderUI();
    }

    function prevMonth() {
      date.setMonth(date.getMonth() - 1);
      renderUI();
    }

    e.target.className.slice(0, 5) == 'arrow' ? (e.target.className.slice(6) === 'arrow--right' ? nextMonth() : prevMonth()) : null;
  }

  function selectDate(e) {
   debugger;
    console.log(e.target.className);
    if (e.target.className == '' ||e.target.className == 'date date--current') {
      renderUI(e.target)
    }
  }

  function toggle(e) {
    theme.innerHTML=="Night Mode"?theme.innerHTML="Light Mode":theme.innerHTML="Night Mode";
    bodyTheme.classList.toggle("night");
    // containerBackgroudChange.classList.toggle("night");
  }

  bttnAdd.onclick = function() {

  
  modal.style.display = "block";
   }

  bttnCancel.onclick = function() {
  modal.style.display = "none";
}



  bttnMonth.addEventListener('click', getMonth)
  renderUI();

  bttnDate.addEventListener('click', selectDate);
  toggleSwitch.addEventListener('click', toggle)
})()


