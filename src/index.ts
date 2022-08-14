import 'dotenv/config';
import WebSocket from 'ws';
import { Clients } from './types/event.types';
import EventProcessor from './libs/eventProcessor/EventProcessor.class';
import railEvents from './events/rail.events';

let clients: Clients = new Set();
let railEventProcessor: EventProcessor;
let PORT = process.env.PORT || 7071;

const init = (port: string | number) => {
  const webSocketServer = new WebSocket.Server(
    {
      port: typeof port === 'string' ? parseInt(port) : port,
      clientTracking: true,
    },
    () => {
      console.log(`Server Running here 👉 http://localhost:${PORT}`);
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

  return webSocketServer;
};

init(PORT);

export default init;
