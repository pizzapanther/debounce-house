# Debounce House

More advanced debouncing for hairy situations

![Bounce House](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXl2YXQzejk2b2F5eXZ6dHppMjJjOWRxam9xbjJ1eTU3ZWJyZDZ1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SrBwTxpDmFB6/giphy.gif)


**Features:**

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

### Debounce Promises

```javascript
import { debounce_promise } from 'debounce-house';

function save_month_data(id, month, data) {
  return debounce_promise(3000, `save-sales-${id}-${month}`, () => {
    axios.post(`/api/sales/${id}/${month}`, data);
  });
}

save_month_data(1, '2024-01', data1)
  .then((response) => {})
  .catch((error) => {});

save_month_data(1, '2024-01', data2)
  .then((response) => {})
  .catch((error) => {});

save_month_data(1, '2024-01', data3)
  .then((response) => {})
  .catch((error) => {});

save_month_data(1, '2024-02', data4)
  .then((response) => {})
  .catch((error) => {});

// API Call (1, '2024-01', data3) and (1, '2024-02', data4)
// are called after 3000 ms.
// All (1, '2024-01', *) promises receive the result from
// last call (1, '2024-02', data4).
```

## API

### debounce_func(timeout, key, fn)

Debounce function calls based on keys that are similar. Last function that is debounced within the timeout period is called.

#### timeout

Type: Integer<br>
Wait timeout in milliseconds the function will be debounced.

#### key

Type: String<br>
Key used to debounce function

#### fn

Type: Function<br>
Function to call

#### Return

`undefined`

### debounce_promise(timeout, key, fn)

Debounce promises based on keys that are similar. Last promise that is debounced within the timeout period is called. All promises are resolved with the result from that last promise call.

#### timeout

Type: Integer<br>
Wait timeout in milliseconds the function will be debounced.

#### key

Type: String<br>
Key used to debounce function

#### fn

Type: Function<br>
Function to call. Function should return a Promise.

#### Return

`Promise`
