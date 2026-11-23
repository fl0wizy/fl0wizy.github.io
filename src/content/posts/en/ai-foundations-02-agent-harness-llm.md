If you've looked at AI's genealogy page, you've probably seen that we eventually arrived at the current Transformer model. On top of Transformer, a language model learned from large-scale text, called LLM (Large Language model), was released (what we commonly call AI), and companies such as Anthropic and OpenAI began to speak of this model.

“The model we created answers like a human no matter what you ask, and the accuracy and completeness of its answers are very high.” Anthropic named this model Claude and released it into series such as Opus, Sonnet, and Haiku, and OpenAI released the GPT series model.

However, this model requires a lot of computation to answer our questions. Here, let's look at the case of using the company server's model as an API. We send texts and receive responses according to the standards (API) set by the company. In some cases, I run the model on my computer, but for now I'll use a remote model as an example. The model reads and creates text by dividing it into small processing units called tokens. A token can be a single word or part of a word. The company also uses this number of input and output tokens when calculating fees and length limits. In a general text API, if we send the sentence as is, the service converts it into a token, so the user does not need to convert it to a token number directly.

The problem is that it is inconvenient to use the model using only the API. To continue a conversation, the model must be able to refer back to necessary information from previous conversations. There are ways in which the app sends records, and there are ways in which conversations or previous responses saved on the server are used as IDs. Longer records can increase processing volume and costs, so they may be summarized or only the necessary parts left. However, it is not necessarily a good idea to frequently reset the session. If you reset it, the context you need for your work may also disappear. Also, although the model can request “I want to open this file,” the file will not be opened just by that request. You must have a tool, an execution environment, and access rights to actually read the file. This limitation does not arise only when the model is located on a remote server. A model running on my own computer also cannot read files without a connected tool. So companies created programs that wrapped models and allowed them to do actual work. Examples include apps such as Anthropic's Claude Code and OpenAI's Codex. This execution framework is called a harness.

It is easy to understand harness as “everything that makes LLM easy to use,” but its core is a little more specific. Harness is an execution framework that provides tools by repeatedly calling the model, actually executes the actions requested by the model, and returns the results back to the model. Inserting instructions (prompts) into this harness, connecting external services, and controlling the way it operates is harness engineering. And thanks to harness, when the model determines the next action toward the goal and completes the work, it is called an AI agent.

So, if you ask, “What is the difference between AI and harness?”, AI is a broad term for technologies and systems that do intelligent work, and harness is an execution framework that moves models within that system to be used for actual work. The LLM is a model responsible for judgment and creation, and the agent is a system in which the model and execution framework work together to determine the next action toward the goal. It is not a concept of competition on the same floor.

Things that can be confusing when first encountering these concepts are as follows.

- Token: A processing unit in which a model reads and creates text. Fares and length restrictions also use this unit. In a general text API, the service converts so there is no need for the user to create the token number themselves.
- harness: It is not “everything that makes it easy to use,” but rather an execution framework that provides tools to the model and feeds back and repeats the execution results.
- MCP: It is not a tool to create an agent, but a common standard for plugging external services into the harness.
- agent: “Sending a notification at a set time” is close to automation (when to start). The core of an agent is that the model makes decisions (what to do) on its own.



If you look at the entire structure in one picture, it is as follows. This picture is an example of an arrangement where my computer's harness calls the company server's model. The harness can run on the server, and the model can also run on my computer. Even if the location changes, the role is the same. The model requests the next action, and harness checks permissions and execution conditions and then entrusts execution to a local tool or remote service.

![harness architecture](/images/ai-study/5732e85107b624714896.png)

harness architecture

## 1. Model (LLM): The Brain
It is a Transformer-based language model that comes from the end of the genealogy. When it receives text, it produces the text that comes next. Although you are the center of everything, there is less you can do alone than you think.

- What you can do: Answer questions, write articles, and write code.

- What it cannot do on its own: It cannot automatically remember past conversations that are not in the current input or conversation state provided by the service. You can make a request to call a tool, but reading files or executing commands is left to the associated tool and execution environment. It is necessary to distinguish between the function of the API service to store and connect conversations and the role of the model itself.

- Examples: Anthropic's Claude (Opus, Sonnet, Haiku), OpenAI's GPT series

---

## 2. API: An Interface to the Model
The company places the model on its server and opens a window (endpoint) to receive requests over the Internet. We send text to this window in a designated format (JSON) and receive a response in the same format.

```txt
Request: POST https://api.anthropic.com/v1/messages
{ "model": "claude-...", "max_tokens": 1024,
  "messages": [ { "role": "user", "content": "Is there anything strange in these logs?" } ] }

response:
{ "content": [ { "type": "text", "text": "In line 3..." } ],
  "usage": { "input_tokens": 25, "output_tokens": 180 } }
```

- Fee: Calculated by the number of input/output tokens stamped in `usage` of the response.
- Inconvenient point: Management is needed to connect the conversation context. There are ways to send the history directly or refer to the state stored on the server, and it is not necessary to directly resend the entire previous conversation. Even if the model requests "I need to open this file," the actual opening is up to the tool executor.

---

## 3. Harness: Connecting the Model to Actions
Harness (harness) originally refers to the harness that is worn on a horse. It is a device that binds the power of words so that they can be used for actual work. In AI, it refers to a program that wraps the model's capabilities so that it can be used for actual work, and repeats the process below.

1. It sends user requests, system prompts (basic instructions), and a list of available tools to the model.
2. The model requests a tool call, such as "read this file", in a set format.
3. harness checks the permissions and execution conditions and entrusts the actual execution to the tool execution part.
4. Send the execution results back to the model.
5. Repeat 2\~4 as needed. It stops when the final answer is given, the user interrupts, or the execution limit is reached.

