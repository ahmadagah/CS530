from flask import render_template, request, redirect, url_for
from model import get_model

def add_entry_route():
    """Create a new song entry."""
    if request.method == 'POST':
        title = request.form['title']
        genre = request.form['genre']
        performer = request.form['performer']
        songwriter = request.form['songwriter']
        release_date = request.form['release_date']
        lyrics = request.form['lyrics']
        rating = int(request.form['rating'])
        url = request.form['url']

        model = get_model()
        model.insert(title, genre, performer, songwriter, release_date, lyrics, rating, url)
        return redirect(url_for('view_entries'))

    return render_template('add_entry.html')
