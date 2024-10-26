from flask import Flask, request, render_template, redirect, url_for
from songmodel.model_pylist import PyListModel

app = Flask(__name__)
model = PyListModel()

@app.route('/')
def index():
    songs = model.get_all_songs()
    return render_template('index.html', songs=songs)