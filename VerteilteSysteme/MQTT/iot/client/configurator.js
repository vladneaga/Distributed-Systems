const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://mosquitto");

// Print connected message
client.on("connect", () => {
  console.log("Connected to mqtt://mosquitto");

  // Subscribe to the topic for humidity values from the sensor
  subscribe("mySensor", () => {
    console.log("Subscribed to humidity values from the sensor");
  });

  // Subscribe to the topic for receiving frequency configuration updates
  subscribe("frequency_channel", (newFrequency) => {
    console.log(`Received new frequency: ${newFrequency}`);
    // Assuming the sensor listens to a specific topic for frequency updates
    publish("sensor_frequency_channel", newFrequency);
  });
});

// Print error message
client.on("error", (err) => {
  console.error(err);
});

// Called when message is received
client.on("message", function (topic, message) {
  console.log(`Received message for topic "${topic}"`);
  console.log(message.toString());
});

// Shortcut to subscribe to a topic
const subscribe = (topic, cb) => {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Error subscribing to topic "${topic}": ${err}`);
      return;
    }
    console.log(`Subscribed to topic "${topic}"`);
  });

  // Register callback for incoming messages on this topic
  client.on("message", (topic, message) => {
    cb(message.toString());
  });
};

// Shortcut to publish to a topic
const publish = (topic, message, options, cb) => {
  client.publish(topic, message, options, cb);
};

module.exports = {
  client,
  subscribe,
  publish
};