import express from 'express'
import * as Controller from './controller'

const router = express.Router();

router.get('/', Controller.getAboutPage);

export default router