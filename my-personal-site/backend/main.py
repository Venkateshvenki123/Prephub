from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

app = FastAPI(title="Guled's PrepHub - Jobs + Courses + Chat")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== JOB APPLICATIONS ==========
class JobApplication(BaseModel):
    company: str
    position: str
    location: str = "Bangalore"
    status: str = "Applied"
    notes: str = ""

# In-memory job storage (add Oracle DB later)
JOB_APPLICATIONS = []

# ========== YOUR EXISTING MODELS ==========
class ChatMessage(BaseModel):
    message: str

class CourseResponse(BaseModel):
    course_name: str
    free_certificate: bool
    cert_status: Optional[str] = None

# Mock courses (your Oracle data)
COURSES = [
    {"course_name": "React.js Fundamentals", "free_certificate": True, "cert_status": "✅ FREE CERTIFICATE"},
    {"course_name": "Node.js & Express API", "free_certificate": True, "cert_status": "✅ FREE CERTIFICATE"},
    {"course_name": "Oracle SQL Masterclass", "free_certificate": True, "cert_status": "✅ FREE CERTIFICATE"},
]

# ========== YOUR SMART RESPONSES (KEEPING ALL) ==========
DSA_RESPONSES = {
    "two pointers": "Two Pointers: Valid Palindrome, Container With Most Water. O(n) time!",
    "sliding window": "Sliding Window: Longest Substring Without Repeat. Hashmap + two pointers.",
    "two sum": "Two Sum: Hashmap stores complement. O(n) time!",
    "binary search": "Binary Search: Sorted array. left <= right, mid=(left+right)//2.",
    "dp": "DP: Fibonacci dp[i]=dp[i-1]+dp[i-2]. Memoization or tabulation."
}

def get_smart_response(message):
    message_lower = message.lower()
    
    for pattern, response in DSA_RESPONSES.items():
        if pattern in message_lower:
            return f"**DSA: {pattern.title()}**\n{response}"
    
    # Fallback (your existing logic)
    fallbacks = [
        "Try: 'two pointers', 'sliding window', 'resume', 'SDE-1 salary'",
        "Guled's portfolio: 156 LeetCode solved, React expert, job hunting! 🚀"
    ]
    return random.choice(fallbacks)

# ========== NEW JOB ROUTES ==========
@app.get("/jobs")
async def get_jobs():
    return JOB_APPLICATIONS

@app.post("/jobs")
async def create_job(job: JobApplication):
    job_data = job.dict()
    job_data['id'] = len(JOB_APPLICATIONS) + 1
    job_data['date_applied'] = datetime.now().strftime("%Y-%m-%d")
    JOB_APPLICATIONS.append(job_data)
    return {
        "success": True, 
        "message": f"✅ Job at {job.company} ({job.position}) added!",
        "job": job_data
    }

# ========== YOUR EXISTING ROUTES ==========
@app.get("/")
async def root():
    return {
        "message": "Guled's PrepHub LIVE ✅", 
        "jobs": len(JOB_APPLICATIONS),
        "courses": len(COURSES),
        "endpoints": ["/jobs", "/courses", "/chat"]
    }

@app.get("/health")
async def health():
    return {"status": "PrepHub API LIVE ✅", "jobs": len(JOB_APPLICATIONS)}

@app.get("/courses", response_model=List[CourseResponse])
async def get_courses():
    return COURSES

@app.post("/chat")
async def chat(message: ChatMessage):
    response = get_smart_response(message.message)
    return {"reply": response, "query": message.message}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001, reload=True)
