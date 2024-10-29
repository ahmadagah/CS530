from flask import render_template

def index_route():
    """Handle the route for the landing page.

    This function renders the 'index.html' template, which typically contains links to other routes or
    sections of the application.

    Returns:
        A rendered 'index.html' template."""
    return render_template('index.html')
