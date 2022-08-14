import 'dotenv/config';
import WebSocket from 'ws';
import { Clients } from './types/event.types';
import EventProcessor from './libs/eventProcessor/EventProcessor.class';
import railEvents from './events/rail.events';

let clients: Clients = new Set();
let railEventProcessor: EventProcessor;

const webSocketServer = new WebSocket.Server(
  {
    port: 7071,
    clientTracking: true,
  },
  () => {
    console.log(`Server Running here 👉 http://localhost:7071`);
    railEventProcessor = new EventProcessor(railEvents);

    webSocketServer.on('connection', (_webSocket) => {
      clients = webSocketServer.clients;
      railEventProcessor.setClients(clients);
    });

    webSocketServer.on('close', () => {
      clients = webSocketServer.clients;
      railEventProcessor.setClients(clients);
    });
  }
);
