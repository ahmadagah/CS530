from abc import ABC, abstractmethod

class BaseModel(ABC):
    @abstractmethod
    def get_all_songs(self):
        """
        Retrieve all songs from the data store.
        :return: List of dictionaries with song attributes.
        """
        pass

    @abstractmethod
    def add_song(self, title, genre, performer, songwriter, release_date, lyrics, rating, url):
        """
        Add a new song to the data store.
        :param title: Title of the song
        :param genre: Genre of the song
        :param performer: Performer of the song
        :param songwriter: Songwriter of the song
        :param release_date: Release date of the song
        :param lyrics: Lyrics of the song
        :param rating: Rating of the song
        :param url: URL of the song on a music service
        """
        pass
