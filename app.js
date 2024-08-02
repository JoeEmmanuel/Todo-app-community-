/// Count Items left
var itemCount = document.querySelector(".count span");
var mobCount = document.querySelector(".mob-count span");
var listCount = document.querySelectorAll(".list").length;
itemCount.innerText = listCount.toString();
mobCount.innerText = listCount.toString();
// Change Theme Color
var themeIcons = document.querySelector(".theme");
themeIcons.addEventListener("click", function () {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        themeIcons.src = "images/icon-moon.svg";
    }
    else {
        themeIcons.src = "images/icon-sun.svg";
    }
});
// Add Items TO Todo List
var addButton = document.querySelector(".todo-input button");
var itemInput = document.getElementById("todo-input");
var todo = document.querySelector(".todos ul");
var itemID = document.querySelector('.filters input[type="radio"]:checked');
addButton.addEventListener("click", function () {
    if (itemInput.value.length > 0) {
        addItems(itemInput.value);
        itemInput.value = "";
    }
});
// Add Items using the enter key
itemInput.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 && itemInput.value.length > 0) {
        addItems(itemInput.value);
        itemInput.value = "";
    }
});
function addItems(text) {
    var item = document.createElement("li");
    item.innerHTML = "\n    <label class=\"list\">\n    <input class=\"checkbox\" type=\"checkbox\"> \n    <span class=\"text\">".concat(text, "</span>\n    </label>\n    <span class=\"remove\"></span>\n    ");
    if (itemID.id === "completed") {
        item.classList.add("hidden");
    }
    todo.append(item);
    localStorage.setItem("list", todo.innerHTML);
    updateCount(1);
}
// check if there is any value in localStorage, if there is append it to todo else return viold
var storedList = localStorage.getItem("list");
if (storedList) {
    todo.innerHTML = storedList;
}
else {
    console.log("No saved list found.");
}
function updateCount(num) {
    // Convert innerText to a number
    var currentCount = Number(itemCount.innerText);
    // Ensure the conversion was successful and the result is a number
    if (!isNaN(currentCount)) {
        itemCount.innerText = (currentCount + num).toString();
    }
    else {
        console.error("Current count is not a valid number.");
    }
}
//remove items From the Todo List*
function removeItems(item) {
    item.remove();
    updateCount(-1);
}
todo.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("remove")) {
        var parentElement = target.parentElement;
        removeItems(parentElement);
    }
});
//Filters
var filters = document.querySelectorAll(".filters input");
filters.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
        var target = event.target;
        filterTodo(target.id);
    });
});
function filterTodo(id) {
    var allItems = document.querySelectorAll("li");
    switch (id) {
        case "all":
            allItems.forEach(function (item) {
                item.classList.remove("hidden");
            });
            break;
        case "active":
            allItems.forEach(function (item) {
                var input = item.querySelector("input");
                if (input.checked) {
                    // Apply or remove the 'hidden' class based on the checked status of the input
                    item.classList.add("hidden");
                }
                else {
                    item.classList.remove("hidden");
                }
            });
            break;
        default:
            allItems.forEach(function (item) {
                var input = item.querySelector("input");
                if (input.checked) {
                    item.classList.remove("hidden");
                }
                else {
                    item.classList.add("hidden");
                }
            });
            break;
    }
}
// Clear Completed Items From the Todo List
var clear = document.querySelector(".clear");
var mobClear = document.querySelector(".mob-clear");
// for desktop
clear.addEventListener("click", function () {
    var itemChecked = document.querySelectorAll('.list input[type="checkbox"]:checked');
    itemChecked.forEach(function (item) {
        var closestLi = item.closest("li");
        // check if there is closestLi available. if it's null or not
        if (closestLi) {
            removeItems(closestLi);
        }
    });
});
// for mobile
mobClear.addEventListener("click", function () {
    var itemChecked = document.querySelectorAll('.list input[type="checkbox"]:checked');
    itemChecked.forEach(function (item) {
        var closestLi = item.closest("li");
        // check if there is closestLi available. if it's null or not
        if (closestLi) {
            removeItems(closestLi);
        }
    });
});
