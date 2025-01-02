"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ws_1 = require("ws");
const app = express();
app.get("/", (req, res) => {
    res.send("Hello World");
});
const httpServer = app.listen(4000, () => {
    console.log("HTTP server listening on port 4000");
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on("connection", function connection(ws) {
    console.log("WebSocket client connected");
    ws.on("message", function message(data, isBinary) {
        console.log("Received message:", data);
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.on("close", () => {
        console.log("WebSocket client disconnected");
    });
    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
    // Send response back to the sender
    ws.send("Hello from server");
});
