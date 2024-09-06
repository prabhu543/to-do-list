let input = document.querySelector("input");
let div = document.querySelector(".coded");
let clearDiv = document.querySelector(".clear");

document.addEventListener('DOMContentLoaded', loadItems);

function add() {
    let x = input.value;
    if (x === '') {
        alert('Enter an item first');
    } else {
        let h3 = head(x);
        let iDiv = icon(h3);
        clearDiv.style.display = 'flex';
        saveItem(x);
    }
}

function head(x) {
    let h3 = document.createElement('h3');
    h3.classList.add('active');
    h3.textContent = x;
    div.appendChild(h3);
    input.value = '';
    return h3;
}

function icon(h3) {
    let iDiv = document.createElement('div');
    iDiv.classList.add("i");
    h3.appendChild(iDiv);

    // Add event listener to delete h3 on click
    iDiv.addEventListener('click', function() {
        let itemText = h3.textContent.trim();
        h3.remove();
        removeItem(itemText);
        checkIfAnyItems();
    });
    return iDiv;
}

function clearAll() {
    div.innerHTML = '';
    clearDiv.style.display = 'none';
    localStorage.clear();  // Clear all items from localStorage
}

// Load items from localStorage on page load
function loadItems() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => {
        let h3 = head(item);
        let iDiv = icon(h3);
    });
    if (items.length > 0) {
        clearDiv.style.display = 'flex';
    }
}

function saveItem(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

function removeItem(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => i !== item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Hide the "clear all" button if no items are present
function checkIfAnyItems() {
    if (div.children.length === 0) {
        clearDiv.style.display = 'none';
    }
}
