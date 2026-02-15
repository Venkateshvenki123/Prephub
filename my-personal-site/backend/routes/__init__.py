# backend/routes/__init__.py
from .auth import router as auth_router
from .courses import router as courses_router

__all__ = ['auth_router', 'courses_router']
