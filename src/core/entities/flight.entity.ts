import { Passenger } from './passenger.entity';

export class Flight {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: Passenger[];
}
