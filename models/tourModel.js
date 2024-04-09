import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour must have less or equals to 40 characters'],
    minlength: [40, 'A tour must have less or equals to 40 characters'],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be grater or equals to 1.0'],
    max: [5, 'Rating must be less or equals to 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discounted price should be below regular price',
    },
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  image: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  startDate: [Date],
  secrectTour: {
    type: Boolean,
    default: false,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
