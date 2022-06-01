import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PassengerMsg } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { PassengerDto } from './dto/passenger.dto';

@ApiTags('Passengers')
@Controller('v2/passenger')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyPassenger = this.clientProxy.clientProxyPassenger();

  @Post()
  create(@Body() passengerDto: PassengerDto): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMsg.CREATE, passengerDto);
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this._clientProxyPassenger.send(PassengerMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passengerDto: PassengerDto,
  ): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMsg.UPDATE, {
      id,
      passengerDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyPassenger.send(PassengerMsg.DELETE, id);
  }
}
