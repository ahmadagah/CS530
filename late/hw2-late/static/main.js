// Function for form validation
/**
 * Validate the song form before submission.
 * 
 * This function checks if the title and rating inputs are valid:
 * - The title should not be empty.
 * - The rating should be between 1 and 10.
 * 
 * If validation fails, an alert is shown and form submission is prevented.
 * 
 * @returns {boolean} - Returns true if the form is valid, otherwise false.
 */
function validateForm() {
    const title = document.getElementById('title');
    const rating = document.getElementById('rating');

    if (title && title.value.trim() === "") {
        alert('Please enter a title for the song.');
        return false;  // Prevent form submission
    }

    if (rating && (rating.value < 1 || rating.value > 10)) {
        alert('Please enter a rating between 1 and 10.');
        return false;  // Prevent form submission
    }

    // Alert success
    alert("Form submitted successfully!");
    return true;
}

// Function to toggle song lyrics
/**
 * Toggle the visibility of the song lyrics for a given song.
 * 
 * This function shows or hides the lyrics for a specific song based on the current display state.
 * 
 * @param {string} songTitle - The title of the song, used to find the lyrics element by ID.
 */
function toggleLyrics(songTitle) {
    const lyricsElement = document.getElementById(`lyrics-${songTitle}`);
    if (lyricsElement.style.display === "none") {
        lyricsElement.style.display = "block";
    } else {
        lyricsElement.style.display = "none";
    }
}

// Attach form validation to songForm if it exists
/**
 * Attach form validation logic to the song form when the DOM is fully loaded.
 * 
 * This function listens for the form submission event and triggers validation. If validation fails, 
 * form submission is prevented.
 */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('songForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();  // Stop form submission if validation fails
            }
        });
    }
});
