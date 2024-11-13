model_backend = 'datastore'  # Ensure this is set correctly to 'datastore' for your use case

if model_backend == 'datastore':
    from .model_datastore import model
else:
    raise ValueError("No appropriate database backend configured.")

appmodel = model()

def get_model():
    """
    Retrieve the configured database model.

    This function returns an instance of the database model that has been configured for the application.
    It supports both 'sqlite3' and 'datastore' backends.

    Returns:
        An instance of the database model (`appmodel`) for performing CRUD operations.
    """
    return appmodel
