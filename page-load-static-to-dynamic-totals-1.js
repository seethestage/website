// Turns the total number of shows (or stages) from the static page load filler number to the dynamic number once the number has loaded. 

document.addEventListener('DOMContentLoaded', function() {
    // Wait for 1 second after the page has loaded
    setTimeout(() => {
        // Get the number from the inner text of the div with ID "sum-static"
        const staticSumElement = document.getElementById('sum-static');
        const staticSum = parseInt(staticSumElement.innerText, 10);

        // Check every half second to see if the value in "sum-total" is equal or greater
        const intervalId = setInterval(() => {
            const totalSumElement = document.getElementById('sum-total');
            const totalSum = parseInt(totalSumElement.innerText, 10);

            if (totalSum >= staticSum) {
                // If the total sum is greater or equal, update display styles
                const dynamicSumElement = document.getElementById('sum-dynamic');
                dynamicSumElement.style.display = 'flex';
                staticSumElement.style.display = 'none';

                // Stop the interval
                clearInterval(intervalId);
            }
        }, 500);
    }, 1000);
});

