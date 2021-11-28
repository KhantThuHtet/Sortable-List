const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById('check');
function createList() {
    let shuffleArr = richestPeople.map((el) => ({el, sort: Math.random()}))
                                .sort((x, y) => x.sort - y.sort)
                                .map(val => val.el);
    shuffleArr.map((el, index) => {
      draggableList.innerHTML += `
      <li class='dragArea'>
        <span class="number">${index + 1}</span>
        <div class="draggable" data-drag_index='${index}' draggable="true">
            <p class="person-name">
                ${el}
            </p>
            <i class="fas fa-grip-lines" aria-hidden="true"></i>
        </div>
      </li>`;
    });
}
createList();


document.addEventListener("dragstart", (event) => {
  const draggedID = event.target.dataset.drag_index;
  event.dataTransfer.setData('draggedID', draggedID);
  event.target.style.opacity = '0.5';
});

document.addEventListener('dragend', (event) =>{
  event.target.style.opacity = '';
});

document.addEventListener('dragenter', (event) =>{
  event.target.style.backgroundColor = '#eee';
});

document.addEventListener('dragleave', (event) =>{
  event.target.style.backgroundColor = "#fff";
});

document.addEventListener('dragover', (event) =>{
  event.preventDefault();
});

document.addEventListener('drop', (event)=>{
  event.target.style.backgroundColor = "#fff";
  
  let dragStartID;
  let dragEndID; 
  let dragStart;
  let dragEnd;
  let dragStartValue;
  let dragEndValue;

  if (!event.target.classList.contains("draggable")) {
    dragStartID = event.dataTransfer.getData("draggedID");
    dragEndID = event.target.parentNode.dataset.drag_index;
    dragStart = document.querySelector(`[data-drag_index='${dragStartID}']`);
    dragEnd = document.querySelector(`[data-drag_index='${dragEndID}']`);
    dragStartValue = dragStart.innerHTML;
    dragEndValue = dragEnd.innerHTML;
    dragStart.innerHTML = dragEndValue;
    dragEnd.innerHTML = dragStartValue;
    return;
  }
  dragStartID = event.dataTransfer.getData("draggedID");
  dragEndID = event.target.dataset.drag_index;
  dragStart = document.querySelector(`[data-drag_index='${dragStartID}']`);
  dragEnd = document.querySelector(`[data-drag_index='${dragEndID}']`);
  dragStartValue = dragStart.innerHTML;
  dragEndValue = dragEnd.innerHTML;
  dragStart.innerHTML = dragEndValue;
  dragEnd.innerHTML = dragStartValue;
  console.log(dragStartID, dragEndID);
});

checkBtn.addEventListener('click', ()=>{
  let p = document.querySelectorAll('.person-name');
  
  let nameNodeList = Array.from(p);
  let nameArr = nameNodeList.map(el=>{
    return (el.textContent.trim());
  });

  richestPeople.forEach((el, index) =>{
    if (el == nameArr[index]) {
      let trueValueTag = document.querySelector(`[data-drag_index='${index}']`);
      let trueName = trueValueTag.querySelector('p');
      trueName.classList.remove('wrong');
      trueName.classList.add('success');
    }else{
      let wrongValueTag = document.querySelector(`[data-drag_index='${index}']`);
      let wrongName = wrongValueTag.querySelector("p");
      wrongName.classList.remove('success');
      wrongName.classList.add("wrong");
    }
  })
});

