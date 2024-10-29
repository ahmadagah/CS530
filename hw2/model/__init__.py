model_backend = 'sqlite3'

if model_backend == 'sqlite3':
    from .model_sqlite3 import model
else:
    raise ValueError("No appropriate database backend configured.")

appmodel = model()

def get_model():
    """
    Retrieve the configured database model.

    This function returns an instance of the database model that has been configured for the application.
    Currently, it supports only the 'sqlite3' backend.

    Raises:
        ValueError: If an unsupported database backend is configured.

    Returns:
        An instance of the database model (`appmodel`) for performing CRUD operations.
    """
    return appmodel
