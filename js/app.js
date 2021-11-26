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
const check = document.getElementById('check');

function createList() {
    richestPeople.map(el=>{
        draggableList.innerHTML += `
      <li>
        <span class="number"></span>
        <div class="draggable" draggable="true">
            <p class="person-name">
                ${el}
            </p>
            <i class="fas fa-grip-lines" aria-hidden="true"></i>
        </div>
      </li>`;
    });
}
createList();



