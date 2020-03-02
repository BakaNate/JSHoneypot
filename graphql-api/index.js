import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import  { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './resolver';

const app = express();

const port = 3000;
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  console.log(req);
  var log_attack = "Attacker IP: " + req.headers['x-real-ip'] + "\n"
  log_attack += "Origin: " + req.headers['origin'] + "\n"
  log_attack += "User-Agen: " + req.headers['user-agent'] + "\n"
  log_attack += "\n"
  fs.appendFile("all.log", log_attack, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  next()
});
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.listen(port, () => console.log(`Server on ${port}`));
