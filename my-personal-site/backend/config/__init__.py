# backend/config/__init__.py
from .database import get_db_connection, DB_CONFIG

__all__ = ['get_db_connection', 'DB_CONFIG']
