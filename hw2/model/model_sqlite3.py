import sqlite3
from .Model import Model
from datetime import date

DB_FILE = 'songs.db'  # Database file

class model(Model):
    """
    A model class for interacting with a SQLite3 database to store and retrieve song entries.
    
    This class inherits from a base `Model` class and provides methods to insert and select song data
    from the database. It automatically creates a `songs` table if it doesn't exist.
    """
    def __init__(self):
        """
        Initializes the model by connecting to the SQLite3 database and creating the `songs` table if it
        doesn't already exist.

        The `songs` table stores the following fields:
        - title: The title of the song (TEXT)
        - genre: The genre of the song (TEXT)
        - performer: The performer of the song (TEXT)
        - songwriter: The songwriter of the song (TEXT)
        - release_date: The release date of the song (DATE)
        - lyrics: The lyrics of the song (TEXT)
        - rating: The rating of the song (INTEGER)
        - url: The URL to the song or related content (TEXT)

        Closes the database connection after table creation.
        """
        self.connection = sqlite3.connect(DB_FILE)
        self.cursor = self.connection.cursor()

        # Create the songs table if it doesn't exist
        try:
            self.cursor.execute('''CREATE TABLE IF NOT EXISTS songs
                                   (title TEXT, genre TEXT, performer TEXT,
                                    songwriter TEXT, release_date date, lyrics TEXT,
                                    rating INTEGER, url TEXT)''')
        except sqlite3.Error as e:
            print(f"Error creating table: {e}")

        self.cursor.close()
        self.connection.close()

    def select(self):
        """
        Retrieves all song entries from the `songs` table.
        
        This method opens a connection to the SQLite database, retrieves all rows from the `songs` table,
        and converts them into a list of dictionaries, where each dictionary represents a song entry.

        Returns:
            List[dict]: A list of song entries, each as a dictionary with the following keys:
                - title (str): Title of the song
                - genre (str): Genre of the song
                - performer (str): Performer of the song
                - songwriter (str): Songwriter of the song
                - release_date (date): Release date of the song
                - lyrics (str): Lyrics of the song
                - rating (int): Rating of the song
                - url (str): URL to the song or related content
        """
        self.connection = sqlite3.connect(DB_FILE)
        self.cursor = self.connection.cursor()
        self.cursor.execute("SELECT * FROM songs")
        rows = self.cursor.fetchall()

        # Convert rows to a list of dictionaries
        entries = []
        for row in rows:
            entries.append({
                'title': row[0],
                'genre': row[1],
                'performer': row[2],
                'songwriter': row[3],
                'release_date': row[4],
                'lyrics': row[5],
                'rating': row[6],
                'url': row[7]
            })
        return entries

    def insert(self, title, genre, performer, songwriter, release_date, lyrics, rating, url):
        """
        Inserts a new song entry into the `songs` table in the SQLite3 database.

        Parameters:
            title (str): The title of the song.
            genre (str): The genre of the song.
            performer (str): The performer of the song.
            songwriter (str): The songwriter of the song.
            release_date (date): The release date of the song.
            lyrics (str): The lyrics of the song.
            rating (int): The rating of the song (must be an integer).
            url (str): The URL to the song or related content.

        Returns:
            bool: True if the song was successfully inserted, False otherwise.

        Raises:
            sqlite3.Error: If an error occurs during database interaction.
        """
        # Prepare the parameters for the query
        params = {
            'title': title,
            'genre': genre,
            'performer': performer,
            'songwriter': songwriter,
            'release_date': release_date,
            'lyrics': lyrics,
            'rating': rating,
            'url': url
        }

        # Open a connection to the database
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()


         # Open a connection to the database
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()

        try:
            # Execute the INSERT SQL command with named parameters
            cursor.execute("""
                INSERT INTO songs (title, genre, performer, songwriter, release_date, lyrics, rating, url) 
                VALUES (:title, :genre, :performer, :songwriter, :release_date, :lyrics, :rating, :url)
            """, params)

            # Commit the transaction
            connection.commit()

        except sqlite3.Error as e:
            # Handle database errors (print or log the error)
            print(f"Database error: {e}")
            return False

        finally:
            # Always close the cursor and connection to free resources
            cursor.close()
            connection.close()

        return True