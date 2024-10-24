from flask import Flask
from .controllers.index import index_route
from .controllers.view_entries import view_entries_route
from .controllers.add_entry import add_entry_route

# Initialize the Flask application
app = Flask(__name__)

# Register the controllers (routes)

# The index route handles the home page of the app.
app.add_url_rule('/', 'index', index_route)

# The view_entries route displays all the song entries.
app.add_url_rule('/view', 'view_entries', view_entries_route)

# The add_entry route allows users to add a new song, handling both GET (display form) and POST (submit form) requests.
app.add_url_rule('/add', 'add_entry', add_entry_route, methods=['GET', 'POST'])

if __name__ == '__main__':
    """
    Entry point for running the Flask app.
    The app is configured to:
    - Run on host `0.0.0.0` (accessible externally)
    - Run on port 5000
    - Enable debug mode (useful for development)
    """
    app.run(host='0.0.0.0', port=5000, debug=True)
