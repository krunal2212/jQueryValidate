# jQuery FORM Validation 

Simple validation library for form validation

1. Form Submission validation

 ```sh
 $(document).ready(function () {
        errMsgPlace = 'after';  // Display error message after or before field.
        $(document).on('submit', '.validateform', function (e) { // pass the form ID or Class name
            formValidation('.validateform', e); // pass the form ID or Class name
        });
    });
```
