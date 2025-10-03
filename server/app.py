import os
import sys
import asyncio
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from middleware.auth_middleware import AuthMiddleware
from routes.user import router as user_router
from routes.ask import router as ask_router

from langchain_google_genai import ChatGoogleGenerativeAI
from mcp import StdioServerParameters, ClientSession
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from mcp.client.stdio import stdio_client
from langchain_mcp_adapters.tools import load_mcp_tools
from contextlib import asynccontextmanager


model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.2,
)

server_parameters = StdioServerParameters(
    command=sys.executable,
    args=["mcp-server.py"],
)

memory = MemorySaver()

async def mcp_background_task(app: FastAPI):
    """Initialize MCP agent and keep session alive."""
    async with stdio_client(server_parameters) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await load_mcp_tools(session)

            app.state.agent = create_react_agent(
                model,
                tools,
                prompt=(
                    "You are a MongoDB assistant. "
                    "Your job is to use the tools from the MCP server to interact with MongoDB safely and effectively. "
                    "Use tools to fetch schema info, update documents, disable jobs via config collections, and more. "
                    "Never guess. Use the tools provided for every action or question about data."
                ),
                checkpointer=memory,
            )
            print("MCP agent initialized.")

            while True:
                await asyncio.sleep(3600)

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(mcp_background_task(app))
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("MCP agent background task cancelled.")

app = FastAPI(lifespan=lifespan)

app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(ask_router)
