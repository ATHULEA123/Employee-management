const mongose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongose.connect(process.env.CONNECTION_STRING);
    console.log(` database is connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
