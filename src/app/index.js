import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import User from './routers/user'

const app = express();

// middleware
if (process.env.NODE_ENV === 'test'){
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routers
app.use('/users', User);
export default app;