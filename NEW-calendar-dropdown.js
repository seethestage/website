//Calendar Dropdown Dates Creation

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
