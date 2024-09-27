// Increasing the slots variable:
// When we increase the slots variable, we're essentially increasing the size of the underlying array.
// Any new keys set after increasing slots will be hashed to different slots based on the updated modulo operation.
// The get operations should continue to work as expected, retrieving values from their corresponding slots in the array.
// Decreasing the slots variable:
// When you decrease the slots variable, you're reducing the size of the underlying array.
// If the number of keys hashed to different slots exceeds the new size of the array, collisions may occur.
// Collisions happen when two different keys hash to the same slot.
// Values of collided keys might get overwritten, leading to potential data loss.









const crypto = require("crypto");

const slots = 100;
// Initialize array with empty slots
const array = Array(slots).fill([]);

// Hash function
const hash = (key) => {
  return crypto.createHash("sha256").update(key, "utf8").digest("hex");
};

// Slot calculation
const slot = (key) => {
  const hashedKey = hash(key);
  const position = parseInt(hashedKey, 16);
  return position % slots;
};

// Set function with collision handling using chaining
const set = (key, value) => {
  const slotIndex = slot(key);
  const chain = array[slotIndex];
  const existingIndex = chain.findIndex(([k]) => k === key);
  if (existingIndex !== -1) {
    // If key exists, update its value
    chain[existingIndex][1] = value;
  } else {
    // If key doesn't exist, add key-value pair to the chain
    chain.push([key, value]);
  }
};

// Get function with collision handling using chaining
const get = (key) => {
  const slotIndex = slot(key);
  const chain = array[slotIndex];
  const pair = chain.find(([k]) => k === key);
  return pair ? pair[1] : undefined;
};


set("bob", 21);
set("alice", 24);
set("eve", 19);

console.log(get("bob")); // Output: 21
console.log(get("alice")); // Output: 24
console.log(get("eve")); // Output: 19

// Print the array
console.log(array);

