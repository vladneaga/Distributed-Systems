const net = require("net");
const readline = require("readline");

// Create a new connection to the server
const client = net.createConnection({
  host: "127.0.0.1",
  port: 3333,
});

// Log errors
client.on("error", (err) => {
  console.error(err);
});

// Handle new connections from clients
client.on("connect", () => {
  console.log("Client connected");

  // Create an interface to read lines of data from the client
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Function to send a set message to the server
  const set = (key, value) => {
    const message = {
      action: "set",
      key: key,
      value: value,
    };
    client.write(JSON.stringify(message) + "\n");
  };

  // Function to send a get message to the server
  const get = (key) => {
    const message = {
      action: "get",
      key: key,
    };
    client.write(JSON.stringify(message) + "\n");
  };

  // Listen for input from the user
  rl.on("line", (input) => {
    // Parse the input
    const parts = input.split(" ");
    const command = parts[0];
    const key = parts[1];
    const value = parts.slice(2).join(" ");

    // Process the command
    switch (command) {
      case "set":
        set(key, value);
        break;
      case "get":
        get(key);
        break;
      default:
        console.log("Invalid command. Use 'set' or 'get'.");
    }
  });
});

// Listen for data from the server
client.on("data", (data) => {
  // Print the received data
  console.log(data.toString());
});

// Handle disconnection
client.on("end", () => {
  console.log("Disconnected from server");
});

