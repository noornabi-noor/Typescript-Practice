# Differences Between **Interfaces** and **Types** in TypeScript

TypeScript হল JavaScript-এর উপর একটি শক্তিশালী টাইপ সিস্টেম। এতে **interface** এবং **type alias**—এই দুইটি বিষয় সবচেয়ে বেশি ব্যবহৃত হয়। নিচে সহজভাবে দু’টির পার্থক্য ব্যাখ্যা করা হলো।

---

## 🧩 **Interface কী?**

**Interface হচ্ছে একটি Blueprint**, যা বলে দেয়—

> “একটি object-এর ভিতরে কোন কোন property থাকবে এবং তার টাইপ কী হবে।”

### ✔ উদাহরণ:

```ts
interface Student {
    name: string;
    id: number;
    dept: string;
}
```
এখন এইভাবে object তৈরি করলে ঠিক থাকবে:
```ts
const s: Student = {
    name: "Rahim",
    id: 101,
    dept: "CSE"
};
```
ভুল টাইপ দিলে TypeScript error দেখাবে:
```ts
const s: Student = {
    name: "Rahim",
    id: "101",       // ❌ Error: number হওয়ার কথা
    dept: "CSE"
};
```
---

## 🧩 Type কী?

Type alias মানে হলো কোনো একটি টাইপের নাম রাখা।

> এটা interface-এর মতো object বর্ণনা করতে পারে, আবার আরও অনেক কিছু করতে পারে।

### ✔ উদাহরণ:
```ts
type Student = {
    name: string;
    id: number;
    dept: string;
};
```
Type alias দিয়ে union টাইপ তৈরি করা যায়:
```ts
type ID = string | number;
```
এটি interface দিয়ে করা যায় না।

---

# 🔍 Interface এবং Type-এর মধ্যে পার্থক্য
## ⭐ ১. Interface → merge হতে পারে

TypeScript একই interface বারবার ঘোষণা করলে সেগুলো merge হয়ে যায়।
```ts
interface Person {
    name: string;
}

interface Person {
    age: number;
}

const p: Person = {
    name: "Rahim",
    age: 25
};
```

কিন্তু Type alias merge হয় না:
```ts
type Person = {
    name: string;
}
type Person = {   // ❌ Error
    age: number;
}
```

## ⭐ ২. Type alias → union, intersection, primitive সবই express করতে পারে
```ts
type ID = string | number;      // union
type Status = "success" | "fail";
type Age = number;
```


Interface দিয়ে এগুলো করা সম্ভব নয়।
Interface শুধুমাত্র object structure বর্ণনা করতে পারে:
```ts
interface User {
    id: number;
    name: string;
}

```
## ⭐ ৩. Interface → class implements করতে সবচেয়ে উপযোগী
```ts
interface Animal {
    name: string;
    makeSound(): void;
}

class Dog implements Animal {
    name = "Dog";
    makeSound() {
        console.log("Ghew!");
    }
}
```

Type alias দিয়েও করা সম্ভব, তবে interface মূলত object/class structure enforce করার জন্য।

---

# 🔑 **What is the `keyof` keyword in TypeScript?**

**`keyof`** হলো TypeScript-এর একটি keyword যা কোনো object type-এর **all keys** কে একটি union type হিসেবে বের করে দেয়।  
এটি type-safe কোড লেখা এবং dynamic key access করার জন্য খুবই উপকারী।

---

### ✔ Example:

```ts
type User = {
    id: number;
    name: string;
    email: string;
};

type UserKeys = keyof User;
// Equivalent to: "id" | "name" | "email"
```

এখানে UserKeys হলো "id" | "name" | "email" union type।
এর মানে, User object-এর keys ছাড়া অন্য কোনো key ব্যবহার করা যাবে না।

### 🔹 Practical Use Case

ধরা যাক, আমরা একটি function বানাতে চাই যা object থেকে নির্দিষ্ট key-এর value return করবে:

```ts
function getValue<T>(obj: T, key: keyof T) {
    return obj[key];
}

const user = { id: 1, name: "Rakib", email: "rakib@example.com" };

console.log(getValue(user, "name"));  // Output: Rakib
console.log(getValue(user, "email")); // Output: rakib@example.com

// getValue(user, "age");  ❌ Error: 'age' is not a key of User
```

এখানে keyof T নিশ্চিত করছে যে function-এ শুধুমাত্র object-এর বৈধ key ব্যবহার করা হবে।
এটি TypeScript-এর type safety নিশ্চিত করে।

