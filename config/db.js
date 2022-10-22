const mongoose = require("mongoose");
var _db;

module.exports = {
  connect() {
    try {
      mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      _db = mongoose.connection;
      _db.on("error", (error) => console.log(error));
      _db.on("open", () => console.log("Connected to staging Database."));
    } catch (error) {
      console.log(error);
    }
  },

  getDb() {
    return _db;
  },
};
