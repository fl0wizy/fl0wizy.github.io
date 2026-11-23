On the harness page, MCP is written in one line as “a common standard for plugging external services into harness.” This page organizes why the standard was created, what it looks like, and in what order it is actually called.

## 1. Why was MCP created?

Before MCP, there was a lot of work to create separate tool integrations for each AI app. Let's say you create a connection for an app that uses Claude and a connection for an app that uses GPT. If all combinations of N AI apps and M tools are implemented separately, N × M separate integrations are required. MCP allows the connection implementation to be reused by aligning requests and responses in different languages to a common standard.

![Comparison of implementation reuse before and after MCP. N + M is not the number of running connections.](/images/ai-study/076938adff543f460e04.png)

Comparison of implementation reuse before and after MCP. N + M is not the number of running connections.

- MCP: A common standard between AI apps and tools. The app side reuses the MCP client implementation, and the tool side provides functions as an MCP server. N + M is a simplification that accounts for this implementation reuse. The number of connections during execution is not necessarily N + M, and actual connections must also match version/function compatibility and authentication/authorization. The common standard in the picture is not a relay server that receives requests from a central location.
- Source: Anthropic released in November 2024. It draws on LSP (Language Server Protocol), which addressed the editor × programming-language integration problem. Afterwards, OpenAI and Google also adopted it.
- Current version: The specification version is indicated by the date (YYYY-MM-DD), and the current version is 2026-07-28 (check the official document Versioning page, 2026-11-17). From this version, the protocol version is written down for each request, and the server accepts each request separately. Versions 2025-11-25 and earlier were initially versioned with the initialize handshake.

---

## 2. Structure

```txt
User - agent loop in Host (AI app) - MCP Client - MCP Server - actual system (DB / API / file)
                     |
                    LLM (local or remote model)
```

![MCP structure](/images/ai-study/ffaccab9a67a3d7390fc.png)

MCP structure

- Host: AI apps such as Claude Code, Claude Desktop, Cursor, and ChatGPT. The harness that coordinates model calls, tool execution, and permission checks runs inside this app.
- MCP Client: A component used when a host communicates with a specific MCP Server. Usually, each server has a client, and it is not something that the user handles like a separate app. This is a distinction of roles, and does not mean that all transmission methods maintain open connections.
- MCP Server: This side provides tools and data according to the MCP standard. It can be created by a service company such as Notion, Slack, or Linear, or it can be created by an individual or team by wrapping an existing API.
- LLM: The reason it is separated from the Host in the picture is to distinguish roles. This may be a remote model on a company server or a local model. In the flow below, the model requests the use of a tool, and the actual MCP communication is handled by the client in the host.

The server provides three main types of capabilities. Below is a breakdown showing who usually selects and uses each function. The MCP does not determine specific screens or call policies.

- Tools: Functions that can be executed. Usually a model suggests its use (model-controlled). Actual execution is determined by checking the host's policies and permissions.
- Resources: Reference data read by URI. The host app reads and inserts it (application-controlled).
- Prompts: Message templates selected by the user (user-controlled). It can be displayed with a slash command, but the host determines how it is displayed on the screen.

---

## 3. Where Does an MCP Server Run?

- Local only (stdio): The host directly launches the server process on the user's PC. Use it when you need to access files or apps on your PC. Example: playwright, ida
- Local wrapper: Runs on the user's PC, but calls the company API remotely from within.
- Remote hosting (Streamable HTTP): Runs on the server of a service company. Users simply attach the URL and authentication without installation. SaaS companies are trending in this direction. Example: Linear, Notion, Slack

If the data and keys are on the company's side, it's hosted remotely. If it needs to touch the user's PC, it's hosted locally.

---

## 4. How Does a Tool Call Work?

![An example of an MCP call sequence. The timing of tool discovery and selection method varies depending on the host.](/images/ai-study/bc24c798a4dbbd0d44df.png)

An example of an MCP call sequence. The timing of tool discovery and selection method varies depending on the host.

```txt
[Discover tools: when you first connect or when you need them]
1. Host’s Client -> MCP Server: tools/list
2. MCP Server -> Host: Tool name/description/input schema
   The Host stores or updates the list and provides the necessary tools to the model.

[User Request]
3. User -> Host: “Summarize this page”
4. Host -> LLM: Define request + required conversation context + tools to be used
5. LLM -> Host: Request to call tool (the model selects the tool in this example)
6. Host’s Client -> MCP Server: tools/call after checking policies and permissions
7. MCP Server -> Host: Execution result
8. Host -> LLM: Paste the results and send again
   (Repeat 5-8 if necessary)
9. LLM -> Host -> User: Final answer
```

