const mongoose = require('mongoose');

const routesSchema = new mongoose.Schema({
      start_point: {
        type: String, 
      },
      end_point: {
        type: String,
        
      },
      status: {
        type: Number,
        default:1 
      },
      createdAt: {
        type: Date,
        default: Date.now 
      }
});

const Routes_path = mongoose.model('Routes_path', routesSchema);
module.exports = Routes_path;