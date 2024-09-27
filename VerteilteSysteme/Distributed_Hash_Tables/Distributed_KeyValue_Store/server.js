const http = require('http');
const url = require('url');
const crypto = require('crypto');

// Process command-line arguments to get the server ID
const serverId = process.argv[2];
if (!serverId) {
  console.error('Server ID is missing. Please provide a server ID as an argument.');
  process.exit(1);
}

// Calculate the port number based on the server ID
const port = 3000 + parseInt(serverId);

// Initialize array to store values
const array = [];

// Number of slots in the hash table
const slots = 100;

// Hash function using SHA-256
const hash = (key) => {
  return crypto
    .createHash('sha256')
    .update(key, 'utf8')
    .digest()
    .toString('hex');
};

// Calculate the slot (array index) for the key
const slot = (key) => {
  const hashedKey = hash(key);
  const position = parseInt(hashedKey, 16);
  const mappedSlot = position % slots;
  return mappedSlot;
};

// Set a value for a key in the hash table
const set = (key, value) => {
  console.log(`set ${key} -> ${value}`);
  array[slot(key)] = value;
};

// Get the value associated with a key from the hash table
const get = (key) => {
  console.log(`get ${key}`);
  return array[slot(key)];
};

// Create a local HTTP server to handle requests
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/get') {
    const { key } = query;
    const requestedSlot = slot(key);
    
    if (parseInt(serverId) === requestedSlot) {
      // If the current server has the requested key, respond with the value
      const value = get(key);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ value: value, origin: serverId }));
    } else {
      // If the current server doesn't have the requested key, redirect to the correct server
      const redirectUrl = `http://localhost:${3000 + requestedSlot}/get?${parsedUrl.query}`;
      res.writeHead(302, { 'Location': redirectUrl });
      res.end(`Redirect 302 to ${redirectUrl}`);
    }
  } else if (pathname === '/set') {
    const { key, value } = query;
    set(key, value);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success', origin: serverId }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});