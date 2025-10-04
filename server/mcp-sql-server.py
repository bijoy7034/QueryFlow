from fastmcp import FastMCP

mcp = FastMCP()

SQL_URI = ""

@mcp.tool
def run_query(query: str) -> str:
    """Run a MongoDB query and return the results as a string."""
    