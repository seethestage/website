// BOOKMARKED SCRIPT
// Initial load of bookmarked shows
document.addEventListener('DOMContentLoaded', (event) => {
    // Function to process bookmarked shows
    const processBookmarkedShows = () => {
        const bookmarkedShowsText = document.getElementById('bookmarked-shows').textContent;
        const showValues = bookmarkedShowsText.match(/\[(.*?)\]/g).map(val => val.slice(1, -1));

        setTimeout(() => {
            const showIdTextDivs = document.querySelectorAll('.show-bookmark-id');

            showIdTextDivs.forEach(div => {
                if (showValues.includes(div.textContent.trim())) {
                    let sibling = div.nextElementSibling;
                    while (sibling) {
                        if (sibling.classList.contains('bookmark-selected')) {
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
    processBookmarkedShows();

    // Event listener for clicking the 'load-more-shows-btn'
    document.getElementById('load-more-shows-btn').addEventListener('click', processBookmarkedShows);
    // Event listener for clicking on any div with class 'dropdown-link'
    document.querySelectorAll('.dropdown-link').forEach(function(element) {
        element.addEventListener('click', processBookmarkedShows);
    });

    // MutationObserver to watch for changes in elements with class 'tag'
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                // Check if any of the added or removed nodes have class 'tag'
                const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
                const hasTagClass = nodes.some(node => node.classList && node.classList.contains('tag'));

                if (hasTagClass) {
                    processBookmarkedShows();
                }
            }
        });
    });

    // Observe the document body for addition or removal of 'tag' elements
    observer.observe(document.body, { childList: true, subtree: true });
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('bookmark-unselected')) {
            // Handling for bookmark-unselected
            handleBookmarkUnselected(event.target);
        } else if (event.target.classList.contains('bookmark-selected')) {
            // Handling for bookmark-selected
            handleBookmarkSelected(event.target);
        }
    });
});

function handleBookmarkUnselected(clickedDiv) {
    // Find and display the sibling with class 'bookmark-selected'
    const bookmarkSelected = clickedDiv.parentNode.querySelector('.bookmark-selected');
    if (bookmarkSelected) {
        bookmarkSelected.style.display = 'block';
    }

    // Find the sibling with class 'show-bookmark-id' and get its text
    const showIdTxt = clickedDiv.parentNode.querySelector('.show-bookmark-id');
    if (showIdTxt) {
        const showId = `[${showIdTxt.textContent}]`;
        const bookmarkedShowsField = document.getElementById('bookmarked-shows');
        bookmarkedShowsField.value += showId;
    }

    // Simulate click on the 'update-bookmarks-btn'
    const updateBtn = document.getElementById('update-bookmarks-btn');
    updateBtn.click();
}

function handleBookmarkSelected(clickedDiv) {
    // Hide the clicked div
    clickedDiv.style.display = 'none';

    // Find the sibling with class 'show-bookmark-id' and get its text
    const showIdTxt = clickedDiv.parentNode.querySelector('.show-bookmark-id');
    if (showIdTxt) {
        const showId = `[${showIdTxt.textContent}]`;
        const bookmarkedShowsField = document.getElementById('bookmarked-shows');

        // Check if the showId is in the bookmarked shows and remove it
        if (bookmarkedShowsField.value.includes(showId)) {
            bookmarkedShowsField.value = bookmarkedShowsField.value.replace(showId, '');
        }
    }

    // Simulate click on the 'update-bookmarks-btn'
    const updateBtn = document.getElementById('update-bookmarks-btn');
    updateBtn.click();
}
