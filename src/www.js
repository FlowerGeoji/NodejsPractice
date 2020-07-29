import app from './app';
// import {sequelize} from './app/models'

// const options = {
//   force: process.env.NODE_ENV === 'test' ? true : false,
//   alter: process.env.NODE_ENV === 'test' ? true : false,
// }

// sequelize.sync(options)
// .then(()=>{
//   console.log('Sync database!');
//   app.listen(3000, ()=>console.log(`Express is running localhost:3000`));
// }).catch(console.error)

app.listen(3000, ()=>console.log(`Express is running localhost:3000`));