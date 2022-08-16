import { RoomCollection } from "../imports/api/rooms";
import { Migrations } from 'meteor/percolate:migrations';


Migrations.add({

    version: 1,
    name: 'Add default Room',
    up() {

        RoomCollection.insert({
            createdAt: new Date(),
            capacity: 2,
            gameState: new Array(9).fill("empty"),
            colorTurn: "cross",
            winner: null
        });


        
    },
    down() {


    }

});