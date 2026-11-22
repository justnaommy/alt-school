// =============================================================================
// AltSchool Africa — School of Engineering
// PART B: JavaScript Problem-Solving Challenges (Slide 294)
// Reference: https://javascript.oluwasetemi.dev/294
// Student: Akinsiku Temiloluwa Naomi (ALT/SOE/KAR/026/0650)
// =============================================================================

// -----------------------------------------------------------------------------
// Problem 1: Power Function — myPow(base, exp)
// Recursive implementation handling positive, negative, and zero exponents
// -----------------------------------------------------------------------------
function myPow(base, exp) {
  if (exp === 0) return 1;

  if (exp < 0) {
    return 1 / myPow(base, -exp);
  }

  return base * myPow(base, exp - 1);
}

// Test Cases:
console.log("--- Problem 1: myPow ---");
console.log(myPow(2, 3));   // 8
console.log(myPow(2, 10));  // 1024
console.log(myPow(2, -3));  // 0.125
console.log(myPow(5, 0));   // 1


// -----------------------------------------------------------------------------
// Problem 2: Memoized Fibonacci — makeMemoFib()
// Closure-based caching using Map to prevent redundant recursive calculations
// -----------------------------------------------------------------------------
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

// Test Cases:
console.log("\n--- Problem 2: makeMemoFib ---");
const memoFib = makeMemoFib();
console.log(memoFib(10)); // 55
console.log(memoFib(10)); // 55 (cached)
console.log(memoFib(15)); // 610


// -----------------------------------------------------------------------------
// Problem 3: Currying — curry(fn)
// Transforms a function to accept arguments one or multiple at a time
// -----------------------------------------------------------------------------
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

// Test Cases:
console.log("\n--- Problem 3: curry ---");
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6


// -----------------------------------------------------------------------------
// Problem 4: Once — once(fn)
// Restricts function execution to a single invocation; caches result
// -----------------------------------------------------------------------------
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

// Test Cases:
console.log("\n--- Problem 4: once ---");
const greet = once(() => {
  console.log("initialized!");
  return "Hello!";
});
console.log(greet()); // logs "initialized!", returns "Hello!"
console.log(greet()); // returns "Hello!" without re-logging
console.log(greet()); // returns "Hello!" without re-logging


// -----------------------------------------------------------------------------
// Problem 5: Event Emitter — EventEmitter & createEmitter()
// Event-driven publish/subscribe system using Map and Set
// -----------------------------------------------------------------------------
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

// Factory function matching Slide 294 specification
function createEmitter() {
  return new EventEmitter();
}

// Test Cases:
console.log("\n--- Problem 5: EventEmitter ---");
const emitter = createEmitter();
const sayHello = (name) => console.log(`Hello, ${name}!`);
emitter.on("greet", sayHello);
emitter.emit("greet", "Ada");   // "Hello, Ada!"
emitter.emit("greet", "Naomi"); // "Hello, Naomi!"
emitter.off("greet", sayHello);
emitter.emit("greet", "Chidi"); // nothing logged (listener removed)
