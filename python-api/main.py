from fastapi import FastAPI
from routes import activity_tracking
app = FastAPI()

app.include_router(activity_tracking.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
