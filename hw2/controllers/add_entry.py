from flask import render_template, request, redirect, url_for
from model import get_model

def add_entry_route():
    """
     Handle the route for adding a new song entry.

    If the request method is POST, it retrieves song data from the form, such as:
    - title
    - genre
    - performer
    - songwriter
    - release date
    - lyrics
    - rating
    - URL

    It then inserts the song data into the database using the `get_model().insert()` method and redirects
    the user to the 'view_entries' page.

    If the request method is GET, it renders the 'add_entry.html' template to display the form for adding a new song.

    Returns:
        - A redirect to the 'view_entries' route on successful POST submission.
        - A rendered 'add_entry.html' template on GET request.
    
    """
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
