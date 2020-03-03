const express = require('express');
const path = require('path');
const jsonParser = express.json();
const fullPath = path.join(__dirname, '/Home.html');
const gameRedirect = path.join(__dirname, '/index.html');
const app = express();
const createSeaBattle = require('./client');
const create = require('./battleFieldCreator');
const SeaBattleDb = require('./sea-battle.db').gameModel;

let seaBattle = null;

app.get('/', function (request, response) {
  // seaBattle = createSeaBattle.createSeaBattle(create());
   response.sendFile(fullPath);
});

app.get('/shots', function (request, response) {
   (async function () {
      const db = new SeaBattleDb();
      await db.init();
      const shots = await db.read();
      db.close();

      await response.json(shots);
   })();
});

app.post('/submit', jsonParser, function (request, response) {
   if (!request.body) {
      return response.status(400);
   }
   const y = parseInt(request.body.Y);
   const x = parseInt(request.body.X);
   const userName = request.body.userName;
   const sessionId = request.body.sessionId;
   let resp;
   try {
      resp = seaBattle(y)(x);
   } catch (err) {
      console.log('Error in server ' + err.message);
      response.json(err.message);
   }
   (async function () {
      const db = new SeaBattleDb();
      await db.init();
      await db.shoot(request.body.X, request.body.Y, sessionId);
      await db.update(userName, resp.resultArray);
      db.close();
   })();
   
   //console.log(resp.resultArray);
   response.json(resp.result);
});

app.delete('/delete', function (request, response) {
   (async function () {
      const db = new SeaBattleDb();
      await db.init();
      await db.clear();
      db.close();
   })();
});

app.post('/authorize', jsonParser, function (request, response) {
   if (!request.body) {
      return response.status(400);
   }
   //const CurrentUserName = request.body.Name;       //ПОЛУЧАЕМ ИМЯ
   
   (async function () {
      let find = false;
      const db = new SeaBattleDb();
      await db.init();
      const users = await db.readUsers();
      for (i in users) {
         if (users[i].userName === request.body.Name){
            find = true;
         }     
      }
      db.close();  
      response.json(find); 
   })();  
});

app.post('/newGame', jsonParser, function(request, response) {
   if (!request.body) {
      return response.status(400);
   }
   seaBattle = createSeaBattle(create());
   (async function () {
      let needNew = true;
      const db = new SeaBattleDb();
      await db.init();
      const users = await db.readUsers();
      for (i in users) {
         if (users[i].userName === request.body.Name){
            needNew = false;
         } 
      }
      if (needNew) {
         await db.newUser(request.body.Name, null);
      } else {
         await db.update(request.body.Name, null);
      }
      db.close();
   })();
   response.json('/index');
});

app.post('/continueGame', jsonParser, function (request, response) {
   if(!request.body) {
      return response.status(400);
   }
   (async function () {
      const db = new SeaBattleDb();
      await db.init();
      const users = await db.readUsers();
      for (i in users) {
         if (users[i].userName === request.body.Name){
            seaBattle = createSeaBattle(users[i].userArray);
         }
      }
      db.close();  
      response.json('/index');      
   })();  
});

app.post('/drow', jsonParser, function (request, response) {
   if(!request.body) {
      return response.status(400);
   }
   (async function () {
      let currentArray = null;
      const db = new SeaBattleDb();
      await db.init();
      const users = await db.readUsers();
      for (i in users) {
         if (users[i].userName === request.body.Name){
            currentArray = users[i].userArray;
         }
      }
      db.close();
      response.json(currentArray);
   })();
});

app.get('/index', function (request, response) {   
   response.sendFile(gameRedirect);
 });

app.listen(3000);
