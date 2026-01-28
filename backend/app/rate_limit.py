"""
In-memory IP-based rate limiting for MVP.
Can be replaced with Redis for production.
"""
from collections import defaultdict
from datetime import datetime, timedelta
from typing import Dict, List
import os


class RateLimiter:
    """Simple in-memory rate limiter using sliding window"""
    
    def __init__(self, max_requests: int = 10, window_seconds: int = 3600):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        # Store list of request timestamps for each IP
        self.requests: Dict[str, List[datetime]] = defaultdict(list)
    
    def is_allowed(self, ip_address: str) -> bool:
        """Check if request from this IP is allowed"""
        now = datetime.now()
        cutoff = now - timedelta(seconds=self.window_seconds)
        
        # Remove old requests outside the window
        self.requests[ip_address] = [
            req_time for req_time in self.requests[ip_address]
            if req_time > cutoff
        ]
        
        # Check if under limit
        if len(self.requests[ip_address]) < self.max_requests:
            self.requests[ip_address].append(now)
            return True
        
        return False
    
    def get_retry_after(self, ip_address: str) -> int:
        """Get seconds until rate limit resets for this IP"""
        if not self.requests[ip_address]:
            return 0
        
        oldest_request = min(self.requests[ip_address])
        reset_time = oldest_request + timedelta(seconds=self.window_seconds)
        seconds_until_reset = (reset_time - datetime.now()).total_seconds()
        
        return max(0, int(seconds_until_reset))


# Global rate limiter instance
rate_limiter = RateLimiter(
    max_requests=int(os.getenv("RATE_LIMIT_REQUESTS", "10")),
    window_seconds=int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "3600"))
)
