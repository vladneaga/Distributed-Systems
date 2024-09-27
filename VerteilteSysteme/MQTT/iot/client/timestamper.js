const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://mosquitto");

// Print connected message
client.on("connect", () => {
  console.log("Connected to MQTT broker. Listening for sensor messages...");
});

// Function to add timestamp to message and republish it
const addTimestampAndRepublish = (topic, message) => {
  const parsedMessage = JSON.parse(message);
  const timestampedMessage = {
    humidity: parsedMessage.humidity,
    timestamp: new Date().toISOString()
  };
  client.publish("timestamped_messages", JSON.stringify(timestampedMessage));
};

// Listen for sensor messages
client.subscribe("mySensor");
client.on("message", (topic, message) => {
  console.log(`Received sensor message: ${message}`);
  addTimestampAndRepublish(topic, message);
});
