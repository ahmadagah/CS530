from flask import Flask, render_template, request, redirect, url_for
from model import get_model

app = Flask(__name__)
model = get_model()

@app.route('/')
def index():
    """Landing page with links to other routes."""
    return render_template('index.html')

@app.route('/view')
def view_entries():
    """View all song entries."""
    entries = model.select()
    return render_template('view_entries.html', entries=entries)

@app.route('/add', methods=['GET', 'POST'])
def add_entry():
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

        model.insert(title, genre, performer, songwriter, release_date, lyrics, rating, url)
        return redirect(url_for('view_entries'))

    return render_template('add_entry.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