- What else it does: Manage conversation history, summarize long conversations, verify users before executing dangerous commands
- Examples: Claude Code (Anthropic), Codex (OpenAI). Broadly speaking, chatting apps such as claude.ai or ChatGPT are also a form of harness.

---

## 4. Tools and MCP: Connecting External Capabilities
The tools that a harness can expose to a model aren't just basic tools like reading files, executing commands, and searching the web. External services such as Notion or Slack can also be attached as tools. However, if the connection method is different for each service, it must be created anew each time, so Anthropic released MCP (Model Context Protocol) as a common standard in November 2024.

- Analogy: It is like unifying the different charging terminals for each device into one USB-C.
- Example: When you connect Notion MCP to Claude Code, the model sees the request “Read this page” and requests a tool call. When harness sends a request to the MCP server, the server reads the pages allowed for the authenticated account and returns the results.

---

## 5. Harness Engineering: Configuring the Runtime for a Task
Even for the same model, the results vary greatly depending on how the harness is decorated. Designing and adjusting this is harness engineering.

- Instructions: System prompt, rules file like CLAUDE.md. Prompt engineering is part of this.
- Tools: Decide which tools and MCPs to give and which to block.
- Automatic operation: A hook that is automatically executed at a specific time, a method of storing and recalling memories
- Work division: A structure in which large tasks are divided among small agents (subagents).

---

## 6. Agent: Choosing Actions to Complete a Goal
Thanks to the iterative structure of harness, the model can take multiple steps toward a goal on its own, rather than just answering once. This is an AI agent.

- Example: If you say, “Find traces of attacks in this server log and organize them into a report,” the agent finds the log file, reads it, writes and runs an analysis script, and if the results are abnormal, it tries another method and writes a report. The model, not the person, decides what to do at each step.
- Difference from workflow: If a person pre-determines the order with code, such as “1st, then 2nd, then 3rd”, it is a workflow. If a model decides its next action on its own, it is an agent. Anthropic’s article “Building Effective Agents” (December 2024) makes the distinction:
- Difference from automation: “Run every day at 9 o’clock” means deciding when to start, and the agent’s autonomy lies in deciding for itself what to do after starting.

**organize**

| component | metaphor | What to do | yes |
| --- | --- | --- | --- |
| Model (LLM) | brain | Takes text and creates text | Claude Opus/Sonnet, GPT series |
| API | A window to communicate with the brain | A contact point that sends requests to a model and receives results. Billing policies vary by service | Anthropic API, OpenAI API |
| harness | body with limbs | Repeatedly calls the model and executes the tool. | Claude Code, Codex |
| MCP | Outlet specifications for plugging hands and feet into | Connect external services in the same way | Notion MCP, Slack MCP |
| harness engineering | Training your body for work | Design instructions, tools, permissions, and automated actions | CLAUDE.md, hook, subagent |
| agent | person who works for himself | Decide and repeat the next action toward your goal | Claude Code writes reports after analyzing logs |

---

## What Helps You Use an LLM but Is Not a Harness?

Harness ultimately exists to enable people to use their LLM for actual work. However, “helping to use LLM easily” spans several layers, and harness is one of them. So, if you say, “If you make it easy to use, it’s a harness,” other layers will also be included in the harness.

| equipment | What to do | Why not harness |
| --- | --- | --- |
| **SDK** (e.g. Anthropic's Python library) | client.messages.create(...) allows you to call the API in one line | It just makes an HTTP request instead. Even if the model answers “Read the file,” the developer must personally plan the repetition of executing it and returning the result. |
| **Model Execution Server** (e.g. Ollama, vLLM) | Return the model from my computer or server | This is the layer that “turns on” the model. It is one floor below the harness. |
| **API relay service** (e.g. OpenRouter) | Allows models from multiple companies to be used through one window | We only receive requests and pass them on to the relevant company, but do not execute or repeat them. |
| **Tokenizer/Token Calculator** | It allows you to estimate the cost by counting in advance how many tokens there are in the text. | It is a calculation aid. |
| **MCP Server** (e.g. Notion MCP) | Notion provides functions such as reading/writing as a tool. | It is a part that is plugged into the harness. A harness is required for the model to use the tool. |
| **Vector DB** (search storage for RAG) | Find relevant documentation and provide materials to input into the model. | It is a part used by harness or app. |
| **Fine Tuning Tool** | The model itself is additionally trained with my data. | Harness is the part that surrounds the model, and fine tuning is the part that changes the model itself. |

Looking at the layers, they are as follows.

```txt
[Model execution] Company server, Ollama, vLLM ← Run the model
[Access Window] Anthropic API, OpenRouter ← Send a request to the model
[Call Helper] SDK ← Makes Requests Easy
[harness] Claude Code, Codex ← Repeat execution + Tool execution
[Parts] MCP server, vector DB, various tools ← plugged into the harness and used
```

Every layer helps “make LLM easy to use.” Among them, there is something that only harness does.

## How to Recognize a Harness

“Do you look at the model’s output, actually do something, and then return the results back to the model?”

- Yes → Harness : When the model says, “Read this file,” Claude Code actually reads it and sends the contents back to the model.
- No → Not harness: The SDK is done once you send a request and receive a response.

The word harness has no standard definition that fixes the scope, so the boundaries are sometimes blurred.

- **Recent SDKs:** Some have features that automatically return tool call iterations (e.g. tool runner in Anthropic SDK). The moment you use that function, the SDK becomes part of the harness role.
- **Claude Agent SDK:** It is a library version of Claude Code's harness, so the name is SDK, but it is harness.
- **Simple apps like translation buttons:** Just call the API once and show the result, there is no repetition or tool execution, so it is not usually called harness.
