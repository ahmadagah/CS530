from flask import Flask
from app.api.spotify_routes import spotify_bp
from app.api.mood_routes import mood_bp
from flask_cors import CORS

app = Flask(__name__)

# Register blueprints
app.register_blueprint(spotify_bp, url_prefix='/api/spotify')
app.register_blueprint(mood_bp, url_prefix='/api/mood')

if __name__ == '__main__':
    app.run(debug=True)

CORS(app) # Allow CORS for all routes
