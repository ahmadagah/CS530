from flask import render_template
from model import get_model

def view_entries_route():
    """
    Handle the route for viewing all song entries.

    This function retrieves all song entries from the database using the `get_model().select()` method.
    It then renders the 'view_entries.html' template, passing the list of entries for display.

    Returns:
        A rendered 'view_entries.html' template populated with the song entries from the database.
        """
    model = get_model()
    entries = model.select()
    return render_template('view_entries.html', entries=entries)
