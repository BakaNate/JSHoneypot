import express from 'express';
import bodyParser from 'body-parser';
import  { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './resolver';

const app = express();

const port = 3000;
app.use(function (req, res, next) {
    console.log('Time: %d', Date.now())
    console.log(req);
    next()
  });
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));
app.listen(port, () => console.log(`Server on ${port}`));