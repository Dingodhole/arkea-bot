import mongoose from 'mongoose'

import { reviewItemSchema } from './reviewItem'


const reviewItemModel = mongoose.model('reviewItem', reviewItemSchema);

export { reviewItemModel }
