import EventEmitter from 'events';
import { Clients, Event } from '../../types/event.types';

/**
 * @Class
 * Event Processor is used to process user-defined events and emit socket-io events.
 */
class EventProcessor extends EventEmitter {
  private events: Event[];
  private clients: Clients;
  /**
   * @param {Event[]} events User-defined events
   */
  constructor(events: Event[]) {
    super();
    this.events = events;
    this.clients = new Set();

    this.setupEventReceivers = this.setupEventReceivers.bind(this);
    this.processEvent = this.processEvent.bind(this);

    this.processEvents();
  }

  private processEvents(): void {
    this.setupEventReceivers();
    this.events.forEach(this.processEvent);
  }

  private processEvent(event: Event): void {
    event
      .action()
      .then((data: any) => {
        super.emit(event.name, data);
        setTimeout(() => this.processEvent(event), event.interval);
      })
      .catch((err) => this.emit('error', { event: event.name, err }));
  }

  private setupEventReceivers(): void {
    this.setMaxListeners(this.events.length + 1);

    this.events.forEach((event) => {
      super.on(event.name, (data: any) => this.emitEvent(event.name, data));
    });

    super.on('error', (error: Error) => {
      // TODO: implement Logger
      this.emitEvent('error', error);
    });
  }

  private emitEvent(name: string, data: any) {
    this.clients.forEach((client) =>
      client.send(JSON.stringify({ eventName: name, data }))
    );
  }

  setEvents(events: Event[]): void {
    this.events = events;
    this.restart();
  }

  setClients(clients: Clients): void {
    this.clients = clients;
  }

  getClients(): Clients {
    return this.clients;
  }

  getEvents(): Event[] {
    return this.events;
  }

  start(): void {
    if (super.eventNames().length === 0) this.processEvents();
  }

  stop(): void {
    super.removeAllListeners();
  }

  restart(): void {
    super.removeAllListeners();
    this.processEvents();
  }
}

export default EventProcessor;
