import axios, { AxiosResponse } from 'axios';
import { RailIncidentResponse } from '../../types/rail.types'; 

const fetchRailIncidents = (): Promise<AxiosResponse<RailIncidentResponse>> =>
  axios
    .get(`${process.env.WMATA_API_HOST}Incidents.svc/json/Incidents`, {
      headers: {
        api_key: process.env.WMATA_API_KEY as string,
      },
    })
    .then((res) => res.data.Incidents);

export default fetchRailIncidents;
