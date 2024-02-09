// Function to process followed stages
    const processFollowedStages = () => {
    console.log("Running processFollowedStages");

    const followedStagesField = document.getElementById('followed-stages');
    if (followedStagesField.textContent.trim() === '') {
        followedStagesField.textContent = '[EMPTY]';
    }

    const followedStagesText = followedStagesField.textContent;
    const stageValues = followedStagesText.match(/\[(.*?)\]/g)?.map(val => val.slice(1, -1)) || [];

    const container = document.getElementById('followed-stages-group');
    if (!container) {
        console.error('Container not found.');
        return;
    }

    // Clear existing checkboxes except the template
    Array.from(container.querySelectorAll('.checkbox')).forEach(div => {
        if (div.id !== 'stage-checkbox-template') {
            div.remove();
        }
    });

    const template = document.getElementById('stage-checkbox-template');
    if (!template) {
        console.error('Template not found.');
        return;
    }

    // Ensure the template is not directly visible if it should only be used as a cloning basis
    // template.style.display = 'none'; // Uncomment if the template should be hidden

    // Process each stageValue, clone and update from the template
    stageValues.forEach((stageValue, index) => {
        // Clone the template for each stageValue, including the first one
        const clone = template.cloneNode(true);
        clone.removeAttribute('id'); // Remove the ID to avoid duplicates

        // Show the clone if it's the first item and meant to be visible
        // if (index === 0) clone.style.display = 'block'; // Adjust based on your visibility logic

        const textElement = clone.querySelector('.small-text');
        if (textElement) {
            textElement.textContent = stageValue;
        } else {
            console.error('Text element not found within the clone.');
            return;
        }

        // Append the cloned and updated element to the container
        // Skip appending the first clone if it's identical to the template and should not be displayed
        if (!(index === 0 && template === clone)) {
            container.appendChild(clone);
        }
    });
};

      
        setTimeout(() => {
            const stageIdTextDivs = document.querySelectorAll('.stage-id');

            stageIdTextDivs.forEach(div => {
                let sibling = div.nextElementSibling;
                while (sibling) {
                    if (sibling.classList.contains('stage-selected')) {
                        if (stageValues.includes(div.textContent.trim())) {
                            sibling.style.display = 'block';
                        } else {
                            sibling.style.display = 'none';
                        }
                        console.log("Updated display for:", sibling);
                        break;
                    }
                    sibling = sibling.nextElementSibling;
                }
            });
        }, 100);
    };

    // FOLLOWED STAGES SCRIPT
    // Initial load of followed stages
    document.addEventListener('DOMContentLoaded', (event) => {
        console.log("DOM fully loaded and parsed");

        console.log("processFollowedStages function defined");

        // Run once at the start
        processFollowedStages();

        // Event listener for clicking the 'load-more-btn'
        document.getElementById('load-more-button').addEventListener('click', () => {
            console.log("Clicked 'load-more-button'");
            setTimeout(processFollowedStages, 500);
        });

        // Event listener for clicking on any div with class 'dropdown-link'
        document.querySelectorAll('.dropdown-link').forEach(function(element) {
            element.addEventListener('click', () => {
                console.log("Clicked 'dropdown-link'");
                setTimeout(processFollowedStages, 500);
            });
        });

        // MutationObserver to watch for changes in elements with class 'tag'
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                    const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
                    const hasTagClass = nodes.some(node => node.classList && node.classList.contains('tag'));

                    if (hasTagClass) {
                        console.log("Mutation detected with 'tag' class");
                        setTimeout(processFollowedStages, 500);
                    }
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });

    document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        // Use event.target.closest(selector) to find the nearest ancestor that matches the selector
        // or the target itself if it matches the selector
        let target = event.target.closest('.stage-unselected');
        if (target) {
            console.log("Clicked inside 'stage-unselected'");
            handleStageUnselected(target);
        } else {
            target = event.target.closest('.stage-selected');
            if (target) {
                console.log("Clicked inside 'stage-selected'");
                handleStageSelected(target);
            }
        }
    });
});


    function handleStageUnselected(clickedDiv) {
        console.log("Handling 'stage-unselected'");
        // Find and display the sibling with class 'stage-selected'
        const stageSelected = clickedDiv.parentNode.querySelector('.stage-selected');
        if (stageSelected) {
            stageSelected.style.display = 'block';
        }

        // Find the sibling with class 'stage-id' and get its text
        const stageIdTxt = clickedDiv.parentNode.querySelector('.stage-id');
        if (stageIdTxt) {
            const stageId = `[${stageIdTxt.textContent}]`;
            const followedStagesField = document.getElementById('followed-stages');
            followedStagesField.value += stageId;
        }

        // Simulate click on the 'update-stages-btn'
        const updateBtn = document.getElementById('update-stages-btn');
        updateBtn.click();
        
        // Run processFollowedStages function with delay
        setTimeout(processFollowedStages, 1000);
    }

    function handleStageSelected(clickedDiv) {
       console.log("Handling 'stage-selected'");
        // Hide the clicked div
        clickedDiv.style.display = 'none';

        // Find the sibling with class 'stage-id' and get its text
        const stageIdTxt = clickedDiv.parentNode.querySelector('.stage-id');
        if (stageIdTxt) {
            const stageId = `[${stageIdTxt.textContent}]`;
            const followedStagesField = document.getElementById('followed-stages');

            // Check if the stageId is in the followed stages and remove it
            if (followedStagesField.value.includes(stageId)) {
                followedStagesField.value = followedStagesField.value.replace(stageId, '');
            }
        }

        // Simulate click on the 'update-stages-btn'
        const updateBtn = document.getElementById('update-stages-btn');
        updateBtn.click();
        
        // Run processFollowedStages function with delay
        setTimeout(processFollowedStages, 1000);
    }
