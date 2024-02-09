document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const masterCheckbox = document.getElementById('followed-stages-checkbox');
    const followedStagesField = document.getElementById('followed-stages');
    const container = document.getElementById('followed-stages-group');
    const template = document.getElementById('stages-checkbox-template');

    const applyMasterCheckboxState = () => {
        const checkboxes = document.querySelectorAll('#followed-stages-group .checkbox .check');
        const masterChecked = masterCheckbox.checked;
        checkboxes.forEach((checkbox) => {
            const needClick = (masterChecked && !checkbox.checked) || (!masterChecked && checkbox.checked);
            if (needClick) {
                // Adjust based on your actual checkbox elements
                checkbox.checked = masterChecked; 
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    };

    const processFollowedStages = () => {
        if (followedStagesField.textContent.trim() === '') {
            followedStagesField.textContent = '[EMPTY]';
        }

        const followedStagesText = followedStagesField.textContent;
        const stageValues = followedStagesText.match(/\[(.*?)\]/g)?.map(val => val.slice(1, -1)) || [];

        // Clear existing checkboxes
        Array.from(container.children).forEach(child => {
            if (child.id !== 'stages-checkbox-template') {
                container.removeChild(child);
            }
        });

        // Populate with new checkboxes based on stageValues
        stageValues.forEach((stageValue, index) => {
            let clone = index === 0 ? template : template.cloneNode(true);
            if (index > 0) {
                clone.removeAttribute('id');
                container.appendChild(clone);
            }
            const textElement = clone.querySelector('.small-txt');
            if (textElement) {
                textElement.textContent = stageValue;
            }
        });

        setTimeout(applyMasterCheckboxState, 100);
    };

    const handleStageSelected = (clickedDiv) => {
        clickedDiv.style.display = 'none';
        const stageIdTxt = clickedDiv.parentNode.querySelector('.stage-id').textContent.trim();
        const stageId = `[${stageIdTxt}]`;
        followedStagesField.value = followedStagesField.value.replace(stageId, '');
        document.getElementById('update-stages-btn').click();
        setTimeout(processFollowedStages, 1000);
    };

    const handleStageUnselected = (clickedDiv) => {
        const stageSelected = clickedDiv.parentNode.querySelector('.stage-selected');
        if (stageSelected) stageSelected.style.display = 'block';
        const stageIdTxt = clickedDiv.parentNode.querySelector('.stage-id').textContent.trim();
        const stageId = `[${stageIdTxt}]`;
        followedStagesField.value += stageId;
        document.getElementById('update-stages-btn').click();
        setTimeout(processFollowedStages, 1000);
    };

    masterCheckbox.addEventListener('change', applyMasterCheckboxState);
    document.getElementById('load-more-button').addEventListener('click', () => setTimeout(processFollowedStages, 500));
    document.querySelectorAll('.dropdown-link').forEach(element => {
        element.addEventListener('click', () => setTimeout(processFollowedStages, 500));
    });

    document.body.addEventListener('click', event => {
        let target = event.target.closest('.stage-unselected');
        if (target) {
            handleStageUnselected(target);
        } else {
            target = event.target.closest('.stage-selected');
            if (target) {
                handleStageSelected(target);
            }
        }
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                setTimeout(processFollowedStages, 500);
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call to populate or update stages
    processFollowedStages();
});
