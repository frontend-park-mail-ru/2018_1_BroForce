'use strict';

class WebSocket {
    constructor() {
        // this.socket = new WebSocket('ws://javascript.ru/ws');
        this.message = undefined;
        this.error = undefined;
    }

    Open() {
        // this.socket.onopen = () => {
        //     console.log('Connected successfully');
        // };
        // this.socket.onmessage = (event) => {
        //     this.message = event.data;
        // };
        // this.socket.onerror = (error) => {
        //     this.error = error.message
        // };
    }

    Send(data) {
        // this.socket.send(data);
    }

    Close() {
        // this.socket.onclose = (event) => {
        //     if (event.wasClean) {
        //         alert('Socked was closed');
        //     } else {
        //         alert('Connection lost');
        //     }
        //     alert('Code: ' + event.code + ' Reason: ' + event.reason);
        // };
    }

    GetMessage() {
        return JSON.parse(this.message);
    }

    GetError() {
        return this.error;
    }
}

const webSocket = new WebSocket();
export default webSocket;
