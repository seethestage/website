// STARRED SCRIPT
// Initial load of starred shows
document.addEventListener('DOMContentLoaded', (event) => {
    // Function to process starred shows
    const processStarredShows = () => {
        const starredShowsText = document.getElementById('starred-shows').textContent;
        const showValues = starredShowsText.match(/\[(.*?)\]/g).map(val => val.slice(1, -1));

        setTimeout(() => {
            const showIdTextDivs = document.querySelectorAll('.show-starred-id');

            showIdTextDivs.forEach(div => {
                if (showValues.includes(div.textContent.trim())) {
                    let sibling = div.nextElementSibling;
                    while (sibling) {
                        if (sibling.classList.contains('starred-selected')) {
                            sibling.style.display = 'block';
                            console.log("Updated display for:", sibling);
                            break;
                        }
                        sibling = sibling.nextElementSibling;
                    }
                } else {
                    // Find the parent div with class "grid-item" and remove it
                    let parent = div.parentElement;
                    while (parent && !parent.classList.contains('grid-item')) {
                        parent = parent.parentElement;
                    }
                    if (parent) {
                        parent.remove(); // Remove the grid-item div
                        console.log("Removed grid-item for:", div);
                    }
                }
            });
        }, 100);
    };

    // Run once at the start
    processStarredShows();

    
    



});


document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('starred-unselected')) {
            // Handling for starred-unselected
            handleStarredUnselected(event.target);
        } else if (event.target.classList.contains('starred-selected')) {
            // Handling for starred-selected
            handleStarredSelected(event.target);
        }
    });
});

function handleStarredUnselected(clickedDiv) {
    // Find and display the sibling with class 'starred-selected'
    const starredSelected = clickedDiv.parentNode.querySelector('.starred-selected');
    if (starredSelected) {
        starredSelected.style.display = 'block';
    }

    // Find the sibling with class 'show-starred-id' and get its text
    const showIdTxt = clickedDiv.parentNode.querySelector('.show-starred-id');
    if (showIdTxt) {
        const showId = `[${showIdTxt.textContent}]`;
        const starredShowsField = document.getElementById('starred-shows');
        starredShowsField.value += showId;
    }

    // Simulate click on the 'update-starred-btn'
    const updateBtn = document.getElementById('update-starred-btn');
    updateBtn.click();
}

function handleStarredSelected(clickedDiv) {
    // Hide the clicked div
    clickedDiv.style.display = 'none';

    // Find the sibling with class 'show-starred-id' and get its text
    const showIdTxt = clickedDiv.parentNode.querySelector('.show-starred-id');
    if (showIdTxt) {
        const showId = `[${showIdTxt.textContent}]`;
        const starredShowsField = document.getElementById('starred-shows');

        // Check if the showId is in the starred shows and remove it
        if (starredShowsField.value.includes(showId)) {
            starredShowsField.value = starredShowsField.value.replace(showId, '');
        }
    }

    // Simulate click on the 'update-starred-btn'
    const updateBtn = document.getElementById('update-starred-btn');
    updateBtn.click();
}
