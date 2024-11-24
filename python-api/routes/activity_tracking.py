from collections import defaultdict
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd

router = APIRouter()

class UserActivityLog(BaseModel):
    userId: str
    method: str
    endpoint: str
    recordedAt: str

class ActivityCountResponse(BaseModel):
    date: str
    unique_users: int

@router.post("/activity-tracking/users")
async def get_user_activities(users: List[UserActivityLog]):
    """ Get the number of unique users per day """
    if len(users) == 0:
        return {"message": "No activity tracking data received"}

    # Dictionary to hold the activities grouped by date
    user_activity_per_day = defaultdict(set)

    # Iterate over each activity and group by userId and date
    for activity in users:
        # Convert the recordedAt to date (without time)
        date = activity.recordedAt.split("T")[0]
        # Use a set to ensure unique users per day
        user_activity_per_day[date].add(activity.userId)

    # For each date, count the number of unique users
    result = []
    for date, user_ids in user_activity_per_day.items():
        result.append(ActivityCountResponse(date=date, unique_users=len(user_ids)))

    return result
