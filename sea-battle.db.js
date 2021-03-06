const MongoClient = require('mongodb').MongoClient;

function SeaBattleDB () {
   this.dbName = 'sea_battle';
   this.connection = null;
   const url = `mongodb://localhost:27017/${this.dbName}`;
   this.client = new MongoClient(url, { useNewUrlParser: true });

   this.init = async function () {
      await this.createConnection();
   };

   this.createConnection = async () => {
      await this.client.connect();
      this.connection = this.client.db(this.dbName);
   };

   this.shoot = async (x, y, sessionId) => {
      const res = await this.connection.collection('shots')
      .insertOne({ x: x, y: y, sessionTime: sessionId });
      return res;
   };

   this.read = async () => {
      return (await this.connection.collection('shots').find(null)).toArray();
   };

   this.readUsers = async () => {
      return (await this.connection.collection('users').find(null)).toArray();
   }

   this.clear = async () => {
      const res = await this.connection.collection('shots').deleteMany(null);
      return res;
   };

   this.newUser = async (userName, userArray) => {
      const res = await this.connection.collection('users')
      .insertOne({userName: userName, userArray: userArray});
      return res;
   };

   this.update = async (userName, userArray) => {
      const res = await this.connection.collection('users')
      .update({userName: userName}, {$set: {userArray: userArray}}, {upserts: false});
      return res;
   }

   this.close = () => {
      this.client.close();
   };
}

module.exports.gameModel = SeaBattleDB;
