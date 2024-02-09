// Function to process followed stages
    const processFollowedStages = () => {
        console.log("Running processFollowedStages");

        // Check and update 'followed-stages' if empty
        const followedStagesField = document.getElementById('followed-stages');
        if (followedStagesField.textContent.trim() === '') {
            followedStagesField.textContent = '[EMPTY]';
        }

        const followedStagesText = followedStagesField.textContent;
        const stageValues = followedStagesText.match(/\[(.*?)\]/g)?.map(val => val.slice(1, -1)) || [];

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

    // Event listener for clicking the 'load-more-shows-btn'
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
            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
                const hasTagClass = nodes.some(node => node.classList && node.classList.contains('tag'));
                const hasRowClass = nodes.some(node => node.classList && node.classList.contains('row'));

                if (hasTagClass || hasRowClass) {
                    console.log(`Mutation detected with '${hasTagClass ? 'tag' : 'row'}' class`);
                    setTimeout(processFollowedStages, 500);
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});


    document.addEventListener('DOMContentLoaded', function() {
        document.body.addEventListener('click', function(event) {
            if (event.target.classList.contains('stage-unselected')) {
                console.log("Clicked 'stage-unselected'");
                handleStageUnselected(event.target);
            } else if (event.target.classList.contains('stage-selected')) {
                console.log("Clicked 'stage-selected'");
                handleStageSelected(event.target);
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
        
    
    }
