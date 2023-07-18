const { Schema, model, Types } = require('mongoose');
var moment = require('moment')

// Reaction schema including modified date format using Moments
const reactionSchema = new Schema(

    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (fordate) => moment(fordate).format('MMM DD YYYY') + ' at '+moment(fordate).format('hh:mm A')
        }


    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }

);

//Thought schema including modified date format using Moments
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (fordate) => moment(fordate).format('MMM DD YYYY') + ' at '+moment(fordate).format('hh:mm A')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);

// export the Usermodel
module.exports = Thought;