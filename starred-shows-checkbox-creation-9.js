document.addEventListener('DOMContentLoaded', (event) => {
    // Bookmarked Shows Checkboxes Creation
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
        const firstTextElement = template.querySelector('.small-txt');
        if (firstTextElement) {
            firstTextElement.textContent = showValues[0];
        } else {
            console.error('Text element not found within the template.');
            return;
        }

        showValues.slice(1).forEach(showValue => {
            const clone = template.cloneNode(true);
            clone.removeAttribute('id');
            const textElement = clone.querySelector('.small-txt');
            if (textElement) {
                textElement.textContent = showValue;
            } else {
                console.error('Text element not found within the clone.');
                return;
            }
            container.appendChild(clone);
        });
    }

});
