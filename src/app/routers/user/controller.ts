import * as Service from './service';
import {RequestHandler} from 'express';

export const readUsers: RequestHandler = (req, res)=>{
  
  const limit = Number(req.param('limit', 10));
  if (Number.isNaN(limit)) {
    // ERROR: invalid parameters
    return res.status(400).json({error: 'Invalid limit type'});
  }

  Service.selectUsers({
    offset: 0,
    limit
  })
  .then(users=>{
    res.status(200);
    res.json(users);
  })
  .catch(error=>{
    res.status(500);
    res.json({error});
  })
}

export const readUser: RequestHandler = (req, res)=>{
  const id = req.param('id');
  
  if (id === null || id === undefined || id.trim()==='') {
    // ERROR: invalid parameters
    return res.status(400).json({error: 'Invalid id type'});
  }
  
  Service.selectUser({id})
  .then(user=>{
    if (!user) {
      // ERROR: not exist
      return res.status(404).json({error: 'There is no user'});
    }

    res.status(200);
    res.json(user);
  })
  .catch(error=>{
    res.status(500);
    res.json({error});
  })
}

// export const createUser = (req, res)=>{
//   const {name} = req.body;
  
//   if (!name) {
//     // ERROR: invalid parameters
//     return res.status(400).json({error: 'Users need a name'});
//   }

//   Service.selectUser({name})
//   .then(user=>{
//     if (user) {
//       // ERROR: not exist
//       return res.status(409).json({error: 'Already exsit'});
//     }

//     return Service.createUser({name});
//   })
//   .then(id=>{
//     res.status(201).json({data: id})
//   })
//   .catch(error=>{
//     res.status(500);
//     res.json({error});
//   })
// }

// export const updateUser = (req, res)=>{
//   const id = parseInt(req.params.id, 10);
//   const {name} = req.body;

//   if (isNaN(id)) {
//     // ERROR: invalid parameters
//     return res.status(400).json({error: 'Invalid id type'});
//   }

//   if (!name || name.trim()==='') {
//     // ERROR: invalid parameters
//     return res.status(400).json({error: 'Users need a name'});
//   }

//   const index = USERS.findIndex(user=>user.id === id);
//   if (index < 0) {
//     // ERROR: not exist
//     return res.status(404).json({error: 'There is no user'});
//   }

//   if (USERS.find(user => user.id !== id && user.name === name)) {
//     // ERROR: name conflict
//     return res.status(409).json({error: 'name conflict'});
//   }

//   USERS[index].name = name;
//   res.status(200).json();
// }

// export const deleteUser = (req, res)=>{
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) {
//     // ERROR: invalid parameters
//     return res.status(400).json({error: 'Invalid id type'});
//   }
  
//   const index = USERS.findIndex(user=>user.id===id);
//   if (index < 0) {
//     // ERROR: not exist
//     return res.status(404).json({error: 'There is no user'});
//   }

//   USERS[index] = Object.assign({deleted: true}, USERS[index]);
  
//   res.status(204).json();
// }