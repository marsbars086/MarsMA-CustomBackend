// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const personSchema = new Schema({
    first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required:true,
      },
      // birth_date: {
      //   type: Date,
      //   required: true
      // },

      gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other'],
        default: 'other'
      },
      family:
        {
          type: Schema.Types.ObjectId,
          ref: 'Family'
        },
      age: {
        type:Number,
        required: true,
        min: 0,
      }
});


module.exports = mongoose.model("Person", personSchema );
