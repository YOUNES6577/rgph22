require('dotenv').config();
const { MongoClient,ServerApiVersion } = require("mongodb");
const connectionString = process.env.MNGD_CONN;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  serverApi: ServerApiVersion.v1
});

module.exports = {
  connectToServer: async function (callback) {
    console.time('DB_CONNECT_TIME')
    try {
      await client.connect(function (err, db) {
        if (err || !db)
          callback(err, undefined)
        else
          callback(undefined, db)
      });
    }
    catch (error) { console.error(error) }
    finally { console.timeEnd('DB_CONNECT_TIME') }
  },
  getDb: client.db(process.env.DB),
  close: ()=>client.close
};