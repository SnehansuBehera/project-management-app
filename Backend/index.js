import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './Schema/schema.js'
import dbConnect from './config/db.js';

dotenv.config();
dbConnect();


const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server listening on port: ${port}`));