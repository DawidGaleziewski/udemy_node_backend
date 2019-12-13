# terminal commands:

node -v //version

# Trivia:

-node.js uses V8 engine to run javascript code, same as chrome.

- v8 engine uses a lot of C++ under the hood. i.e document.querySelector or fs is binded to a C++ function

- When we run node in terminal it enters REPL mode (read eval print loop). Same as ruby IRB

- We can run javascript functions here i.e:
  'andrew'.toUpperCase()

- node REPL will not have however 'window' or DOM

- node wil have however 'global'. Browser does not have it.

- node does not have document, but it has process
  For example we can exit node by invokin:
  process.exit()

# 2. Running scripts

Script can be run by:
node script_name.js
