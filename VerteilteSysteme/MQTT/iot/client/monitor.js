const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://mosquitto");

// Print connected message
client.on("connect", () => {
  console.log("Connected to MQTT broker. Listening for timestamped messages...");
});

// Listen for timestamped messages
client.subscribe("timestamped_messages");
client.on("message", (topic, message) => {
  console.log(`Received timestamped message: ${message}`);
});

// Export client for use in other modules
module.exports = client;