- Subject sending the actual request: MCP communication is handled by the Client within the Host. LLM makes a structured request: “Call this tool with this input.” The server executes the received request within the scope of authority.
- Discovery and invocation are separate: MCP is not designed to automatically respond to specific keywords. It is up to the Host's implementation to decide when to retrieve the tool list, whether to search for and provide only the necessary tools, and whether to call them with keywords or fixed rules. There is no rule that says you must receive the list once and send it in full with each request.
- Tool descriptions are written by the server: name, description, and inputSchema are written by the server developer. In effect, it is a “README read by the model”.

---

## 5. Why the Same Request Can Lead to Different Calls

In apps that leave tool selection to the model, even if you ask the same question multiple times, there may be times when the tool is called and sometimes not. This is an operation based on the model’s judgment and the app’s calling policy. MCP itself does not stipulate that “choice must be made probabilistically.” Apps that call tools in an order determined by the developer can also use the same MCP specification.

- When not called: Request is vague / Already answered in conversation / Too many tools / User turned off tool / Description does not match request
- How to make your request clear from the user's perspective: It is helpful to state the object and action, such as "Read this page in Notion." However, just saying the service name or selecting Prompt does not guarantee a call. Whether it is a command that executes a fixed action or a template that delivers a message to the model varies from app to app.
- How to control from an API developer's perspective: Tool selection can be controlled with settings such as tool\_choice in the model API, or a designated tool can be called directly from the app code. Supported settings vary depending on the API. Selecting a tool call and successfully executing it by passing authentication and authorization are two different things.
- Descriptions and instructions are different: original tool descriptions are determined by the server developer. You can also modify it by operating the server yourself or if the host provides a conversion function. When a general user writes instructions to [CLAUDE.md](http://CLAUDE.md) or Skill, it does not change the server description itself, but adds separate instructions on how to use the tool.
- Competing point and security surface: If there are multiple similar tools, the description may influence the choice, but being specific doesn't necessarily mean it will be chosen. If a description from an external server is included in the model input, malicious instructions may also come in. This type of tool description poisoning attack is called tool poisoning.

---

## 6. Difference between MCP and Skill

- Skill: A manual (`SKILL.md` + script) containing procedures and rules. Enter the model context and make good use of the tools that already exist. No new access rights are granted.
- MCP: A common standard that connects tools and data from external systems. It connects the functions to be used, but does not automatically grant access rights that did not exist before the connection itself. For example, even if you attach Notion MCP, you can only read pages permitted for linking with an authenticated account. Actual authority is determined by the service's authentication and authority settings.
- Used together: For example, the “How to Organize Weekly Meeting Minutes” skill instructs the Notion MCP tools in what order.

---

## 7. Attach to Claude Code

From here on, it is not an MCP common standard, but an implementation example connected by Claude Code. The setting location and when to reconnect may vary depending on the app and version.

You can connect an MCP server to your Claude Code without separate public registration. However, the organization's management policy and the authentication/authorization required by the server must be followed.

```bash
claude mcp add --transport http <이름> <URL> --header "Authorization: Bearer <KEY>"   # remote
claude mcp add --transport http <이름> http://localhost:8080/mcp                     # local development
claude mcp add <이름> -- <실행 명령>                                                  # stdio
```

- What `claude mcp add` does: It just writes connection information to a configuration file. Nothing is done at this point.
- Actual connection time: When the session starts, Harness reads the settings and creates an MCP client for each server. So, the added server will be visible from the next session.
- scope: local (default, only me / only this project), project (`.mcp.json` in the repo, all team members / approved when first used), user (only me / all projects)
- Check: `claude mcp list`, `/mcp` in interactive claude
- Test only servers without AI: MCP Inspector (`npx @modelcontextprotocol/inspector`)
- Other Hosts: Claude Desktop (configuration file or connector menu), Cursor (`.cursor/mcp.json`), ChatGPT (I know that only remote servers are supported, not verified). Web-based hosts may require OAuth instead of the API key header (unverified).
