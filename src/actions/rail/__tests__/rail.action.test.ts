import axios from 'axios';
import { fetchRailIncidents, fetchRealTimeRailPredictions } from '..';
import {
  mockedRailIncidentResponse,
  mockedRealTimeRailPredictionsResponse,
} from './mockData';

jest.mock('axios');

describe('Rail Actions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('can fetch rail incidents', async () => {
    const mockFetchRailIncidents = fetchRailIncidents as jest.MockedFunction<
      typeof fetchRailIncidents
    >;
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(mockedRailIncidentResponse)
    );

    mockFetchRailIncidents().then((res) => {
      expect(res).toEqual(mockedRailIncidentResponse.data.Incidents);
    });
  });

  it('can fetch realtime rail predictions', async () => {
    const mockFetchRealTimeRailPredictions =
      fetchRealTimeRailPredictions as jest.MockedFunction<
        typeof fetchRealTimeRailPredictions
      >;
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(mockedRealTimeRailPredictionsResponse)
    );

    mockFetchRealTimeRailPredictions().then((res) => {
      expect(res).toEqual(mockedRealTimeRailPredictionsResponse.data.Trains);
    });
  });
});
