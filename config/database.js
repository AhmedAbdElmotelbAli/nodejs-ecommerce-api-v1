const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_connect)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    // .catch((err) => {
    //   console.error(`Database Error: ${err}`);
    //   process.exit(1);
    // });
};

module.exports = dbConnection;