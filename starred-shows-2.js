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
                }
            });
        }, 100);
    };

    // Run once at the start
    processStarredShows();

    // Event listener for clicking the 'load-more-shows-btn'
        document.getElementById('load-more-button').addEventListener('click', () => {
            console.log("Clicked 'load-more-button'");
            setTimeout(processStarredShows, 500);
        });
    
    // Event listener for clicking on any div with class 'dropdown-link'
        document.querySelectorAll('.dropdown-link').forEach(function(element) {
            element.addEventListener('click', () => {
                console.log("Clicked 'dropdown-link'");
                setTimeout(processStarredShows, 500);
            });
        });

    // MutationObserver to watch for changes in elements with class 'tag'
        const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
                const hasTagClass = nodes.some(node => node.classList && node.classList.contains('tag'));
                const hasRowClass = nodes.some(node => node.classList && node.classList.contains('row'));

                if (hasTagClass || hasRowClass) {
                    console.log(`Mutation detected with '${hasTagClass ? 'tag' : 'row'}' class`);
                    setTimeout(processStarredShows, 500);
                }
            }
        });
    });

        observer.observe(document.body, { childList: true, subtree: true });
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
