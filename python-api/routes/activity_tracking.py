from collections import defaultdict
from typing import List
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sklearn.cluster import KMeans
import pandas as pd

router = APIRouter()

class UserActivityLog(BaseModel):
    userId: str
    method: str
    endpoint: str
    recordedAt: str

class SymptomLog(BaseModel):
    country: str
    city: str
    symptoms: List[str]
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

@router.post('/activity-tracking/geography')
async def get_geographic_logs(symptom_logs: List[SymptomLog]):
    if len(symptom_logs) == 0:
        return {"message": "No symptom logs received"}

    # Aggregate symptoms by location
    location_symptoms = defaultdict(int)
    for log in symptom_logs:
        location = f"{log.country}, {log.city}"
        location_symptoms[location] += len(log.symptoms)

    # Prepare data for clustering
    locations = list(location_symptoms.keys())
    symptom_counts = list(location_symptoms.values())
    symptom_matrix = pd.DataFrame(symptom_counts, columns=["symptom_count"])

    # Perform clustering
    num_clusters = 3
    kmeans = KMeans(n_clusters=num_clusters, random_state=0).fit(symptom_matrix)
    clusters = kmeans.labels_

    # Prepare the response
    clustered_data = []
    for i, location in enumerate(locations):
        clustered_data.append({
            "location": location,
            "cluster": int(clusters[i]),
            "symptoms": location_symptoms[location]
        })

    return JSONResponse(content=clustered_data)