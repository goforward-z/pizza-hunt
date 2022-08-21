const { Schema, model, Types, trusted } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



const ReplySchema = new Schema (
    {
        //set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'You need to write a reply!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'You need to leave a name!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema (
    {
    writtenBy: {
        type: String,
        required:'You need to provide a name!',
        trim: true
    },
    commentBody: {
        type: String,
        required: 'Please leave a comment!',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal) 
    },
    replies: [ReplySchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id:false
}
);

//get total count of reply and repies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});


const Comment = model('Comment', CommentSchema);

module.exports = Comment;