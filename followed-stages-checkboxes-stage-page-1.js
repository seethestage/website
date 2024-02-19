// Followed Stages Checkboxes Creation
document.addEventListener('DOMContentLoaded', (event) => {
    const followedStagesText = document.getElementById('followed-stages').textContent;
    const stageValues = followedStagesText.match(/\[(.*?)\]/g).map(val => val.slice(1, -1));

    const container = document.getElementById('followed-stages-group');

    if (!container) {
        console.error('Container not found.');
        return;
    }

    // Assuming there is at least one stageValue and the checkbox-template exists
    if (stageValues.length > 0) {
        const template = document.getElementById('stages-checkbox-template');
        if (!template) {
            console.error('Template not found.');
            return;
        }
        // Update the first 'checkbox-template' with the first 'showValue'
        const firstTextElement = template.querySelector('.small-txt');
        if (firstTextElement) {
            firstTextElement.textContent = stageValues[0];
        } else {
            console.error('Text element not found within the template.');
            return;
        }

        // For subsequent stageValues, clone the template, update, and append
        stageValues.slice(1).forEach(stageValue => {
            const clone = template.cloneNode(true); // true for deep clone

            // Remove the ID from the clone to avoid duplicate IDs
            clone.removeAttribute('id');

            // Find the child div with class 'small-txt' and update its text content
            const textElement = clone.querySelector('.small-txt');
            if (textElement) {
                textElement.textContent = stageValue;
            } else {
                console.error('Text element not found within the clone.');
                return;
            }

            // Append the cloned and updated element to the container
            container.appendChild(clone);
        });
    }
});

// Followed Stages Dashboard Checkboxes Toggle
document.addEventListener('DOMContentLoaded', () => {
    const masterCheckbox = document.getElementById('followed-stages-checkbox');

    masterCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('#followed-stages-group .checkbox .check');

        checkboxes.forEach((checkbox) => {
            // Determine if a click is needed based on the desired and current states
            const needClick = (this.checked && !checkbox.checked) || (!this.checked && checkbox.checked);

            if (needClick) {
                // Force update the checkbox's state before the click to ensure consistency
                checkbox.checked = this.checked;
                // Trigger any event listeners attached to the 'change' event of checkboxes
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                // Simulate a click only if direct manipulation doesn't trigger the expected UI update and event handling
                checkbox.click();
            }
        });
    });
});
