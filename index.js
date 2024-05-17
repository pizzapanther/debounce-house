var QUEUE = {};

export function debounce_func(timeout, key, func) {
  if (QUEUE[key]) {
    QUEUE[key].push({func});
  } else {
    QUEUE[key] = [{func}];
  }

  setTimeout(run_last_func(key), timeout);
}

export function debounce_promise(timeout, key, func) {
  return new Promise((resolve, reject) => {
    if (QUEUE[key]) {
      QUEUE[key].push({resolve, reject, func});
    } else {
      QUEUE[key] = [{resolve, reject, func}];
    }

    setTimeout(run_last_promise(key), timeout);
  });
}

function run_last_func(key) {
  return () => {
    if (QUEUE[key]) {
      let calls = QUEUE[key];
      delete QUEUE[key];
      calls[calls.length - 1].func();
    }
  };
}

function run_last_promise(key, resolve, reject) {
  return () => {
    if (QUEUE[key]) {
      let calls = QUEUE[key];
      delete QUEUE[key];

      calls[calls.length - 1]
        .func()
        .then(return_result(calls, 'resolve'))
        .catch(return_result(calls, 'reject'));
    }
  };
}

function return_result(calls, call_type) {
  return (ret) => {
    calls.forEach((c) => {
      c[call_type](ret);
    });
  }
}
