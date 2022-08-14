import axios, { AxiosResponse } from 'axios';
import { RailPredictionResponse } from '../../types/rail.types';

const fetchRealTimeRailPredictions = (): Promise<
  AxiosResponse<RailPredictionResponse>
> =>
  axios
    .get(`${process.env.WMATA_API_HOST}StationPrediction.svc/json/GetPrediction/ALL`, {
      headers: {
        api_key: process.env.WMATA_API_KEY as string,
      },
    })
    .then((res) => res.data.Trains);

export default fetchRealTimeRailPredictions;
