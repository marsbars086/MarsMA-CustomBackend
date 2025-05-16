// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const familySchema = new Schema({
    last_name: {
      type: String,
      required: true,
      unique:true
    },
    culture: String,
    members: [{
          type: Schema.Types.ObjectId,
          ref: 'Person'
    }]
  });


module.exports = mongoose.model("Family", familySchema );
