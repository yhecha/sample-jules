document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const inquiryInput = document.getElementById('inquiry');

    // Error message elements (assuming they will be added to HTML)
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const genderError = document.getElementById('genderError');
    const inquiryError = document.getElementById('inquiryError');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        let isValid = true;

        // Clear previous error messages
        clearErrorMessages();

        // Validate Name
        if (nameInput.value.trim() === '') {
            displayError(nameError, 'Name is required.');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            displayError(emailError, 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            displayError(emailError, 'Invalid email format.');
            isValid = false;
        }

        // Validate Gender
        let genderSelected = false;
        genderInputs.forEach(input => {
            if (input.checked) {
                genderSelected = true;
            }
        });
        if (!genderSelected) {
            displayError(genderError, 'Please select your gender.');
            isValid = false;
        }

        // Validate Inquiry
        if (inquiryInput.value.trim() === '') {
            displayError(inquiryError, 'Inquiry content is required.');
            isValid = false;
        }

        if (isValid) {
            // Client-side validation passed.
            // At this point, the data would typically be sent to a server
            // using an AJAX request (e.g., fetch API) or a standard form submission.
            console.log('Form submitted successfully! (Client-side validation passed)');
            // alert('Form data is valid and would now be sent to the server.');

            // IMPORTANT: Server-Side Validation
            // ---------------------------------
            // While client-side validation provides a good user experience by giving immediate feedback,
            // it is crucial to ALWAYS implement server-side validation.
            // Client-side validation can be bypassed by users (e.g., by disabling JavaScript or modifying requests).
            //
            // Server-side validation would involve:
            // 1. Re-validating all received fields (name, email, gender, inquiry) against stricter rules.
            //    - Check lengths, formats, allowed values, etc.
            // 2. Sanitizing input to prevent security vulnerabilities like XSS (Cross-Site Scripting)
            //    or SQL injection (if data is stored in a database).
            // 3. Ensuring data integrity and consistency.
            // 4. Only after successful server-side validation should the data be processed
            //    (e.g., saved to a database, an email sent, etc.).
            //
            // Example:
            // fetch('/submit-form-endpoint', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         name: nameInput.value.trim(),
            //         email: emailInput.value.trim(),
            //         gender: document.querySelector('input[name="gender"]:checked').value,
            //         inquiry: inquiryInput.value.trim()
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         console.log('Server accepted the data.');
            //         contactForm.reset();
            //     } else {
            //         console.error('Server validation failed:', data.errors);
            //         // Optionally display server errors to the user
            //     }
            // })
            // .catch(error => {
            //     console.error('Error submitting form:', error);
            // });

            contactForm.reset(); // Reset form after successful client-side validation for this example.
        }
    });

    function displayError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block'; // Or 'inline', depending on styling
        }
    }

    function clearErrorMessages() {
        const errorElements = [nameError, emailError, genderError, inquiryError];
        errorElements.forEach(element => {
            if (element) {
                element.textContent = '';
                element.style.display = 'none';
            }
        });
    }

    // Add event listeners to clear errors on input
    nameInput.addEventListener('input', () => clearError(nameError));
    emailInput.addEventListener('input', () => clearError(emailError));
    genderInputs.forEach(input => input.addEventListener('change', () => clearError(genderError)));
    inquiryInput.addEventListener('input', () => clearError(inquiryError));

    function clearError(element) {
        if (element && element.textContent !== '') {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
});
