import { Meteor } from 'meteor/meteor';
import { RoomCollection } from '../rooms.js'


Meteor.publish("rooms", function () {
    return RoomCollection.find({});
});


Meteor.publish("room", function ({ _id }) {
    return RoomCollection.find({ _id });
})