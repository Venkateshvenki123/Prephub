from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import re

app = FastAPI(title="Guled's AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

# Smart responses database
DSA_RESPONSES = {
    "two pointers": "Two Pointers: Valid Palindrome (skip non-alphanumeric, compare left/right), Container With Most Water (min(height[l], height[r]) * distance, move shorter pointer). Time: O(n), Space: O(1).",
    "sliding window": "Sliding Window: Longest Substring Without Repeat (use hashmap for last seen index, right-left-1). Fixed size: queue, Variable: two pointers. Perfect for subarray problems.",
    "two sum": "Two Sum: Hashmap O(n). Store complement (target-nums[i]) → index. Handle duplicates with seen set.",
    "binary search": "Binary Search: Sorted array only. While left <= right: mid = (left+right)//2. if target > arr[mid]: left=mid+1 else: right=mid-1.",
    "dp": "Dynamic Programming: Fibonacci (dp[i] = dp[i-1] + dp[i-2]), Climbing Stairs (dp[i] = dp[i-1] + dp[i-2]). Memoization or Tabulation."
}

REACT_RESPONSES = {
    "useeffect": "useEffect: Runs AFTER render. Dependencies [] = once, undefined = every render, [deps] = when deps change. Cleanup runs BEFORE re-run/unmount.",
    "usecallback": "useCallback vs useMemo: useCallback(() => fn) memoizes FUNCTION, useMemo(() => expensiveCalc) memoizes VALUE. Both prevent child re-renders.",
    "usestate": "useState: Never call in loops/conditions. useReducer for complex state (multiple sub-values, server state).",
    "context": "Context API: useContext for global state (theme, auth). Avoid prop drilling. Provider wraps app.",
    "memo": "React.memo: Prevents re-render if props shallow equal. useMemo for expensive calculations, useCallback for functions."
}

INTERVIEW_RESPONSES = {
    "time complexity": "Time Complexity: O(1) Constant, O(log n) Binary Search, O(n) Linear, O(n log n) Sorting, O(n²) Nested Loops, O(2^n) Recursion.",
    "mock interview": "Mock Interview Tips: 1) Clarify requirements 2) Think aloud 3) Optimal → Brute force 4) Code clean 5) Test edge cases 6) Complexity analysis.",
    "behavioral": "Behavioral (STAR): Situation → Task → Action → Result. 'Tell me about conflict' → Team disagreement → Proposed solution → Project delivered early."
}

JOB_RESPONSES = {
    "resume": "Resume: 1 page, ATS friendly (no images/tables), quantify impact (\"Reduced load 40%\"), GitHub link, customize per JD keywords.",
    "salary": "SDE-1 Salary India: Freshers ₹20-35L (FAANG ₹40-60L), 1-2yr ₹30-50L, Bangalore max, negotiate base + stocks + bonus.",
    "negotiation": "Salary Negotiation: Research Levels.fyi, Glassdoor. Counter 10-20% higher. 'Based on research + my experience, I was expecting ₹35L total comp.'"
}

def get_smart_response(message):
    message_lower = message.lower()
    
    # DSA patterns
    for pattern, response in DSA_RESPONSES.items():
        if pattern in message_lower:
            return f"**DSA: {pattern.replace('two pointers', 'Two Pointers').title()}**\n{response}"
    
    # React patterns
    for pattern, response in REACT_RESPONSES.items():
        if pattern in message_lower:
            return f"**React: {pattern.replace('usestate', 'useState').replace('useeffect', 'useEffect').title()}**\n{response}"
    
    # Interview patterns
    for pattern, response in INTERVIEW_RESPONSES.items():
        if pattern in message_lower:
            return f"**Interview: {pattern.title()}**\n{response}"
    
    # Job patterns
    for pattern, response in JOB_RESPONSES.items():
        if pattern in message_lower:
            return f"**Jobs: {pattern.title()}**\n{response}"
    
    # Fallback responses
    fallbacks = [
        "Try asking: 'Two pointers', 'useEffect', 'time complexity', 'resume tips', or 'SDE-1 salary'",
        "I specialize in React, DSA (LeetCode patterns), interview prep, and job applications! 💼",
        "Guled's portfolio covers: 156 LeetCode solved, React expert, 52 applications tracked! 🚀"
    ]
    return random.choice(fallbacks)

@app.get("/")
async def root():
    return {"message": "Guled's Smart Chatbot Backend ✅", "topics": ["React", "DSA", "Interviews", "Jobs"]}

@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        response = get_smart_response(message.message)
        return {
            "reply": response,
            "confidence": 0.95 if any(word in message.message.lower() for word in ["react", "leetcode", "two", "useeffect"]) else 0.8
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
