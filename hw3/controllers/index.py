from flask import render_template

def index_route():
    """Landing page with links to other routes."""
    return render_template('index.html')
