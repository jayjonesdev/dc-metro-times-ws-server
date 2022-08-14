import {
  fetchRailIncidents,
  fetchRealTimeRailPredictions,
} from '../actions/rail';
import { Event } from '../types/event.types';

/**
 * WMATA allows 50k API calls per day and 10 calls per second.
 * Calls per day for each event.
 * realtime: 28,800
 * incidents: 1,440
 * Total calls: 30,240 which leaves 19,580 calls for one off realtime request updates
 */
const railEvents: Event[] = [
  {
    name: 'rail/realtime',
    interval: 3 * 1000,
    action: fetchRealTimeRailPredictions,
  },
  { name: 'rail/incidents', interval: 60 * 1000, action: fetchRailIncidents },
];

export default railEvents;
