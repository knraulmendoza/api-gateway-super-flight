import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FlightMsg, PassengerMsg } from 'src/common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { BaseController } from 'src/core/base-controller';
import { FlightDto } from './dto/flight.dto';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('flight')
export class FlightController extends BaseController<FlightDto, IFlight> {
  constructor(private readonly _clientProxy: ClientProxySuperFlights) {
    super(_clientProxy.clientProxyFlight(), FlightMsg);
  }
  private _clientProxyFlight = this._clientProxy.clientProxyFlight();
  private _clientProxyPassenger = this._clientProxy.clientProxyPassenger();

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await firstValueFrom(
      this._clientProxyPassenger.send(PassengerMsg.FIND_ONE, passengerId),
    );
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    return this._clientProxyFlight.send(FlightMsg.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
