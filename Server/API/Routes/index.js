import express from 'express'

import handleReq from './post'

const router = express.Router({mergeParams: true})

router.post('/', (req, res) => handleReq(req, res))

export default router
