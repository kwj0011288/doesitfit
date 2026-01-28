"""
Payment entitlement middleware placeholder.
Currently allows all requests. Can be activated later for Polar.sh or Stripe integration.
"""
from fastapi import HTTPException, status


async def require_entitlement(token: str = None):
    """
    Placeholder middleware for payment entitlement validation.
    
    In MVP: Always allows requests (no payment gating).
    
    For production with Polar.sh/Stripe:
    1. Validate token/session from payment provider
    2. Check if user has active subscription or credits
    3. Optionally consume credits (1 generation = 1 credit)
    4. Raise HTTPException if not entitled
    
    Args:
        token: Optional auth token from payment provider
        
    Raises:
        HTTPException: 401 if token invalid, 403 if not entitled
    """
    # MVP: Always allow
    return True
    
    # Future implementation example:
    # if not token:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Authentication required"
    #     )
    #
    # # Validate with Polar.sh or Stripe
    # is_valid = await validate_payment_token(token)
    # if not is_valid:
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail="Active subscription or credits required"
    #     )
    #
    # return True
