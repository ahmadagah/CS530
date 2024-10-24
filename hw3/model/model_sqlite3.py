import sqlite3
from .Model import Model
from datetime import date

DB_FILE = 'songs.db'  # Database file

class model(Model):
    def __init__(self):
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
        """Returns all song entries as a list of dictionaries."""
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
        Inserts a new song entry into the database.
        :param title: String
        :param genre: String
        :param performer: String
        :param songwriter: String
        :param release_date: Date
        :param lyrics: String
        :param rating: Integer
        :param url: String
        :return: True if successful, False otherwise
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