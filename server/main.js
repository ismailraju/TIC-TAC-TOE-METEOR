import { Meteor } from 'meteor/meteor';
import "/imports/api/rooms";
import { RoomCollection } from "../imports/api/rooms";



Meteor.startup(() => {
});

Meteor.publish("rooms", function () {
  return RoomCollection.find({});
});
Meteor.publish("room", function ({ _id }) {
  return RoomCollection.find({ _id });
});
