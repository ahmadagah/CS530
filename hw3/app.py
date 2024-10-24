from flask import Flask
from controllers.index import index_route
from controllers.view_entries import view_entries_route
from controllers.add_entry import add_entry_route

app = Flask(__name__)

# Register the controllers (routes)
app.add_url_rule('/', 'index', index_route)
app.add_url_rule('/view', 'view_entries', view_entries_route)
app.add_url_rule('/add', 'add_entry', add_entry_route, methods=['GET', 'POST'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
