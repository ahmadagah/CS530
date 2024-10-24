model_backend = 'sqlite3'

if model_backend == 'sqlite3':
    from .model_sqlite3 import model
else:
    raise ValueError("No appropriate database backend configured.")

appmodel = model()

def get_model():
    return appmodel
