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
import { FlightDto } from './dto/flight.dto';

@ApiTags('Flights')
@Controller('v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyFlight = this.clientProxy.clientProxyFlight();
  private _clientProxyPassenger = this.clientProxy.clientProxyPassenger();

  @Post()
  create(@Body() flightDto: FlightDto): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMsg.CREATE, flightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlight.send(FlightMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDto: FlightDto,
  ): Observable<IFlight> {
    FlightMsg;
    return this._clientProxyFlight.send(FlightMsg.UPDATE, {
      id,
      flightDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlight.send(FlightMsg.DELETE, id);
  }

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
