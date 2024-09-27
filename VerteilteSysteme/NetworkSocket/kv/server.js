const net = require("net");

// Create a central data structure to store key-value pairs
const dataStore = {};

// Create a new server
const server = net.createServer();

// Log errors
server.on("error", (err) => {
  console.error(err);
});

// Handle new connections from clients
server.on("connection", (client) => {
  console.log("Client connected:", client.remoteAddress);

  // Handle each line of data coming in
  client.on("data", (data) => {
    try {
      // Parse the incoming JSON message
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);

      // Process the message based on the action
      if (message.action === "set") {
        // Set the value in the data store
        dataStore[message.key] = message.value;
        console.log("Value set for key", message.key);
        // Send back a status message
        client.write(JSON.stringify({ status: "ok" }) + "\n");
      } else if (message.action === "get") {
        // Get the value from the data store
        const value = dataStore[message.key] || null;
        // Send back the value
        client.write(JSON.stringify({ value: value }) + "\n");
      } else {
        // Invalid action
        client.write(JSON.stringify({ error: "Invalid action" }) + "\n");
      }
    } catch (e) {
      console.log("Error parsing message:", e.message);
      // Send back an error message
      client.write(JSON.stringify({ error: "Invalid message" }) + "\n");
    }
  });

  // Handle client disconnection
  client.on("end", () => {
    console.log("Client disconnected:", client.remoteAddress);
  });
});

// Listen on port 3333
server.listen({ host: "0.0.0.0", port: 3333 }, () => {
  console.log("Server is listening on 0.0.0.0:3333");
});
