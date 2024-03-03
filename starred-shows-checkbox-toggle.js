// Starred Shows Checkboxes Creation
document.addEventListener('DOMContentLoaded', (event) => {
    const starredShowsText = document.getElementById('starred-shows').textContent;
    const showValues = starredShowsText.match(/\[(.*?)\]/g).map(val => val.slice(1, -1));

    const container = document.getElementById('starred-shows-group');

    if (!container) {
        console.error('Container not found.');
        return;
    }

    // Assuming there is at least one showValue and the checkbox-template exists
    if (showValues.length > 0) {
        const template = document.getElementById(‘starred-show-checkbox-template');
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
