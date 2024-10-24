# Song Submission App

## Overview

The **Song Submission App** is a web application that allows users to submit and view information about their favorite songs. Users can add new songs by filling out a form with details such as the song's title, genre, performer, songwriter, release date, lyrics, and a rating. All submitted songs are stored in a SQLite database, and users can view the list of submitted songs through a simple interface.

This application is built using the **Flask** framework for Python and leverages templates for rendering dynamic web pages. It also includes form validation to ensure accurate user input.

## Features

- **Add a new song**: Users can submit details of a song, including the title, genre, performer, songwriter, release date, lyrics, rating, and a URL to listen to the song.
- **View all songs**: Users can view a list of all submitted songs with their details.
- **Form validation**: Client-side validation is used to ensure the form is filled out correctly before submission.
- **Responsive design**: The web application uses CSS for responsive design, making it user-friendly on both desktop and mobile devices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Routes](#routes)
- [Database](#database)
- [Technologies Used](#technologies-used)

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Python 3.x**
- **Flask**: The application requires Flask to run, which can be installed via pip.
- **SQLite3**: The app uses SQLite as the database engine.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/song-submission-app.git
   cd song-submission-app

2. **Create and activate a virtual environment (optional but recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate


3. **Install required dependencies: Install Flask and any other dependencies listed in the requirements.txt file:**
   ```bash
   pip install -r requirements.txt

4. **Run the application: Start the Flask development server:**
   ```bash
   python3 -m venv venv

5. **Access the application:** The application will be running locally on http://127.0.0.1:5000. Open this address in your web browser.



# Song Submission App

## Usage

- **Add a Song**: Go to the `/add` route and fill out the song form. Ensure that all fields are filled correctly (with a valid title and a rating between 1 and 10) before submitting.
- **View Songs**: Visit the `/view` route to see all the songs that have been submitted.

## Folder Structure

The project directory contains the following files and folders:

```plaintext
song-submission-app/
├── app.py               # Main application file
├── controllers/         # Folder for route controllers
│   ├── index.py         # Controller for the home page
│   ├── view_entries.py  # Controller for viewing songs
│   └── add_entry.py     # Controller for adding new songs
├── model/               # Folder containing the database model
│   └── model_sqlite3.py # SQLite3 implementation for the database
├── templates/           # Folder for HTML templates
│   ├── layout.html      # Base layout for all pages
│   ├── index.html       # Template for the home page
│   ├── add_entry.html   # Template for the song submission form
│   └── view_entries.html# Template for viewing song entries
├── static/              # Folder for static files like CSS and JS
│   ├── style.css        # Main CSS stylesheet
│   └── main.js          # Main JavaScript file for validation
├── songs.db             # SQLite database file
├── requirements.txt     # Python dependencies file
└── README.md            # Project README file
```


## Routes

The application defines the following routes:

1. **Home Page (`/`)**:
   - Displays a welcome message and provides links to add a new song or view existing songs.
   - **Method**: GET
   - **Controller**: `index_route` in `controllers/index.py`
   
2. **Add New Song (`/add`)**:
   - Displays a form to add a new song entry. The form submits to this route via POST.
   - **Methods**: GET, POST
   - **Controller**: `add_entry_route` in `controllers/add_entry.py`
   
3. **View All Songs (`/view`)**:
   - Displays a list of all submitted songs.
   - **Method**: GET
   - **Controller**: `view_entries_route` in `controllers/view_entries.py`

## Database

The app uses **SQLite** as its database, and the database file (`songs.db`) is created automatically when the app is run for the first time. The database consists of a single table `songs` with the following columns:

- **title** (TEXT): The title of the song.
- **genre** (TEXT): The genre of the song.
- **performer** (TEXT): The performer of the song.
- **songwriter** (TEXT): The songwriter of the song.
- **release_date** (DATE): The release date of the song.
- **lyrics** (TEXT): The lyrics of the song.
- **rating** (INTEGER): The rating of the song (1-10).
- **url** (TEXT): A link to the song (URL).

## Technologies Used

- **Python 3**: Programming language.
- **Flask**: A lightweight web framework for Python.
- **SQLite**: Relational database for storing song entries.
- **HTML/CSS**: Front-end structure and design.
- **JavaScript**: Used for client-side validation and interactivity.
- **Google Fonts**: Custom fonts used for better typography.
- **Font Awesome**: Icon library (optional) for adding icons.

## Future Enhancements

- **User Authentication**: Allow users to sign up and log in to manage their own list of songs.
- **Search Functionality**: Add the ability to search through the songs by title, genre, or performer.
- **Pagination**: Implement pagination for viewing large numbers of song entries.
- **File Uploads**: Allow users to upload audio files or album cover images for each song entry.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or issues, please contact:

- **AHMAD AGAH**
- **Email**: agah@pdx.edu
- **GitHub**: [ahmadagah](https://github.com/ahmadagah)
- **GitLab**: [agah1](https://gitlab.com/agah1)
