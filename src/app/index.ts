import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path';

import UserRouter from './routers/user'

const app = express();

// middleware
if (process.env.NODE_ENV === 'test'){
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'html')));

// routers

app.use('/users', UserRouter);
app.use('/about', (req, res)=>{
  res.sendFile(path.join(__dirname, 'html', 'about.html'));
});
export default app;