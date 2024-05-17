# Debounce House

More advanced debouncing for hairy situations

![Bounce House](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXl2YXQzejk2b2F5eXZ6dHppMjJjOWRxam9xbjJ1eTU3ZWJyZDZ1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SrBwTxpDmFB6/giphy.gif)


Features:

- Debounce by key
  - gives you more flexibility in what to debounce
- Debounce functions
- Debounce promises
  - All promises get the last promises result or error

## Install

`npm install debounce-house`

## Usage

### Debounce By Key (Function)

```javascript
import { debounce_func } from 'debounce-house';

function log_message(id, message){
  debounce_func(500, `logging-${id}`, () => {
    console.log(`Debouncing: ${id}: ${message}`);
  });
}

log_message(1, "First Message");
log_message(1, "Next Message");
log_message(1, "Last Message");
log_message(2, "Another Message");

// prints after 500ms:
// Debouncing: 1: Last Message
// Debouncing: 2: Another Message
```
