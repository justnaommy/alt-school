# alt-school
# JavaScript Functions and Problem-Solving Exercises

## Overview

This project contains five JavaScript exercises focused on problem-solving, recursion, closures, memoization, higher-order functions, and event-driven programming.

The goal is to understand how to break a problem into smaller steps, identify the conditions that control a function, and implement a solution using JavaScript.

## 1. Memoized Fibonacci

**Function:** `makeMemoFib()`

### Problem

Calculate Fibonacci numbers without repeatedly calculating values that have already been computed.

### Logic

1. Create a cache using a `Map` to store previously calculated Fibonacci numbers.
2. When a number is requested, check whether its answer is already in the cache.
3. If the answer exists, return it immediately.
4. If the number is `0` or `1`, return the number itself.
5. Otherwise, calculate the sum of the two preceding Fibonacci numbers.
6. Save the result in the cache and return it.

### Example

```javascript
const memoFib = makeMemoFib();

console.log(memoFib(10)); // 55
console.log(memoFib(10)); // 55
console.log(memoFib(15)); // 610
```

**Key concept:** Memoization, recursion, and closures.

## 2. Recursive Power Function

**Function:** `myPow(base, exp)`

### Problem

Calculate a number raised to a given exponent without using `Math.pow()`.

### Logic

1. If the exponent is `0`, return `1`.
2. If the exponent is negative, calculate the corresponding positive power and return its reciprocal.
3. If the exponent is positive, multiply the base by the result of the same function with the exponent reduced by one.
4. Continue until the base case is reached.

### Example

```javascript
console.log(myPow(2, 3));  // 8
console.log(myPow(2, -3)); // 0.125
console.log(myPow(5, 0));  // 1
```

**Key concept:** Recursion, base cases, and negative exponents.

## 3. Function Currying

**Function:** `curry(fn)`

### Problem

Transform a function that accepts multiple arguments into one that can accept its arguments one at a time.

### Logic

1. Receive the original function.
2. Collect arguments as they are supplied.
3. Check whether the number of collected arguments is sufficient to call the original function.
4. If enough arguments have been collected, execute the original function.
5. Otherwise, return another function that accepts the next argument.

### Example

```javascript
function add(a, b, c) {
  return a + b + c;
}

console.log(curry(add)(1)(2)(3)); // 6
```

**Key concept:** Higher-order functions, closures, and rest parameters.

## 4. Execute a Function Only Once

**Function:** `once(fn)`

### Problem

Create a function that executes the original function only on its first call and returns the same result on subsequent calls.

### Logic

1. Create a variable to track whether the function has been called.
2. Create a variable to store the first result.
3. On the first call, execute the original function and save its result.
4. Mark the function as called.
5. On later calls, return the saved result without executing the original function again.

### Example

```javascript
const greet = once(() => "Hello!");

console.log(greet()); // Hello!
console.log(greet()); // Hello!
```

**Key concept:** Closures, state management, and higher-order functions.

## 5. Event Emitter

**Class:** `EventEmitter`

### Problem

Implement a basic event system that allows functions to subscribe to events, unsubscribe from them, and execute when an event is emitted.

### Logic

1. Use a `Map` to associate event names with their listeners.
2. The `on()` method registers a listener for an event.
3. The `off()` method removes a listener from an event.
4. The `emit()` method calls all listeners registered for that event and passes along any supplied arguments.
5. Use a `Set` to avoid registering the same function more than once for the same event.

### Example

```javascript
const emitter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

emitter.on("greet", greet);
emitter.emit("greet", "Naomi"); // Hello, Naomi!
emitter.off("greet", greet);
```

**Key concept:** Classes, maps, sets, callbacks, and event-driven programming.

## Technologies

- JavaScript (ES6+)
- Functions and higher-order functions
- Recursion and memoization
- Closures
- `Map` and `Set`
- Rest parameters and callbacks

## Learning Outcomes

Through these exercises, I practiced:

- Breaking programming problems into smaller logical steps.
- Identifying base cases and recursive cases.
- Reusing stored results to reduce unnecessary computation.
- Managing state through closures.
- Writing reusable functions that accept other functions.
- Managing event listeners and callbacks.

## Running the Project

1. Install [Node.js](https://nodejs.org/).
2. Save the JavaScript solutions in a `.js` file.
3. Open a terminal in the project directory.
4. Run:

   ```bash
   node filename.js
   ```

Replace `filename.js` with the name of your JavaScript file.
