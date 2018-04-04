export function getTopTen(Model, type) {
  if(Model) {
    return Model.find({ type }).sort('-time').limit(10).exec()
  } else {
    throw "Incorrect params"
  }
}

export function getById(Model, id) {
  if(Model) {
    return Model.find({ _id: id }).sort('-time').limit(1).exec()
  } else {
    throw "Incorrect params"
  }
}
