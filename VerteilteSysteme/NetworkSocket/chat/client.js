const net = require("net");
const readline = require("readline");

// Accept username from command line argument
const username = process.argv[2];

// Create a new connection to the server
const client = net.createConnection({ host: "127.0.0.1", port: 3333 }, () => {
  console.log("Connected to server");

  // Send the username to the server
  client.write(JSON.stringify({ username: username }) + "\n");
});

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Listen for input from the user
rl.on("line", (data) => {
  // Send the message to the server
  client.write(JSON.stringify({ username: username, message: data }) + "\n");
});

// Listen for data from the server
client.on("data", (data) => {
  // Parse the incoming message
  const message = JSON.parse(data);

  // Format and print the message
  const timestamp = new Date().getTime();
  console.log(`${timestamp} ${message.username}: ${message.message}`);
});

// Handle errors
client.on("error", (err) => {
  console.error("Error:", err.message);
});

// Handle disconnection
client.on("end", () => {
  console.log("Disconnected from server");
});