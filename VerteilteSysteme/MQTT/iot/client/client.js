const repl = require("node:repl");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://mosquitto");

let username = process.argv[2]; // Get username from command line arguments
let currentRoom = "general";

// Print connected message
client.on("connect", () => {
  console.log(`Connected to MQTT broker as ${username}`);
  joinRoom(currentRoom);
});

// Print error message
client.on("error", (err) => {
  console.error(err);
});

// Called when message is received
client.on("message", function (topic, message) {
  const [sender, room] = topic.split('/');
  console.log(`${sender}@${room}: ${message.toString()}`);
});

// Function to join a room
const joinRoom = (roomName) => {
  currentRoom = roomName;
  client.subscribe(`${username}/${roomName}`);
  client.publish(`${username}/${roomName}`, `${username} has joined the room`);
};

// Function to send a message to a room
const say = (message, roomName) => {
  const targetRoom = roomName || currentRoom;
  client.publish(`${username}/${targetRoom}`, message);
};

// Start accepting user input
const r = repl.start("> ");
r.context.client = client;
r.context.say = say;

// Automatically join the 'general' room upon connection
joinRoom("general");