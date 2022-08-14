const mockedRailIncidentResponse = {
  data: {
    Incidents: [
      {
        IncidentID: '6E037E72-0AE5-4484-B246-E68E8E46C3AE',
        Description:
          'Trains will not operate until you pay $100.',
        IncidentType: 'Alert',
        LinesAffected: 'GR; YL;',
        DateUpdated: '2022-05-02T04:48:00',
      },
      {
        IncidentID: '6E037E72-4W3E-4484-B246-E68E8E46C3AE',
        Description:
          'Trains will operate every 20 minutes w/6-car trains. Delays possible, plan additional travel time.',
        IncidentType: 'Delay',
        LinesAffected: 'SV; RD;',
        DateUpdated: '2022-05-02T04:48:00',
      },
      {
        IncidentID: '6E037E72-0AE5-4484-B246-E68E8Q21C3AE',
        Description:
          'Watch out! Trains will be exploding all day!',
        IncidentType: 'Watch Out',
        LinesAffected: 'PR; GR; OR; BL; RD;',
        DateUpdated: '2022-05-02T04:48:00',
      },
    ],
  },
};

const mockedRealTimeRailPredictionsResponse = {
  data: {
    Trains: [
      {
        Car: '6',
        Destination: 'Vienna',
        DestinationCode: 'K08',
        DestinationName: 'Vienna/Fairfax-GMU',
        Group: '2',
        Line: 'OR',
        LocationCode: 'D03',
        LocationName: "L'Enfant Plaza",
        Min: '5',
      },
    ],
  },
};

export { mockedRailIncidentResponse, mockedRealTimeRailPredictionsResponse };
