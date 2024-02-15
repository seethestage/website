
// SIGN IN BUTTON COLOR CHANGE BASED ON FIELDS
function checkInputFields() {
    var emailInput = document.getElementById('Email-login');
    var passwordInput = document.getElementById('Password-login');
    var signInBtn = document.getElementById('sign-in-btn');

    // Check if both fields have values
    if (emailInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
        // If both fields are filled, ensure "faded" class is removed
        signInBtn.classList.remove('faded');
    } else {
        // If either field is empty, add "faded" class
        if (!signInBtn.classList.contains('faded')) {
            signInBtn.classList.add('faded');
        }
    }
}

// Add event listeners to both input fields to trigger the function on input
document.getElementById('Email-login').addEventListener('input', checkInputFields);
document.getElementById('Password-login').addEventListener('input', checkInputFields);

// Initial check in case the input fields are pre-filled (e.g., browser autofill)
checkInputFields();

