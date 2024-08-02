/// Count Items left
const itemCount = document.querySelector(".count span") as HTMLSpanElement;
const mobCount = document.querySelector(".mob-count span") as HTMLSpanElement;

const listCount = document.querySelectorAll(".list").length;

itemCount.innerText = listCount.toString();
mobCount.innerText = listCount.toString();

// Change Theme Color
const themeIcons = document.querySelector(".theme") as HTMLImageElement;

themeIcons.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeIcons.src = "images/icon-moon.svg";
  } else {
    themeIcons.src = "images/icon-sun.svg";
  }
});

// Add Items TO Todo List
const addButton = document.querySelector(
  ".todo-input button"
) as HTMLButtonElement;
const itemInput = document.getElementById("todo-input") as HTMLInputElement;
const todo = document.querySelector(".todos ul") as HTMLUListElement;
const itemID = document.querySelector(
  '.filters input[type="radio"]:checked'
) as HTMLInputElement;

addButton.addEventListener("click", () => {
  if (itemInput.value.length > 0) {
    addItems(itemInput.value);
    itemInput.value = "";
  }
});

// Add Items using the enter key
itemInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13 && itemInput.value.length > 0) {
    addItems(itemInput.value);
    itemInput.value = "";
  }
});

function addItems(text: string) {
  const item = document.createElement("li");
  item.innerHTML = `
    <label class="list">
    <input class="checkbox" type="checkbox"> 
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;
  if (itemID.id === "completed") {
    item.classList.add("hidden");
  }
  todo.append(item);
  localStorage.setItem("list", todo.innerHTML);
  updateCount(1);
}

// check if there is any value in localStorage, if there is append it to todo else return viold
const storedList = localStorage.getItem("list");
if (storedList) {
  todo.innerHTML = storedList;
} else {
  console.log("No saved list found.");
}

function updateCount(num: number) {
  // Convert innerText to a number
  const currentCount = Number(itemCount.innerText);

  // Ensure the conversion was successful and the result is a number
  if (!isNaN(currentCount)) {
    itemCount.innerText = (currentCount + num).toString();
  } else {
    console.error("Current count is not a valid number.");
  }
}

//remove items From the Todo List*
function removeItems(item: HTMLElement) {
  item.remove();
  updateCount(-1);
}

todo.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("remove")) {
    const parentElement = target.parentElement as HTMLElement;
    removeItems(parentElement);
  }
});

//Filters
const filters = document.querySelectorAll<HTMLInputElement>(".filters input");

filters.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    filterTodo(target.id);
  });
});

function filterTodo(id: string) {
  const allItems = document.querySelectorAll<HTMLLIElement>("li");

  switch (id) {
    case "all":
      allItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach((item) => {
        const input = item.querySelector("input") as HTMLInputElement;
        if (input.checked) {
          // Apply or remove the 'hidden' class based on the checked status of the input
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });
      break;
    default:
      allItems.forEach((item) => {
        const input = item.querySelector("input") as HTMLInputElement;
        if (input.checked) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
      break;
  }
}

// Clear Completed Items From the Todo List
const clear = document.querySelector(".clear") as HTMLDivElement;
const mobClear = document.querySelector(".mob-clear") as HTMLDivElement;

// for desktop
clear.addEventListener("click", () => {
  const itemChecked = document.querySelectorAll<HTMLElement>(
    '.list input[type="checkbox"]:checked'
  );
  itemChecked.forEach((item) => {
    const closestLi = item.closest("li");
    // check if there is closestLi available. if it's null or not
    if (closestLi) {
      removeItems(closestLi);
    }
  });
});

// for mobile
mobClear.addEventListener("click", () => {
  const itemChecked = document.querySelectorAll(
    '.list input[type="checkbox"]:checked'
  );
  itemChecked.forEach((item) => {
    const closestLi = item.closest("li");
    // check if there is closestLi available. if it's null or not
    if (closestLi) {
      removeItems(closestLi);
    }
  });
});
