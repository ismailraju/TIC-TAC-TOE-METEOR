import "./game.css";
import React, { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useTracker } from "meteor/react-meteor-data";
import { RoomCollection } from "../api/rooms";


export const Slot = ({ id, room: { gameState, _id } }) => {

    const location = useLocation();
    const { color } = location.state;

    return (

        <div className="slot"
            onClick={() => {
                Meteor.call(
                    "makePlay",
                    { roomId: _id, playState: { color, play: id - 1 } },
                    (err => {
                        if (err && err.error === "invalid-play") {
                            alert("This move is invalid. You might need to wait for your turn!")
                        } else if (err) {
                            alert(err.message);
                        }
                    })
                );



            }}

        >

            {gameState[id - 1] === "cross" ? <img src={"/cross.png"} /> : ""}
            {gameState[id - 1] === "circle" ? <img src={"/circle.png"} /> : ""}

        </div>


    );


}

export const GameScreen = () => {

    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();
    const { color } = location.state;

    const roomLoading = useTracker(() => {
        const handle = Meteor.subscribe("room", { _id: id });
        return !handle.ready();
    }, [id]);

    const room = useTracker(() => RoomCollection.findOne({ _id: id }), [id]);

    useEffect(() => {
        if (room && room.winner) {
            alert(room.winner === color ? "You Won!" :(room.winner ==="draw"?"You Draw!!" :"You Lost!!"));
            history.push("/");
        }

        if (room.colorTurn === color) {
            console.log("Your turn");
            document.body.style.backgroundColor = "green";

        } else {
            document.body.style.backgroundColor = "red";
        }

    }, [room]);

    if (roomLoading) return "Loading...";



    return (
        <div className="game">
            <div className="line">
                <Slot id={1} room={room} />
                <Slot id={2} room={room} />
                <Slot id={3} room={room} />
            </div>
            <div className="line">
                <Slot id={4} room={room} />
                <Slot id={5} room={room} />
                <Slot id={6} room={room} />
            </div>
            <div className="line">
                <Slot id={7} room={room} />
                <Slot id={8} room={room} />
                <Slot id={9} room={room} />
            </div>

        </div>

    );



}