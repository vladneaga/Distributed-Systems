const http = require('http');

// Define the data object
const data = {
  todos: [
    "Clean Bicycle",
    "Buy Milk"
  ],
  created: 1676459827754
};

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the content type to JSON
  res.setHeader('Content-Type', 'application/json');

  // Send the JSON-encoded data as the response
  res.end(JSON.stringify(data));
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});