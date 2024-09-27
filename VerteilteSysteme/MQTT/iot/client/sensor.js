const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://mosquitto");
let interval;
const sensorName = "mySensor"; 
let updateFrequency = 5000; // Default update frequency in milliseconds

// Function to publish random humidity values every specified interval
const publishHumidity = () => {
  const humidity = Math.floor(Math.random() * 101); // Random value between 0 and 100
  client.publish(sensorName, `${humidity}%`);
};

// Print connected message
client.on("connect", () => {
  console.log(`Connected to MQTT broker. Publishing humidity values for ${sensorName}`);
  // Publish humidity values at the specified update frequency
  interval = setInterval(publishHumidity, updateFrequency);
});

client.on("error", (err) => {
  console.error(err);
});

// Function to handle incoming configuration updates
const handleConfigurationUpdate = (newConfig) => {
  console.log(`Received new configuration: ${JSON.stringify(newConfig)}`);
  if (newConfig.updateFrequency) {
    updateFrequency = newConfig.updateFrequency;
    // Update the interval for publishing humidity values
    clearInterval(interval);
    interval = setInterval(publishHumidity, updateFrequency);
    console.log(`Update frequency changed to ${updateFrequency} milliseconds`);
  }
};

// Subscribe to the topic for receiving configuration updates
client.subscribe("sensor_frequency_channel");

// Handle incoming configuration updates
client.on("message", (topic, message) => {
  if (topic === "ssensor_frequency_channel") {
    const newConfig = JSON.parse(message);
    handleConfigurationUpdate(newConfig);
  }
});

// Export client for use in other modules
module.exports = client;