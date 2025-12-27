# routes/ask.py
from fastapi import APIRouter, Request, HTTPException

router = APIRouter(
    prefix="/ai",
    tags=["ask"],
)

def format_response_as_markdown(content: str, query: str) -> str:
    """Format the AI response as a well-structured markdown document"""
    markdown = f"""
        {content}
        """
    return markdown

@router.post("/ask")
async def ask(query: str, request: Request):
    try:
        agent = request.app.state.agent
        print(f"User: {request.state.user}")
        
        if agent is None:
            raise HTTPException(
                status_code=503, 
                detail="Agent not initialized yet. Try again in a moment."
            )

        response = await agent.ainvoke(
            {"messages": [{"role": "user", "content": query}]},
            config={"configurable": {"thread_id": request.state.user['username']}}
        )
        
        last_message = response["messages"][-1]

        if hasattr(last_message, 'content'):
            content = last_message.content
        else:
            content = str(last_message)
        
       
        if isinstance(content, list):
            text_parts = []
            for item in content:
                if isinstance(item, dict) and 'text' in item:
                    text_parts.append(item['text'])
                elif isinstance(item, str):
                    text_parts.append(item)
            content = '\n'.join(text_parts)
        elif isinstance(content, dict) and 'text' in content:
            content = content['text']
        

        content = str(content)
        

        markdown_response = format_response_as_markdown(content, query)
        
        return {
            "response": markdown_response,
            "format": "markdown"
        }
    
    except Exception as e:
        print(f"Error in ask endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))