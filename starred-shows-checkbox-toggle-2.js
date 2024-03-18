document.addEventListener('DOMContentLoaded', (event) => {
    const bookmarkedShowsText = document.getElementById('starred-shows').textContent;
    const showValues = bookmarkedShowsText.match(/\[(.*?)\]/g).map(val => val.slice(1, -1));

    const container = document.getElementById('bookmarked-shows-group');

    if (!container) {
        console.error('Container not found.');
        return;
    }

    if (showValues.length > 0) {
        const template = document.getElementById('bookmarks-checkbox-template');
        if (!template) {
            console.error('Template not found.');
            return;
        }

        // Update and check the first template's checkbox
        const firstCheckbox = template.querySelector('.check'); // Targeting checkbox using class "check"
        if (firstCheckbox) {
            firstCheckbox.checked = true;
        } else {
            console.error('Checkbox not found within the template.');
            return;
        }

        const firstTextElement = template.querySelector('.small-txt');
        if (firstTextElement) {
            firstTextElement.textContent = showValues[0];
        } else {
            console.error('Text element not found within the template.');
            return;
        }

        // For subsequent showValues, clone the template, update text, and check the checkbox
        showValues.slice(1).forEach(showValue => {
            const clone = template.cloneNode(true); // true for deep clone
            clone.removeAttribute('id'); // Remove the ID from the clone to avoid duplicate IDs

            // Update text for the cloned template
            const textElement = clone.querySelector('.small-txt');
            if (textElement) {
                textElement.textContent = showValue;
            } else {
                console.error('Text element not found within the clone.');
                return;
            }

            // Check the checkbox in the cloned template
            const checkbox = clone.querySelector('.check'); // Targeting checkbox using class "check"
            if (checkbox) {
                checkbox.checked = true;
            } else {
                console.error('Checkbox not found within the clone.');
                return;
            }

            // Append the cloned and updated element to the container
            container.appendChild(clone);
        });
    }
});

