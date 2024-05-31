const express = require('express');
const http = require('http');
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado id: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('messageFromClient', (msg) => {
        console.log('Mensaje recibido del cliente:', msg);
        io.emit('messageFromServer', { data: msg });
    });
});

server.listen(3001, () => {
    console.log("SERVIDOR CORRIENDO EN PUERTO 3001");
  });

  