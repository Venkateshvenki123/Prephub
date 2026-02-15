# backend/routes/courses.py
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from mysql.connector import Error
from ..config.database import get_db_connection

router = APIRouter(prefix="/api/courses", tags=["courses"])

# Pydantic Models
class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = "beginner"
    is_free: Optional[bool] = True
    url: Optional[str] = None

class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    level: str
    is_free: bool
    url: Optional[str] = None
    cert_status: Optional[str] = None
    
    class Config:
        from_attributes = True

# GET all courses
@router.get("", response_model=List[CourseResponse])
async def get_courses(category: Optional[str] = None, level: Optional[str] = None):
    """Fetch all courses with optional filtering by category and level"""
    try:
        connection = get_db_connection()
        if not connection:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        cursor = connection.cursor(dictionary=True)
        
        # Build query with filters
        query = """
            SELECT id, title, description, category, level, is_free, url,
                   CASE WHEN is_free=1 THEN '✅ FREE CERTIFICATE' END as cert_status
            FROM courses
            WHERE 1=1
        """
        params = []
        
        if category:
            query += " AND category = %s"
            params.append(category)
        
        if level:
            query += " AND level = %s"
            params.append(level)
        
        cursor.execute(query, params)
        courses = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return courses
    except Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching courses: {str(e)}"
        )

# GET single course by ID
@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(course_id: int):
    """Fetch a specific course by ID"""
    try:
        connection = get_db_connection()
        if not connection:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute(
            """SELECT id, title, description, category, level, is_free, url,
                      CASE WHEN is_free=1 THEN '✅ FREE CERTIFICATE' END as cert_status
               FROM courses WHERE id = %s""",
            (course_id,)
        )
        course = cursor.fetchone()
        cursor.close()
        connection.close()
        
        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found"
            )
        
        return course
    except Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

# POST create new course (admin only)
@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_course(course_data: CourseCreate):
    """Create a new course (admin operation)"""
    try:
        connection = get_db_connection()
        if not connection:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        cursor = connection.cursor()
        
        cursor.execute(
            """INSERT INTO courses (title, description, category, level, is_free, url, created_at)
               VALUES (%s, %s, %s, %s, %s, %s, NOW())""",
            (course_data.title, course_data.description, course_data.category,
             course_data.level, course_data.is_free, course_data.url)
        )
        connection.commit()
        
        course_id = cursor.lastrowid
        cursor.close()
        connection.close()
        
        return {
            "success": True,
            "message": "Course created successfully!",
            "course_id": course_id
        }
    except Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating course: {str(e)}"
        )

# PUT update course (admin only)
@router.put("/{course_id}", response_model=dict)
async def update_course(course_id: int, course_data: CourseCreate):
    """Update an existing course (admin operation)"""
    try:
        connection = get_db_connection()
        if not connection:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        cursor = connection.cursor()
        
        # Check if course exists
        cursor.execute("SELECT id FROM courses WHERE id = %s", (course_id,))
        if not cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found"
            )
        
        cursor.execute(
            """UPDATE courses 
               SET title=%s, description=%s, category=%s, level=%s, 
                   is_free=%s, url=%s, updated_at=NOW()
               WHERE id=%s""",
            (course_data.title, course_data.description, course_data.category,
             course_data.level, course_data.is_free, course_data.url, course_id)
        )
        connection.commit()
        cursor.close()
        connection.close()
        
        return {
            "success": True,
            "message": "Course updated successfully!",
            "course_id": course_id
        }
    except Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

# DELETE course (admin only)
@router.delete("/{course_id}", response_model=dict)
async def delete_course(course_id: int):
    """Delete a course (admin operation)"""
    try:
        connection = get_db_connection()
        if not connection:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        cursor = connection.cursor()
        
        # Check if course exists
        cursor.execute("SELECT id FROM courses WHERE id = %s", (course_id,))
        if not cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found"
            )
        
        cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))
        connection.commit()
        cursor.close()
        connection.close()
        
        return {
            "success": True,
            "message": "Course deleted successfully!",
            "course_id": course_id
        }
    except Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

# GET courses by category
@router.get("/category/{category}", response_model=List[CourseResponse])
async def get_courses_by_category(category: str):
    """Fetch all courses in a specific category"""
    try:
        connection = get_db_connection()
        if not connection:
            raise HTTPException(status_code=500, detail="Database connection failed")
        
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute(
            """SELECT id, title, description, category, level, is_free, url,
                      CASE WHEN is_free=1 THEN '✅ FREE CERTIFICATE' END as cert_status
               FROM courses WHERE category = %s""",
            (category,)
        )
        courses = cursor.fetchall()
        cursor.close()
        connection.close()
        
        return courses
    except Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )
