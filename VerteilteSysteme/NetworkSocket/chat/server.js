const net = require("net");
const readline = require("readline");

// Create an array to store connected clients
let clients = [];

// Create a new server
const server = net.createServer();

// Log errors
server.on("error", (err) => {
  console.error(err);
});

// Handle new connections from clients
server.on("connection", (client) => {
  console.log("Client connected:", client.remoteAddress);

  // Add the client to the list of connected clients
  clients.push(client);

  // Create an interface to read lines of data from the client
  let rl = readline.createInterface(client, client);

  // Handle each line of data coming in
  rl.on("line", (data) => {
    try {
      // Parse the incoming JSON message
      let message = JSON.parse(data);
      console.log(message);

      // Broadcast the message to all other clients
      clients.forEach((c) => {
        if (c !== client) {
          c.write(JSON.stringify(message) + "\n");
        }
      });
    } catch (e) {
      console.log("Invalid message encoding");
    }
  });

  // Handle client disconnection
  client.on("end", () => {
    console.log("Client disconnected:", client.remoteAddress);

    // Remove the client from the list of connected clients
    clients = clients.filter((c) => c !== client);
  });
});

// Listen on port 3333
server.listen({ host: "0.0.0.0", port: 3333 }, () => {
  console.log("Server is listening on 0.0.0.0:3333");
});