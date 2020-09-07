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

// process.on('uncaughtException', function(e) {
//     console.log('An error has occured. error is: %s and stack trace is: %s', e, e.stack);
//     console.log("Process will restart now.");
//     process.exit(1);
// })

app.listen(3000, ()=>{
    console.log(`Express is running localhost:3000`);
    console.log(process.env.NODE_ENV);
});