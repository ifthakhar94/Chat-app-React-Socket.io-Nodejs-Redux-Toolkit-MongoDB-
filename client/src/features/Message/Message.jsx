import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function Message() {
    const params = useParams();
    const socketConnection = useSelector((state) => state.user.socketConnection);

    useEffect(() => {
        if(socketConnection && params.userId){
            socketConnection.emit("messagePage", params.userId);
            socketConnection.on("messageUser", (data) => {
                console.log("messageUser", data);
            });
        }
    }, [socketConnection, params.userId]);

    return (
        <div>
            <h1>Message dd</h1>
        </div>
    )
}