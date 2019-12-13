# sync programmin

1. Call stack
   Keeps track of all functions currently running
   Call stack will add and remove functions from top

Our code will get wrapped in a main function created by node

2. Node api
   It stores all asyn functions

3. Callback queue
   Lists all callbacks that are ready to execute (i.e time on setTimeout finished)

4. Event loop - keeps track of the Call stack and callback queue. If call stack is empty and callback queue has some callbacks it will add the function to call stack

! main() will still block the event loop.
After main finishes synchronous program would finish. But here the even loop will kick in again

! main will always have to finish before callbacks can be put back into call stack
