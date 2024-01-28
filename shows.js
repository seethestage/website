
// Location Search Results Filtering
// Get the input field and locations lists
const searchInput = document.getElementById('location-search');
const locationsLists = [
  document.getElementById('locations-list-1'),
  document.getElementById('locations-list-2'),
  document.getElementById('locations-list-3'),
  document.getElementById('locations-list-4')
];

// Add event listener for input changes
searchInput.addEventListener('input', function() {
  const searchText = searchInput.value.toLowerCase();

  // Iterate through each locations list
  locationsLists.forEach(locationsList => {
    const locationItems = locationsList.querySelectorAll('.location-checkbox-label');

    locationItems.forEach(item => {
      const itemText = item.textContent.toLowerCase();
      const checkboxGroup = item.parentElement.parentElement; // parent's parent is the checkbox group div

      if (searchText.length === 0) {
        // If there's no search text, display all items
        checkboxGroup.style.display = 'flex';
      } else {
        if (itemText.includes(searchText)) {
          checkboxGroup.style.display = 'flex'; // Display the item
        } else {
          checkboxGroup.style.display = 'none'; // Hide the item if it doesn't match the search text
        }
      }
    });
  });
});




function updateMonthTitles() {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    let currentMonth = new Date().getMonth();

    for (let i = 0; i <= 12; i++) {
        let monthIndex = (currentMonth + i) % 12;
        let monthName = monthNames[monthIndex];
        document.getElementById('month-' + i + '-title').textContent = monthName;
    }
}

updateMonthTitles();




function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function deleteDivs(referenceDiv, dayOfWeek) {
    const divsToDeleteMap = { 0: 6, 1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0 };
    const divsToDelete = divsToDeleteMap[dayOfWeek];
    const nonDayDivs = referenceDiv.querySelectorAll('.non-day');
    for (let i = 0; i < divsToDelete && i < nonDayDivs.length; i++) {
        nonDayDivs[i].remove();
    }
}

function setDateValues(referenceDiv, date) {
    const dayBtnGroups = referenceDiv.querySelectorAll('.day-btn-group');
    dayBtnGroups.forEach((group, index) => {
        const newDate = new Date(date.getTime());
        newDate.setDate(date.getDate() + index);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        if (newDate.getMonth() !== date.getMonth()) {
            group.remove();
        } else {
            const dayBtn = group.querySelector('.day-btn');
            const dayOverlay = group.querySelector('.day-overlay');
            dayBtn.textContent = formatDate(newDate);
            dayOverlay.textContent = newDate.getDate();
        }
    });
}

function processMonthDiv(monthIndex) {
    let currentDate = new Date();
    if (monthIndex !== 0) {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthIndex, 1);
    }

    const referenceDivId = `month-${monthIndex}`;
    const referenceDiv = document.getElementById(referenceDivId);

    deleteDivs(referenceDiv, currentDate.getDay());
    setDateValues(referenceDiv, currentDate);
}

for (let i = 0; i <= 12; i++) {
    processMonthDiv(i);
}




function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${monthName} ${day}, ${year}`;
}

function setCurrentDate() {
    const today = new Date();
    const formattedDate = formatDate(today);

    const dateElement = document.getElementById('today-value');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    } else {
        console.error("Element with ID 'today-value' not found.");
    }
}


setCurrentDate();




document.addEventListener('DOMContentLoaded', function () {
    function updateDateText(targetElement) {
        if (targetElement) {
            let dayBtn = targetElement.querySelector('.day-btn');
            if (dayBtn) {
                let fullDateText = dayBtn.textContent.trim();
                let dateParts = fullDateText.split(', ');
                dateParts[1] = dateParts[1].replace(/(\d+)/, '$1,');
                let modifiedDatePart = dateParts.slice(1).join(' ');
                let dateTagTxtDiv = document.getElementById('date-tag-txt');
                if (dateTagTxtDiv) {
                    dateTagTxtDiv.textContent = modifiedDatePart;
                }

                let dateFilterFieldDiv = document.getElementById('date-filter-field');
                let dateIconDiv = document.getElementById('date-icon');
                if (dateFilterFieldDiv && dateIconDiv) {
                    dateFilterFieldDiv.classList.add('is-active');
                    dateIconDiv.classList.add('is-active');
                }
            }
        }
    }

    document.addEventListener('click', function (e) {
        
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.classList && targetElement.classList.contains('day-btn-group')) {
                updateDateText(targetElement);
                break;
            }
            targetElement = targetElement.parentElement;
        }
    });

    
    let dateTodayBtn = document.getElementById('date-today-btn');
    if (dateTodayBtn) {
        dateTodayBtn.addEventListener('click', function () {
            updateDateText(dateTodayBtn);
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    
    function activateDay0_01() {
        document.querySelectorAll('.day-btn-group.is-active').forEach(div => {
            div.classList.remove('is-active');
        });
        document.getElementById('day-0-01').classList.add('is-active');
    }

    
    function activateToggleElements() {
        document.getElementById('today-toggle').classList.add('is-active');
        document.getElementById('day-toggle').classList.add('is-active');
    }

    
    function clearElements() {
        ['today-toggle', 'day-toggle', 'date-filter-field', 'date-icon'].forEach(id => {
            document.getElementById(id).classList.remove('is-active');
        });
        document.querySelectorAll('.day-btn-group').forEach(div => {
            div.classList.remove('is-active');
        });
        document.getElementById('date-tag-txt').textContent = '';
    }

    
    ['day-0-01', 'date-today-btn'].forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            activateToggleElements();
            if (id === 'date-today-btn') {
                activateDay0_01();
            }
        });
    });

    document.getElementById('date-clear-trigger').addEventListener('click', function() {
        clearElements(); 
    });

    document.getElementById('today-toggle').addEventListener('click', function() {
        if (this.classList.contains('is-active')) {
            document.getElementById('date-clear-trigger').click();
            clearElements(); 
        } else {
            activateToggleElements();
            activateDay0_01();
            document.getElementById('day-0-01').click(); // Simulate click on 'day-0-01'
        }
    });

    document.querySelectorAll('[name="date"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (![...document.querySelectorAll('[name="date"]')].some(r => r.checked)) {
                document.getElementById('date-clear-trigger').click();
            }
        });
    });

    document.querySelectorAll('.day-btn-group:not(#day-0-01)').forEach(dayBtn => {
        dayBtn.addEventListener('click', function() {
            if (document.getElementById('today-toggle').classList.contains('is-active')) {
                document.getElementById('today-toggle').classList.remove('is-active');
            }
            if (document.getElementById('day-toggle').classList.contains('is-active')) {
                document.getElementById('day-toggle').classList.remove('is-active');
            }
        });
    });
});


document.addEventListener('click', function(event) {
    var closestDayBtnGroup = event.target.closest('.day-btn-group');
    if (closestDayBtnGroup) {
        var allButtons = document.querySelectorAll('.day-btn-group');
        allButtons.forEach(function(button) {
            button.classList.remove('is-active');
        });

        closestDayBtnGroup.classList.add('is-active');
    }
});


// JavaScript code to scroll 'location-dropdown' to the top
// when a user types in the 'location-search' input

// First, get the elements by their IDs
var locationSearch = document.getElementById('location-search');
var locationDropdown = document.getElementById('location-dropdown');

// Add an event listener for the 'keyup' event on the location search input
locationSearch.addEventListener('keyup', function() {
    // Scroll the location dropdown to the top
    locationDropdown.scrollTop = 0;
});
