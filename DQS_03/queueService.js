const amqp = require("amqplib");

const QUEUE_NAME = "tasks_queue";

// async function connect() {
//   const connection = await amqp.connect(
//     process.env.RABBITMQ_URL || "amqp://localhost"
//   );
//   const channel = await connection.createChannel();
//   await channel.assertQueue(QUEUE_NAME);
//   return channel;
// }

exports.connect = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};

exports.publishTask = async (task) => {
  const channel = await exports.connect();
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(task)));
};
exports.QUEUE_NAME = QUEUE_NAME;
