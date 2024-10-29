from datetime import date
from gbmodel.base_model import BaseModel

class PyListModel(BaseModel):
    def __init__(self):
        # Initialize with an empty list to store song data
        self.songs = []

    def get_all_songs(self):
        """
        Retrieve all songs from the in-memory list.
        :return: List of dictionaries with song attributes.
        """
        return self.songs

    def add_song(self, title, genre, performer, songwriter, release_date, lyrics, rating, url):
        """
        Add a new song to the in-memory list.
        :param title: Title of the song
        :param genre: Genre of the song
        :param performer: Performer of the song
        :param songwriter: Songwriter of the song
        :param release_date: Release date of the song
        :param lyrics: Lyrics of the song
        :param rating: Rating of the song
        :param url: URL of the song on a music service
        """
        # Create a dictionary for the song and append it to the list
        song = {
            'title': title,
            'genre': genre,
            'performer': performer,
            'songwriter': songwriter,
            'release_date': release_date,
            'lyrics': lyrics,
            'rating': rating,
            'url': url,
            'added_on': date.today().strftime('%Y-%m-%d')  # Add current date
        }
        self.songs.append(song)
