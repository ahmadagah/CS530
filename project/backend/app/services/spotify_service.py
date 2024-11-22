from flask import Blueprint, request, jsonify, session, redirect
import requests
import os
from urllib.parse import urlencode

spotify_bp = Blueprint('spotify', __name__)

# Spotify App Credentials
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = "http://localhost:5000/auth/callback"

@spotify_bp.route('/auth/login', methods=['GET'])
def login():
    # Redirect user to Spotify's login page
    auth_url = "https://accounts.spotify.com/authorize"
    params = {
        "client_id": SPOTIFY_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "scope": "playlist-modify-private user-read-recently-played"
    }
    return redirect(f"{auth_url}?{urlencode(params)}")

@spotify_bp.route('/auth/callback', methods=['GET'])
def auth_callback():
    # Handle Spotify callback and fetch access token
    auth_code = request.args.get('code')
    if not auth_code:
        return jsonify({"error": "Authorization code not provided"}), 400

    token_url = "https://accounts.spotify.com/api/token"
    data = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(token_url, data=data, headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch access token"}), 400

    token_info = response.json()
    session['spotify_token'] = token_info.get('access_token')
    return jsonify({"message": "Logged in successfully", "access_token": token_info.get('access_token')})

@spotify_bp.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Fetch Spotify recommendations based on mood
    spotify_token = session.get('spotify_token')
    if not spotify_token:
        return jsonify({"error": "User not authenticated"}), 401

    genres = request.json.get('genres', [])
    rec_url = "https://api.spotify.com/v1/recommendations"
    headers = {"Authorization": f"Bearer {spotify_token}"}
    params = {
        "seed_genres": ",".join(genres),
        "limit": 10,
    }
    response = requests.get(rec_url, headers=headers, params=params)
    return response.json()
