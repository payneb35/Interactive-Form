# interactive-form-v3
 
This project is an interactive form with a Basic Info, T-Shirt Info, Activity Registration, and Payment Info section.

The form focuses on the Name field upon loading to make the page more accessible.

If a user selects "Other" in the job section, a new text field appears to type their role in.

In the T-Shirt section, users must select a design before they can see the color options for only that design.  If they change their shirt design, it will unselect their color as well.

The activity registration adds up the total cost for all of their selected activities.  This section also limits users from selecting activities with conflicting times.

The payment info section display only relevant information to their selected payment type, and it defaults to select Credit Card.

The form uses validation, so that it cannot be submitted unless all required fields have valid input.  If the required fields are valid, they are styled to look valid.  If the required fields are invalid, they are styled so that the user can easily tell they are invalid.  They also will display a hint to help correct the mistake.

The required fields are validated on input as well as upon submitting the form.

The form uses real-time error messages to help the user understand why their input is not valid.  The error messages will disappear if their input is valid.  The form uses these real-time error messages for all required fields.

The form also uses conditional error messages that change based on what is wrong with the user input.  The form only uses conditional error messages on the "Name" field.  If they name contains numbers, it says that it cannot contain numbers.  If the field is blank, it says that it must not be blank.  If the field contains other non-letter characters, it says that it must only contain letters.