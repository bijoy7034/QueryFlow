from fastapi import APIRouter, Request

router = APIRouter(
    prefix="/ai",
    tags=["ask"],
)

@router.post("/ask")
async def ask(query: str, request: Request):
    agent = request.app.state.agent
    if agent is None:
        return {"error": "Agent not initialized yet. Try again in a moment."}

    response = await agent.ainvoke(
    {"messages": [{"role": "user" ,"content": query}]},
    config={"configurable": {"thread_id": request.state.user['username']}} 
)

    return {"response": response["messages"][-1].content}
