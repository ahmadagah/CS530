from flask import render_template
from model import get_model

def view_entries_route():
    """View all song entries."""
    model = get_model()
    entries = model.select()
    return render_template('view_entries.html', entries=entries)
