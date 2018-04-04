import { reviewItemModel } from '../../database/models'

async function handleReq(req, res) {

  try {  
    // Create instance of the data
    const data = new reviewItemModel(Object.assign(req.body, {
      createdAt: Date.now()
    }))

    data.save(err => {
      if(err) {
        res.status(500).send({ msg: 'Error saving data!: ' + err})
        return
      }
      res.status(200).json(req.body)
    })

  } catch(msg) {
    console.log(msg)
    res.status(500).send(msg)
  }
}

export default handleReq
