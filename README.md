# JavaScript Problem-Solving Practice

A collection of JavaScript exercises focused on problem-solving, functions, closures, recursion, event-driven programming, data structures, and algorithms.

The goal is to strengthen logical thinking, understand how different data structures work, and write clear and efficient code.

## Table of Contents

1. [Recursive Power — `myPow`](#1-recursive-power--mypow)
2. [Memoized Fibonacci — `makeMemoFib`](#2-memoized-fibonacci--makememofib)
3. [Function Currying — `curry`](#3-function-currying--curry)
4. [Execute Once — `once`](#4-execute-once--once)
5. [Event Emitter](#5-event-emitter)
6. [Two Sum](#6-two-sum)
7. [Valid Anagram](#7-valid-anagram)
8. [Group Anagrams](#8-group-anagrams)
9. [Longest Unique Substring](#9-longest-unique-substring)
10. [Flatten and Deduplicate](#10-flatten-and-deduplicate)

---

## 1. Recursive Power — `myPow`

**Concepts:** Recursion, base cases, exponentiation.

Calculate a number raised to an integer power without relying on the built-in exponentiation operator.

```javascript
function myPow(base, exp) {
  if (exp === 0) return 1;

  if (exp < 0) {
    return 1 / myPow(base, -exp);
  }

  const half = myPow(base, Math.floor(exp / 2));

  if (exp % 2 === 0) {
    return half * half;
  }

  return base * half * half;
}
```

**Examples:**

```javascript
myPow(2, 3);   // 8
myPow(2, -2);  // 0.25
myPow(5, 0);   // 1
```

**Complexity:** Time: O(log n) | Space: O(log n) due to recursion.

---

## 2. Memoized Fibonacci — `makeMemoFib`

**Concepts:** Closures, recursion, memoization, `Map`.

Create a Fibonacci function that remembers previously calculated results to avoid repeated work.

```javascript
function makeMemoFib() {
  const cache = new Map([
    [0, 0],
    [1, 1]
  ]);

  function fib(n) {
    if (cache.has(n)) {
      return cache.get(n);
    }

    const result = fib(n - 1) + fib(n - 2);
    cache.set(n, result);

    return result;
  }

  return fib;
}
```

**Example:**

```javascript
const fib = makeMemoFib();

fib(6);  // 8
fib(10); // 55
```

**Key lesson:** The inner function retains access to `cache` through a closure. Memoization stores results so they can be reused.

**Complexity:** Time: O(n) to calculate `fib(n)` from an empty cache | Space: O(n).

---

## 3. Function Currying — `curry`

**Concepts:** Higher-order functions, closures, partial application.

Transform a function that accepts multiple arguments into a sequence of functions that each accept one argument.

```javascript
function curry(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...nextArgs) => curried(...args, ...nextArgs);
  }

  return curried;
}
```

**Example:**

```javascript
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
```

**Key lesson:** Each call collects arguments until enough have been provided to invoke the original function.

---

## 4. Execute Once — `once`

**Concepts:** Closures, state management, higher-order functions.

Create a wrapper that executes a function only once and returns the stored result on subsequent calls.

```javascript
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }

    return result;
  };
}
```

**Example:**

```javascript
let count = 0;

const runOnce = once(() => ++count);

runOnce(); // 1
runOnce(); // 1
runOnce(); // 1
```

**Key lesson:** The closure preserves `called` and `result` between function calls.

---

## 5. Event Emitter

**Concepts:** Classes, `Map`, `Set`, callbacks, event-driven programming.

Implement a simple event system that allows listeners to subscribe to events, unsubscribe, and receive emitted data.

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(callback);
  }

  off(event, callback) {
    const listeners = this.events.get(event);

    if (!listeners) return;

    listeners.delete(callback);

    if (listeners.size === 0) {
      this.events.delete(event);
    }
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);

    if (!listeners) return;

    for (const callback of [...listeners]) {
      callback(...args);
    }
  }
}
```

**Example:**

```javascript
const emitter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}!`);
}

emitter.on("greet", greet);
emitter.emit("greet", "Naomi"); // Hello, Naomi!

emitter.off("greet", greet);
emitter.emit("greet", "Naomi"); // No output
```

**Key lesson:** An event emitter manages multiple listeners and notifies them when a particular event occurs.

---

## 6. Two Sum — Easy

**Concepts:** Arrays, `Map`, lookup optimization.

Find the indices of two numbers whose sum equals a given target.

```javascript
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}
```

**Example:**

```javascript
twoSum([2, 7, 11, 15], 9);
// [0, 1]
```

**Key lesson:** Store previously visited numbers and their indices in a `Map` so the complement can be found efficiently.

**Complexity:** Time: O(n) | Space: O(n).

---

## 7. Valid Anagram — Easy

**Concepts:** Strings, character frequency, `Map`.

Determine whether two strings contain the same characters with identical frequencies.

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Map();

  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (const char of t) {
    if (!count.has(char) || count.get(char) === 0) {
      return false;
    }

    count.set(char, count.get(char) - 1);
  }

  return true;
}
```

**Examples:**

```javascript
isAnagram("listen", "silent"); // true
isAnagram("hello", "world");   // false
```

**Key lesson:** Character frequencies matter, not the order of the characters.

**Complexity:** Time: O(n) | Space: O(k), where k is the number of distinct characters.

---

## 8. Group Anagrams — Medium

**Concepts:** Strings, sorting, `Map`, arrays.

Group words that contain the same characters.

```javascript
function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const key = word.split("").sort().join("");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(word);
  }

  return Array.from(groups.values());
}
```

**Example:**

```javascript
groupAnagrams([
  "eat", "tea", "tan", "ate", "nat", "bat"
]);

// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

The order of groups may vary.

**Key lesson:** Sorting each word creates a common key for words that are anagrams.

**Complexity:** Time: O(n × m log m), where n is the number of words and m is the maximum word length.

---

## 9. Longest Unique Substring — Medium

**Concepts:** Strings, `Set`, sliding window.

Find the length of the longest substring that contains no repeated characters.

```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);

    maxLength = Math.max(
      maxLength,
      right - left + 1
    );
  }

  return maxLength;
}
```

**Examples:**

```javascript
lengthOfLongestSubstring("abcabcbb"); // 3
lengthOfLongestSubstring("bbbbb");    // 1
lengthOfLongestSubstring("pwwkew");   // 3
```

**Key lesson:** A sliding window expands to include new characters and shrinks when a duplicate appears.

**Complexity:** Time: O(n) | Space: O(k), where k is the number of distinct characters in the active window.

---

## 10. Flatten and Deduplicate — Medium

**Concepts:** Nested arrays, `flat()`, `Set`, sorting.

Flatten a nested array, remove duplicate values, and return the unique values in ascending numerical order.

```javascript
function flatUnique(arr) {
  return [
    ...new Set(arr.flat(Infinity))
  ].sort((a, b) => a - b);
}
```

**Example:**

```javascript
flatUnique([1, [2, 3, [2, 4]], 1, 5]);
// [1, 2, 3, 4, 5]
```

**Key lesson:** `flat(Infinity)` removes nesting, `Set` removes duplicates, and the sorting callback ensures numerical rather than alphabetical sorting.

**Complexity:** Flattening and deduplication take O(n) expected time; sorting takes O(u log u), where u is the number of unique values.

---

## Key Lessons and Skills

Through these exercises, I practiced:

- **Recursion:** Breaking a problem into smaller versions of itself.
- **Closures:** Preserving access to variables between function calls.
- **Memoization:** Caching results to reduce repeated calculations.
- **Higher-order functions:** Accepting and returning functions.
- **Data structures:** Using `Map` and `Set` for efficient lookups and uniqueness.
- **String manipulation:** Counting characters, sorting strings, and finding substrings.
- **Sliding window:** Tracking a changing range of array or string elements.
- **Time and space complexity:** Understanding how solutions scale with input size.

## My Problem-Solving Approach

For each challenge, my goal is to:

1. Understand the problem and identify the expected input and output.
2. Break the problem into smaller logical steps.
3. Choose an appropriate algorithm and data structure.
4. Implement the solution incrementally.
5. Test normal cases, edge cases, and empty inputs.
6. Review the time and space complexity.

## Conclusion

This repository documents my ongoing journey toward becoming a stronger JavaScript developer by practicing logical reasoning, algorithm design, and writing efficient, maintainable code.

