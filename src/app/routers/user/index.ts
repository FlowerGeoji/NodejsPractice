import express from 'express'
import * as Controller from './controller'

const router = express.Router();

router.get('/', Controller.readUsers);

router.get('/:id', Controller.readUser)

// router.post('/', Controller.createUser)

// router.put('/:id', Controller.updateUser)

// router.delete('/:id', Controller.deleteUser)

export default router