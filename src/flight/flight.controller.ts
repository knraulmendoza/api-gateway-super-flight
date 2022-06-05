import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom, Observable } from 'rxjs';
import { FlightMsg, PassengerMsg } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { BaseController } from 'src/core/base-controller';
import { FlightDto } from './dto/flight.dto';

@ApiTags('Flights')
@Controller('flight')
export class FlightController extends BaseController<FlightDto, IFlight> {
  constructor(private readonly _clientProxy: ClientProxySuperFlights) {
    super(_clientProxy.clientProxyFlight(), FlightMsg);
  }
  private _clientProxyFlight = this._clientProxy.clientProxyFlight();
  private _clientProxyPassenger = this._clientProxy.clientProxyPassenger();

  @Post(':fligthId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await firstValueFrom(
      this._clientProxyPassenger.send(PassengerMsg.FIND_ONE, flightId),
    );
    if (!passenger)
      throw new HttpException('Paasenger not found', HttpStatus.NOT_FOUND);
    return this._clientProxyFlight.send(FlightMsg.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
