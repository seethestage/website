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
