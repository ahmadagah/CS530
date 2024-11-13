
from .Model import Model
from datetime import datetime
from google.cloud import datastore

GOOGLE_CLOUD_PROJECT = 'cloud-agah-agah'

def from_datastore(entity):
    """Translates Datastore results into the format expected by the
    application.

    Args:
        entity (datastore.Entity): The entity from Datastore.

    Returns:
       dict: A dictionary representing the entity's properties in the format:
        {
            'title': 'title',
            'genre': 'genre',
            'performer': 'performer',
            'songwriter': 'songwriter',
            'release_date': 'release_date',
            'lyrics': 'lyrics',
            'rating': 'rating',
            'url': 'url'
        }
    """
    if not entity:
        return None
    if isinstance(entity, list):
        entity = entity.pop()
     
    return {
        'title': entity.get('title', ''),
        'genre': entity.get('genre', ''),
        'performer': entity.get('performer', ''),
        'songwriter': entity.get('songwriter', ''),
        'release_date': entity.get('release_date', ''),
        'lyrics': entity.get('lyrics', ''),
        'rating': entity.get('rating', ''),
        'url': entity.get('url', '')
    }

class model(Model):
    """
    A model class for interacting with Google Cloud Datastore to store and retrieve song entries.
    """
    def __init__(self):
        """
        Initializes the model by creating a Datastore client.
        """
        self.client = datastore.Client(project='cloud-agah-agah')

    def select(self):
        """
        Retrieves all song entries from the Datastore and formats them using `from_datastore`.
        
        This method queries the Datastore for all entities of kind `Song` and converts them into a list
        of entries using the `from_datastore` function.

        Returns:
            List[list]: A list of song entries, where each entry is a list of the song's properties.
        """
        query = self.client.query(kind = 'Song')
        entities = list(map(from_datastore,query.fetch()))
        return entities

    def insert(self, title, genre, performer, songwriter, release_date, lyrics, rating, url):
        """
        Inserts a new song entry into the Datastore.

        Parameters:
            title (str): The title of the song.
            genre (str): The genre of the song.
            performer (str): The performer of the song.
            songwriter (str): The songwriter of the song.
            release_date (datetime): The release date of the song.
            lyrics (str): The lyrics of the song.
            rating (int): The rating of the song.
            url (str): The URL to the song or related content.

        Returns:
            bool: True if the song was successfully inserted.
        """
        key = self.client.key('Song')
        rev = datastore.Entity(key)
        rev.update({
            'title': title,
            'genre': genre,
            'performer': performer,
            'songwriter': songwriter,
            'release_date': release_date,
            'lyrics': lyrics,
            'rating': rating,
            'url': url
        })
        self.client.put(rev)
        return True