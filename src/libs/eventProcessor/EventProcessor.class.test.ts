import WS from 'jest-websocket-mock';
import { Error, Clients, Event } from '../../types/event.types';
import EventProcessor from './EventProcessor.class';

describe('EventProcessor', () => {
  let events: Event[] = [];
  let bool = false;
  let wss: WS,
    // Could not set it to the correct type defined in the class,
    // because WS clients are not typed as the same Client type I've defined
    clients: any = new Set(),
    client: WebSocket;
  const eventProcessor = new EventProcessor(events);

  beforeAll((done) => {
    wss = new WS('ws://localhost:1234');
    done();
  });

  afterAll((done) => {
    wss.close();
    client.close();
    eventProcessor.stop();
    eventProcessor.removeAllListeners();
    done();
  });

  it('has no clients', () => {
    expect(eventProcessor.getClients()).toStrictEqual(clients);
  });

  it('has clients', async () => {
    client = new WebSocket('ws://localhost:1234');
    await wss.connected;
    wss.server.clients().forEach((client) => clients.add(client));
    eventProcessor.setClients(clients);

    expect(wss.server.clients().length).toBe(1);
    expect(eventProcessor.getClients().size).toBe(1);
  });

  it('has a max of 1 listener', () => {
    const events: Event[] = [];
    const eventProcessor = new EventProcessor(events);

    expect(eventProcessor.getMaxListeners()).toEqual(1);
    expect(eventProcessor.eventNames()[0]).toEqual('error');
  });

  it('event action gets called', () => {
    events = [
      {
        name: 'Set bool',
        interval: 60 * 1000,
        action: () =>
          new Promise((resolve) => {
            bool = true;
            resolve(true);
          }),
      },
    ];
    eventProcessor.setEvents(events);

    expect(bool).toBeTruthy;
  });

  it('event processor has 3 events', () => {
    events = [
      {
        name: 'event one',
        interval: 60 * 1000,
        action: () => new Promise((resolve) => resolve(true)),
      },
      {
        name: 'event two',
        interval: 60 * 1000,
        action: () => new Promise((resolve) => resolve(true)),
      },
    ];
    eventProcessor.setEvents(events);

    expect(eventProcessor.getEvents().length).toBe(2);
    expect(eventProcessor.getMaxListeners()).toEqual(3);
    expect(eventProcessor.eventNames()).toEqual([
      'event one',
      'event two',
      'error',
    ]);
    eventProcessor.stop();
  });

  it('has 3 event listeners after start', () => {
    eventProcessor.start();
    expect(eventProcessor.eventNames().length).toEqual(3);
  });

  it('has 3 event listeners after restart', () => {
    eventProcessor.restart();
    expect(eventProcessor.eventNames().length).toEqual(3);
  });

  it('has zero event listeners after stop', () => {
    eventProcessor.stop();
    expect(eventProcessor.eventNames().length).toEqual(0);
  });

  it('throws an error', () => {
    events = [
      {
        name: 'error event',
        interval: 60 * 1000,
        action: () => new Promise((resolve, reject) => reject('error')),
      },
    ];
    eventProcessor.setEvents(events);
    eventProcessor.on('error', (error: Error) => {
      expect(error).toBeDefined;
      expect(error.err).toBe('error');
      expect(error.event).toBe('error event');
      expect(eventProcessor.getEvents().length).toBe(1);
    });
  });
});
