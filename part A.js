
function makeMemoFib() {
  const cache = new Map();

  function compute(n) {
    if (cache.has(n)) {
      return cache.get(n);
    }

    if (n <= 1) {
      return n;
    }

    const result = compute(n - 1) + compute(n - 2);
    cache.set(n, result);
    return result;
  }
  return compute;
}

const memoFib = makeMemoFib();

console.log(memoFib(10)); // 55
console.log(memoFib(10)); // 55 — uses the cache
console.log(memoFib(15)); // 610


function myPow(base, exp) {
  if (exp === 0) return 1;

  if (exp < 0) {
    return 1 / myPow(base, -exp);
  }

  return base * myPow(base, exp - 1);
}

console.log(myPow(2, 3));  // 8
console.log(myPow(2, -3)); // 0.125
console.log(myPow(5, 0));  // 1


function curry(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return function (nextArg) {
      return curried(...args, nextArg);
    };
  }

  return curried;
}

function add(a, b, c) {
  return a + b + c;
}

console.log(curry(add)(1)(2)(3)); // 6


function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }

    return result;
  };
}

const greet = once(() => "Hello!");
console.log(greet()); // Hello!
console.log(greet()); // Hello!


class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, fn) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(fn);
  }

  off(event, fn) {
    this.events.get(event)?.delete(fn);
  }

  emit(event, ...args) {
    this.events.get(event)?.forEach(fn => fn(...args));
  }
}

const emitter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

emitter.on("greet", greet);
emitter.emit("greet", "Naomi"); // Hello, Naomi!
emitter.off("greet", greet);
