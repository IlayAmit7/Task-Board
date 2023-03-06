let arr = [];

function getItems() {
  let ul = document.querySelector("ul");

  if (localStorage.getItem("notes") != null) {
    arr = JSON.parse(localStorage.getItem("notes"));

    for (let i = 0; i < arr.length; i++) {
        
        let li = document.createElement("li");
        li.className = "note-style";
        arr[i].id = "note" + i;
        li.id = "note" + i;

        let delContainer = document.createElement("div");

        delContainer.className = "container-delete-icon";
        li.appendChild(delContainer);

        let delBtn = document.createElement("button");

        delBtn.setAttribute("type", "button");
        delContainer.appendChild(delBtn);

        let delIcon = document.createElement("i");

        delIcon.className = "fas fa-window-close delete";
        delBtn.appendChild(delIcon);

        let contentContainer = document.createElement("div");
        
        contentContainer.className = "task-note";

        let contentParagraph = document.createElement("p");
        
          contentContainer.appendChild(contentParagraph);
          contentParagraph.appendChild(document.createTextNode(arr[i].taskContent));
          li.appendChild(contentContainer);


        let dateTimeContainer = document.createElement("div");
          
          dateTimeContainer.className = "task-date-time";

        let dateParagraph = document.createElement("p");

        let timeParagraph = document.createElement("p");

          dateTimeContainer.appendChild(dateParagraph);
          arr[i].taskDate = arr[i].taskDate.split('-').reverse().join('/');
          dateParagraph.appendChild(document.createTextNode(arr[i].taskDate));
          dateTimeContainer.appendChild(timeParagraph);
          timeParagraph.appendChild(document.createTextNode(arr[i].taskTime));
          li.appendChild(dateTimeContainer);
          ul.appendChild(li);
      }
  }
}

getItems();


document.querySelector("form").addEventListener("submit", function(submit) {

    let ul = document.querySelector("ul");
    
    let containerStatus = document.querySelector("#container-status");

    let taskContent = document.querySelector("#task-content");
    
    let taskDate = document.querySelector("#task-date");

    let dateValue = taskDate.value.split('-').reverse().join('/');

    let taskTime = document.querySelector("#task-time");

    let dateObj = new Date();

    let month = dateObj.getUTCMonth() + 1;

    let day = dateObj.getUTCDate(); 

    let year = dateObj.getUTCFullYear();

    let minDate = year + "-" + "0" + month + "-" + "0" + day;

    minDate = minDate.split('-').reverse().join('/');
    
    if (taskContent.value === "") {
      containerStatus.innerText = "Enter task description";
      containerStatus.style.padding = "2px 0";
      containerStatus.style.backgroundColor = "#e63922";

    } else if (dateValue === "") {
      containerStatus.innerText = "Enter task date";
      containerStatus.style.padding = "2px 0";
      containerStatus.style.backgroundColor = "#e63922"; 

    } else if(dateValue < minDate) {
      containerStatus.innerText = "Date must be " + minDate + " or later";
      containerStatus.style.padding = "2px 0";
      containerStatus.style.backgroundColor = "#e63922";

    } else {
      containerStatus.innerText = "The task was successfully added";
      containerStatus.style.padding = "2px 0";
      containerStatus.style.backgroundColor = "#2ecc71";
      
      arr.push({
        taskContent: taskContent.value,
        taskDate: dateValue,
        taskTime: taskTime.value,
      });
  
     
      let li = document.createElement("li");
      for (let i = 0; i < arr.length; i++) {
        li.className = "note-style";
        arr[i].id = "note" + i;
        li.id = arr[i].id;
      }
  
      localStorage.setItem('notes', JSON.stringify(arr));
  
      let delContainer = document.createElement("div");
      delContainer.className = "container-delete-icon";
      li.appendChild(delContainer);

      let delBtn = document.createElement("button");
      delBtn.setAttribute("type", "button");
      delContainer.appendChild(delBtn);

      let delIcon = document.createElement("i");
      delIcon.className = "fas fa-window-close delete";
      delBtn.appendChild(delIcon);
  
      let contentContainer = document.createElement("div");
      contentContainer.className = "task-note";

      let contentParagraph = document.createElement("p");
      contentContainer.appendChild(contentParagraph);
      contentParagraph.appendChild(document.createTextNode(taskContent.value));
      li.appendChild(contentContainer);
  
      let dateTimeContainer = document.createElement("div");
      dateTimeContainer.className = "task-date-time";
      let dateParagraph = document.createElement("p");

      let timeParagraph = document.createElement("p");
      dateTimeContainer.appendChild(dateParagraph);
      dateParagraph.appendChild(document.createTextNode(dateValue));
      dateTimeContainer.appendChild(timeParagraph);
      timeParagraph.appendChild(document.createTextNode(taskTime.value));
      li.appendChild(dateTimeContainer);
      ul.appendChild(li); 
      
      document.querySelector("#task-content").value = "";
      document.querySelector("#task-date").value = "";
      document.querySelector("#task-time").value = "";
    }

    submit.preventDefault();
});


document.querySelector("ul").addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
      if (confirm("Are you sure that you want to delete this task?")) {
        let ul = document.querySelector("ul");
        let containerStatus = document.querySelector("#container-status");
        let li = e.path[3];
        let noteId = e.path[3].id;
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
          for (let k = 0; k < arr[i].id.length; k++) {
            if (noteId === arr[i].id) { 
              index = i;
            }
          }
        }
  
        ul.removeChild(li);  
        arr.splice(index, 1);
  
        let note = document.querySelectorAll("li");
        for (let i = 0; i < arr.length; i++) {
          arr[i].id = "note" + i;
          note[i].id = "note" + i;
        }
  
        localStorage.setItem('notes', JSON.stringify(arr));
  
        if (localStorage.notes === "[]") {
          localStorage.removeItem("notes");
        }
  
        containerStatus.innerText = "The task was removed";
        containerStatus.style.padding = "2px 0";
        containerStatus.style.backgroundColor = "#2ecc71";
      }
    }
});