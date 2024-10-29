from abc import ABC, abstractmethod


class Model(ABC):
    @abstractmethod
    def select(self):
        """Selects all rows from the database.
        Returns a list of tuples.
        This method must be implemented by the subclass.
        """
        pass

    @abstractmethod
    def insert(self, title, genre, performer, songwriter, release_date, lyrics, rating, url):
        """
        Inserts a new row into the database.
        This method must be implemented by subclasses.
        :param title: str
        :param genre: str
        :param performer: str
        :param songwriter: str
        :param release_date: str
        :param lyrics: str
        :param rating: int
        :param url: str
        """
        pass
