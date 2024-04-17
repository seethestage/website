// Turns the total number of shows (or stages) from the static page load filler number to the dynamic number once the number has loaded. 

document.addEventListener('DOMContentLoaded', function() {
    // Wait for 1 second after the page has loaded
    setTimeout(() => {
        // Get the number from the inner text of the div with ID "sum-static"
        const staticSumElement = document.getElementById('sum-static');
        const staticSum = parseInt(staticSumElement.innerText, 10);

        // Check every half second to see if the value in "sum-dynamic" is equal or greater
        const intervalId = setInterval(() => {
            const dynamicSumElement = document.getElementById('sum-dynamic');
            const dynamicSum = parseInt(dynamicSumElement.innerText, 10);

            if (dynamicSum >= staticSum) {
                // If the dynamic sum is greater or equal, update display styles
                dynamicSumElement.style.display = 'flex';
                staticSumElement.style.display = 'none';

                // Stop the interval
                clearInterval(intervalId);
            }
        }, 500);
    }, 1000);
});
