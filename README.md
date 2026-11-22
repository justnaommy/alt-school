# AltSchool Africa — School of Engineering
## First Semester Practical Assessment (Part A & Part B)

> **Student Name:** Akinsiku Temiloluwa Naomi  
> **AltSchool ID:** `ALT/SOE/KAR/026/0650`  
> **Course Track:** School of Engineering (Frontend Development)  
> **Repository:** [https://github.com/justnaommy/alt-school](https://github.com/justnaommy/alt-school)  
> **Course Material Reference:** [JavaScript Class Notes Slide 294](https://javascript.oluwasetemi.dev/294)  

---

## 📋 Table of Contents
1. [Overview & Repository Structure](#-overview--repository-structure)
2. [PART A: Semantic HTML Architecture (Strictly No CSS)](#-part-a-semantic-html-architecture-strictly-no-css)
   - [`index.html` — Profile & Biography](#1-indexhtml--student-profile--biography)
   - [`form.html` — AltSchool Sign-In Form Mirror](#2-formhtml--altschool-sign-in-form-mirror)
   - [Accessibility & Semantic Standards](#3-accessibility--semantic-standards)
3. [PART B: JavaScript Problem-Solving Challenges (Slide 294)](#-part-b-javascript-problem-solving-challenges-slide-294)
   - [Problem 1: Recursive Power — `myPow`](#problem-1-recursive-power--mypow)
   - [Problem 2: Memoized Fibonacci — `makeMemoFib`](#problem-2-memoized-fibonacci--makememofib)
   - [Problem 3: Function Currying — `curry`](#problem-3-function-currying--curry)
   - [Problem 4: Execution Guard — `once`](#problem-4-execution-guard--once)
   - [Problem 5: Event Emitter — `EventEmitter`](#problem-5-event-emitter--eventemitter--createemitter)
4. [Testing & Verification Guide](#-testing--verification-guide)

---

## 📂 Overview & Repository Structure

This repository contains the complete solutions for **Part A** and **Part B** of the AltSchool Africa first-semester examination assessment.

```text
alt-school/
├── index.html        # PART A: Student profile, biography, reasons, goals, and #top fragment link
├── form.html         # PART A: Accessible application/sign-in form mirroring AltSchool portal
├── part-B.js         # PART B: Production-ready JavaScript solutions for Slide 294 (Problems 1–5)
└── README.md         # Full project documentation, architectural decisions & complexity analysis
```

---

## 🌐 PART A: Semantic HTML Architecture (Strictly No CSS)

The objective of Part A is to build accessible, valid, and well-structured web documents using **pure semantic HTML5** without any CSS styling (`style` tags, inline styles, or external stylesheets).

### 1. `index.html` — Student Profile & Biography
* **Global Navigation:** Located at the top of the page inside `<header><nav>`, connecting seamlessly to `form.html`.
* **Personal Information:** Displays student name, AltSchool Student ID (`ALT/SOE/KAR/026/0650`), and track information.
* **Narrative Content:** Contains structured sections detailing my engineering biography, motivation for joining the AltSchool program, and professional career goals.
* **Fragment Identifier:** Features a jump-to-top anchor (`#top`) allowing users to quickly return to the document header.
* **Semantic Footer:** Includes physical contact information inside an `<address>` tag and official copyright notice.

### 2. `form.html` — AltSchool Sign-In Form Mirror
* **Mirrors the AltSchool Portal:** Models the authentication interface at [`https://portal.altschoolafrica.com/auth/signin`](https://portal.altschoolafrica.com/auth/signin?callbackUrl=/).
* **Global Navigation:** Identical top `<header><nav>` navigation linking back to `index.html`.
* **Accessible Form Controls:**
  * **Email Field:** `<input type="email">` with `required` and `autocomplete="email"`.
  * **Password Field:** `<input type="password">` with `required` and `autocomplete="current-password"`.
  * **Remember Me:** `<input type="checkbox">` properly associated with its label.
  * **Submission:** Accessible `<button type="submit">Sign In</button>`.
  * **Account Recovery & Registration Links:** Dedicated navigational anchors for forgotten credentials and account creation.
* **Semantic Grouping:** Form controls are grouped within a `<fieldset>` with an explanatory `<legend>`.
* **Semantic Footer:** Consistent `<address>` and copyright footer across both pages.

### 3. Accessibility & Semantic Standards
* Explicit `<label for="...">` association matching unique input `id` attributes for screen readers.
* Proper document outlines using hierarchical heading levels (`<h1>` through `<h2>`).
* Valid HTML5 document structure (`<!DOCTYPE html>`, `<html lang="en">`, character encoding `<meta charset="UTF-8">`, viewport configuration).
* Strictly zero CSS formatting to demonstrate foundational HTML markup proficiency.

---

## ⚡ PART B: JavaScript Problem-Solving Challenges (Slide 294)

The objective of Part B is to solve the five core algorithm and functional programming challenges specified on **Slide 294** of the official class slides ([`https://javascript.oluwasetemi.dev/294`](https://javascript.oluwasetemi.dev/294)).

All code is implemented in [`part-B.js`](part-B.js).

---

### Problem 1: Recursive Power — `myPow`
**Concepts:** Recursion, Base Cases, Exponentiation Arithmetic, Negative Exponent Handling.

#### **Challenge Description:**
Compute $base^{exp}$ recursively without using `Math.pow()` or the exponentiation operator (`**`). The solution must correctly handle positive exponents, zero exponents, and negative exponents.

#### **Implementation:**
```javascript
function myPow(base, exp) {
  if (exp === 0) return 1;

  if (exp < 0) {
    return 1 / myPow(base, -exp);
  }

  return base * myPow(base, exp - 1);
}
```

#### **Test Cases & Output:**
```javascript
myPow(2, 3);   // 8
myPow(2, 10);  // 1024
myPow(2, -3);  // 0.125
myPow(5, 0);   // 1
```

* **Mathematical Rationale:**
  * Base case: Any number raised to the power of 0 equals 1 ($x^0 = 1$).
  * Negative exponent rule: $x^{-n} = \frac{1}{x^n}$.
  * Recursive reduction: $x^n = x \times x^{n-1}$.
* **Complexity:** Time: $O(n)$ | Space: $O(n)$ call stack depth. *(An optimized $O(\log n)$ divide-and-conquer strategy is also documented).*

---

### Problem 2: Memoized Fibonacci — `makeMemoFib`
**Concepts:** Closures, Higher-Order Functions, Memoization, `Map` Data Structure.

#### **Challenge Description:**
Create a Fibonacci generator that retains an internal cache across function calls via closures. When invoked repeatedly with the same argument, it must return the cached result instantly without redundant recursive computation.

#### **Implementation:**
```javascript
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
```

#### **Test Cases & Output:**
```javascript
const memoFib = makeMemoFib();
memoFib(10); // 55
memoFib(10); // 55 (Instant cache hit — no re-computation)
memoFib(15); // 610
```

* **Architectural Rationale:** Standard recursive Fibonacci has an exponential time complexity of $O(2^n)$ due to overlapping subproblems. By encapsulating a `Map` within the lexical scope of `makeMemoFib`, cached values are preserved across invocations, reducing complexity to linear $O(n)$.
* **Complexity:** Time: $O(n)$ initial calculation, $O(1)$ lookup | Space: $O(n)$ cache storage.

---

### Problem 3: Function Currying — `curry`
**Concepts:** Currying, Higher-Order Functions, Rest Parameters, Partial Application, `Function.length`.

#### **Challenge Description:**
Implement a curry wrapper that transforms a multi-argument function into a chain of callable functions until all required arguments (`fn.length`) have been supplied. The implementation must support both single-argument chaining and multi-argument batching.

#### **Implementation:**
```javascript
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
```

#### **Test Cases & Output:**
```javascript
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);    // 6 (Single argument chained)
curriedAdd(1, 2)(3);    // 6 (Multi-argument first call)
curriedAdd(1)(2, 3);    // 6 (Multi-argument second call)
curriedAdd(1, 2, 3);    // 6 (All arguments passed at once)
```

* **Architectural Rationale:** Inspects `fn.length` (the arity of the target function). Uses rest parameters `...nextArgs` to accumulate arbitrary parameter counts across successive calls until the target threshold is met.
* **Complexity:** Time: $O(1)$ per evaluation call | Space: $O(k)$ where $k$ is the number of curried arguments stored in closures.

---

### Problem 4: Execution Guard — `once`
**Concepts:** Closures, Function Decorators, State Flags, Return Caching.

#### **Challenge Description:**
Write a higher-order utility that wraps an arbitrary function `fn` such that it can only be executed once. Subsequent calls must return the cached result of the initial execution without invoking `fn` again.

#### **Implementation:**
```javascript
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
```

#### **Test Cases & Output:**
```javascript
const initialize = once(() => {
  console.log("Database connection initialized!");
  return { status: "connected", port: 5432 };
});

initialize(); // Logs "Database connection initialized!", returns { status: "connected", port: 5432 }
initialize(); // Returns cached object, does NOT log again
initialize(); // Returns cached object, does NOT log again
```

* **Architectural Rationale:** Uses private closure variables (`called` boolean flag and `result` reference). Essential for critical one-time lifecycle actions such as establishing singletons, payment authorizations, or initializing event listeners.
* **Complexity:** Time: $O(1)$ | Space: $O(1)$.

---

### Problem 5: Event Emitter — `EventEmitter` & `createEmitter`
**Concepts:** Object-Oriented Programming, Custom Event Systems, Publish/Subscribe Pattern, `Map` and `Set`.

#### **Challenge Description:**
Implement an event notification system featuring `on(event, fn)`, `off(event, fn)`, and `emit(event, ...args)`. The system must allow multiple unique listeners per event name, permit listeners to be un-registered, and provide the factory instantiation method `createEmitter()` matching the Slide 294 specification.

#### **Implementation:**
```javascript
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
```

#### **Test Cases & Output:**
```javascript
const emitter = createEmitter();

const notifyUser = (user) => console.log(`Notification sent to: ${user}`);

emitter.on("alert", notifyUser);
emitter.emit("alert", "Ada");   // "Notification sent to: Ada"
emitter.emit("alert", "Naomi"); // "Notification sent to: Naomi"

emitter.off("alert", notifyUser);
emitter.emit("alert", "Chidi"); // Nothing logged — listener successfully removed
```

* **Architectural Rationale:** Utilizes a `Map` where event names are keys and values are `Set` instances. Using a `Set` ensures duplicate listener callbacks cannot be accidentally registered multiple times, and enables $O(1)$ constant-time listener removal (`off`).
* **Complexity:** 
  * Registration (`on`): $O(1)$
  * Deregistration (`off`): $O(1)$
  * Emission (`emit`): $O(k)$ where $k$ is the number of active listeners for that event.

---

## 🧪 Testing & Verification Guide

### 1. Validating Part A (HTML Pages):
* Open `index.html` in any browser to verify personal profile details, the top navigation links, and the `#top` smooth jump anchor.
* Click the **"AltSchool Sign-In Form"** link in the navigation header to verify seamless routing to `form.html`.
* Test the form fields, required validations, and address footer.
* Confirm that no CSS styling or external design frameworks are present.

### 2. Validating Part B (JavaScript Algorithms):
Run the test script directly from your terminal using Node.js:

```bash
node part-B.js
```

All 5 problems will execute sequentially with clearly labeled output headers verifying correct outputs for every edge case.

---

## 📝 Submission Checklist
- [x] **Part A:** `index.html` and `form.html` exist in the same directory.
- [x] **Part A:** Global `<header><nav>` navigation present on both pages.
- [x] **Part A:** Semantic `<address>` and copyright `<footer>` present on both pages.
- [x] **Part A:** Strictly 0% CSS (no `<style>`, no `.css`, no inline attributes).
- [x] **Part B:** All 5 challenges from Slide 294 implemented in `part-B.js`.
- [x] **Part B:** Verified with test cases for positive, negative, and edge-case inputs.
- [x] **Documentation:** Thorough `README.md` explaining architecture and complexity analysis.
