export type RailPredictionResponse = RailPrediction[];

export type RailIncidentResponse = RailIncident[];

export type RailPrediction = {
  Car: string;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Group: string;
  Line: string;
  LocationCode: string;
  LocationName: string;
  Min: string;
};

export type RailIncident = {
  IncidentID: string;
  Description: string;
  IncidentType: string;
  LinesAffected: string;
  DateUpdated: string;
};

export const isRailPrediction = (obj: any): obj is RailPrediction => {
  return (
    'Car' in obj &&
    typeof obj.Car === 'string' &&
    'Destination' in obj &&
    typeof obj.Destination === 'string' &&
    'DestinationCode' in obj &&
    typeof obj.DestinationCode === 'string' &&
    'DestinationName' in obj &&
    typeof obj.DestinationName === 'string' &&
    'Group' in obj &&
    typeof obj.Group === 'string' &&
    'Line' in obj &&
    typeof obj.Line === 'string' &&
    'LocationCode' in obj &&
    typeof obj.LocationCode === 'string' &&
    'LocationName' in obj &&
    typeof obj.LocationName === 'string' &&
    'Min' in obj &&
    typeof obj.Min === 'string'
  );
};

export const isRailIncident = (obj: any): obj is RailIncident => {
  return (
    'IncidentID' in obj &&
    typeof obj.IncidentID === 'string' &&
    'Description' in obj &&
    typeof obj.Description === 'string' &&
    'IncidentType' in obj &&
    typeof obj.IncidentType === 'string' &&
    'LinesAffected' in obj &&
    typeof obj.LinesAffected === 'string' &&
    'DateUpdated' in obj &&
    typeof obj.DateUpdated === 'string'
  );
};
