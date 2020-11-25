(function () {
  const bttnAddTask = document.getElementById("submitEvent");
  bttnAddTask.addEventListener("click", addEvent);
  const onDateClick= document.querySelector("#selected");
   const  dailytask= document.querySelector(".scroll");
   const modal = document.getElementById("myModal");
  let db = null;

  function getTags(){
    const currentDate = document.getElementsByClassName("date date--current")[0];
    const selectedDate = document.getElementsByClassName("date date--selected")[0];
    const dateTagContent=selectedDate!=undefined?selectedDate.innerHTML:currentDate.innerHTML;
    const selectMonth = document.getElementsByClassName("month")[0].innerHTML;
    const selectedYear = document.getElementsByClassName("year")[0].innerHTML;
    return [dateTagContent,selectMonth,selectedYear]
  }
  
  function addEvent() {
  [dateTagContent,selectMonth,selectedYear]=getTags();
    var timestamp = new Date().getTime();
    const transaction = db.transaction("Schedule", 'readwrite');
    const objectStore = transaction.objectStore("Schedule");
    const hour = document.getElementById("hour").value;
    const minute = document.getElementById("minute").value;
    const todo = document.getElementById("todo").value;
    const getTime = hour + ":" + minute;
    if(hour.length==2 && hour<=23 && hour>=00 && minute<=59 && minute>=00 && minute.length==2 && todo.length>0)
    {
    objectStore.put({ date:(dateTagContent + selectMonth + selectedYear + hour+minute+timestamp).toLowerCase(), time: getTime, task: todo });
    modal.style.display = "none";
    displayTasks();
    }  
    event.preventDefault();
  }

  function displayTasks(e=undefined) {
    debugger;
  if(!(e!=undefined && (e.target.className=="date date--prevmonth" || e.target.className=="date date--nextmonth"))){
    let flag=0;
    let tasks='';
    if(e && e.target.className!="" &&e.target.className!=undefined){
      [dateTagContent,selectMonth,selectedYear]=getTags(e);
       dateTagContent=e.target.innerHTML;
    }
    else
    {
     [dateTagContent,selectMonth,selectedYear]=getTags();
    }
    const concatMYD=(dateTagContent + selectMonth + selectedYear).toLowerCase();
    var keyRangeValue = IDBKeyRange.bound(`${concatMYD}00001606044657606`,`${concatMYD}23599999999999999`);
    const transaction = db.transaction('Schedule', 'readonly');
    const objectStore = transaction.objectStore('Schedule');
    objectStore.openCursor(keyRangeValue).onsuccess = function(event) {
      
    flag++;
    var cursor = event.target.result;
      if(cursor) {
        tasks+=` <div><p class="time">${cursor.value.time}</p>
         <p class="work">${cursor.value.task}</p></div>`;
        cursor.continue();
      } else {
        if(flag==1){
        tasks+=` <div><p>No Task is Added Yet</p></div>`;
         dailytask.innerHTML=tasks;
        }
        else
        {
         dailytask.innerHTML=tasks;
        } 
      }
      }

  }
  
    }
  function createDB() {
    const request = indexedDB.open("Calender-Tasks", 1);
    request.onupgradeneeded = e => {
      const objectStore = e.currentTarget.result.createObjectStore(
        "Schedule", { keyPath: "date" });
      objectStore.createIndex("time", "time", { unique: false });
      objectStore.createIndex("task", "task", { unique: false });
    }
    request.onsuccess = e => {
      db = e.target.result;
      displayTasks();
      
    }
    request.onerror = e => {
      alert(`error ${e.target.error}`)
    }
  }
  createDB();
  onDateClick.addEventListener('click',displayTasks);
})();