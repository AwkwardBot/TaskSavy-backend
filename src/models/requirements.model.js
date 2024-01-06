const mongoose = require('mongoose');

const RequirementsSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    module_name: {
        type: String
        
    },
    requirements : [
        {
            requirement_id: {
                type: String
            },
            requirement: {
                type: String,

            },
            class: {
                type: String,
            
            },
            type: {
                type: String,
                enum: ['functional', 'non-functional']

            }
        }
    ]
})



RequirementsSchema.pre('save', async function (next) {
    if (this.isNew) {
      if(!this.requirements){
        this.requirements=[]
      }
    }
  
    next();
  });


/**
 * @typedef Requirements
 */
const Requirements = mongoose.model('Requirements', RequirementsSchema);

module.exports = Requirements;
