import mongodb from "mongodb";
import { MONGODB_DB_NAME, MONGODB_URL } from "./config.js";

var DbConnection = function () {
  var db = null;
  // var instance = 0;
  var client;
  async function DbConnect() {
    try {
      client = await mongodb.MongoClient.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const _db = client.db(MONGODB_DB_NAME);
      return _db;
    } catch (e) {
      console.error("error: " + e);
      return e;
    }
  }

  async function get() {
    try {
      // this is just to count how many times our singleton is called.
      // instance++;
      // console.log(`DbConnection called ${instance} times`);

      if (db != null) {
        // console.log(`db connection is already alive`);
        return db;
      } else {
        // console.log(`getting new db connection`);
        db = await DbConnect();
        return db;
      }
    } catch (e) {
      return e;
    }
  }

  function close() {
    if (client) {
      client.close();
    }
  }

  return {
    get,
    close,
  };
};
export const connection = DbConnection();
