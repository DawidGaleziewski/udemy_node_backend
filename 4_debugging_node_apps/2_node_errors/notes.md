# Understanding the error

```javascript
  else throw err
           ^

//! Below  is the actual error that v8 throws
ReferenceError: dataJsON is not defined
    // Function name that caused the crash
    at saveNotes (/home/dawid/Desktop/udemy/node_backend/

    //File name notes.js, row 74 column 34
    4_debugging_node_apps/2_node_errors/notes.js:74:34)

    // save note that caused the issue was called by add note
    at Object.addNote (/home/dawid/Desktop/udemy/node_backend/4_debugging_node_apps/2_node_errors/notes.js:29:5)                  at Object.handler (/home/dawid/Desktop/udemy/node_backend/4_debugging_node_apps/2_node_errors/app.js:22:11)

    // add note that caused the issue was called by runCommand
    at Object.runCommand (/home/dawid/Desktop/udemy/node_backend/4_debugging_node_apps/2_node_errors/node_modules/yargs/lib/command.js:240:40)

    // After that we get to yargs lib
    at Object.parseArgs [as _parseArgs] (/home/dawid/Desktop/udemy/node_backend/4_debugging_node_apps/2_node_errors/node_modules/yargs/yargs.js:1095:41)
    at Object.parse (/home/dawid/Desktop/udemy/node_backend/4_debugging_node_apps/2_node_errors/node_modules/yargs/yargs.js:555:25)
    at Object.<anonymous> (/home/dawid/Desktop/udemy/node_backend/4_debugging_node_apps/2_node_errors/app.js:66:7)
    at Module._compile (internal/modules/cjs/loader.js:959:30)

    // At the bottom we go to node internals
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
    at Module.load (internal/modules/cjs/loader.js:815:32)

```
