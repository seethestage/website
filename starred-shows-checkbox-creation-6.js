// Bookmarked Shows Checkboxes Creation
document.addEventListener('DOMContentLoaded', (event) => {
    const bookmarkedShowsText = document.getElementById('starred-shows').textContent;
    const showValues = bookmarkedShowsText.match(/\[(.*?)\]/g).map(val => val.slice(1, -1));

    const container = document.getElementById('bookmarked-shows-group');

    if (!container) {
        console.error('Container not found.');
        return;
    }

    // Assuming there is at least one showValue and the checkbox-template exists
    if (showValues.length > 0) {
        const template = document.getElementById('bookmarks-checkbox-template');
        if (!template) {
            console.error('Template not found.');
            return;
        }
        // Update the first 'checkbox-template' with the first 'showValue'
        const firstTextElement = template.querySelector('.small-txt');
        if (firstTextElement) {
            firstTextElement.textContent = showValues[0];
        } else {
            console.error('Text element not found within the template.');
            return;
        }

        // For subsequent showValues, clone the template, update, and append
        showValues.slice(1).forEach(showValue => {
            const clone = template.cloneNode(true); // true for deep clone

            // Remove the ID from the clone to avoid duplicate IDs
            clone.removeAttribute('id');

            // Find the child div with class 'small-txt' and update its text content
            const textElement = clone.querySelector('.small-txt');
            if (textElement) {
                textElement.textContent = showValue;
            } else {
                console.error('Text element not found within the clone.');
                return;
            }

            // Append the cloned and updated element to the container
            container.appendChild(clone);
        });
    }
});



// Function to hide tag divs based on text content
function hideTagDivsWithText() {
    // Select all divs with class 'tag'
    const tagDivs = document.querySelectorAll('.tag');

    // Iterate over each tag div
    tagDivs.forEach((div) => {
        // Look for a child div with class 'small-txt'
        const smallTxtDiv = div.querySelector('.small-txt');
        if (smallTxtDiv) {
            // Check if it contains the specified text
            const textContent = smallTxtDiv.textContent;
            if (textContent.includes('show-starred-id:')) {
                // Hide the 'tag' div
                div.style.display = 'none';
            }
        }
    });
}

// Run the function once upon page load
document.addEventListener('DOMContentLoaded', hideTagDivsWithText);

