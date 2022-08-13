const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); 


const PizzaSchema = new Schema(
    {
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    
    size: {
        type: String,
        default: 'large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}

);

//get total count of comments and repies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});



const Pizza = model('Pizza', PizzaSchema);
module.exports = Pizza;