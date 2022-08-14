import { RoomCollection } from '/imports/api/rooms/rooms.js';
import { Meteor } from 'meteor/meteor';
import './room.html'

Template.room.onCreated(function () {

    Meteor.subscribe('rooms');

    const ul = document.getElementById("myul");

    // RoomCollection.find({}).forEach(element => {
      
    //     console.log(element)
    //     const li = document.createElement('li');
    //     li.setAttribute('class','item');
    //     li.innerHTML = "abc";
    //     ul.appendChild(li);
    // });

});

Template.room.helpers({
    rooms() {
        return RoomCollection.find({});
    },
});

Template.room.events({
    'click button'(event, instance) {
        Meteor.call("createRoom");
    },
});