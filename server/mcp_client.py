import asyncio
import os
import sys
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from mcp import StdioServerParameters, ClientSession
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import HumanMessage
from mcp.client.stdio import stdio_client
from langchain_mcp_adapters.tools import load_mcp_tools

load_dotenv()

model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.2,
)

server_parameters = StdioServerParameters(
    command=sys.executable,
    args =['mcp-server.py'],
)

memory = MemorySaver()

async def main():
    async with stdio_client(server_parameters) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await load_mcp_tools(session)

            agent = create_react_agent(
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
            config = {"configurable": {"thread_id": "335885"}}

            while True:
                user_input = input("You: ")
                if user_input.lower() in ['exit', 'quit', 'q']:
                    print("Exiting...")
                    break

                agent_response = await agent.ainvoke(
                    {"messages": [HumanMessage(content=user_input)]},
                    config=config
                )
                print("Bot:", agent_response["messages"][-1].content)

if __name__ == "__main__":
    asyncio.run(main())