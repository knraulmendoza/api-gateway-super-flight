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
import { PassengerMsg } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { BaseController } from 'src/core/base-controller';
import { PassengerDto } from './dto/passenger.dto';

@ApiTags('Passengers')
@Controller('passenger')
export class PassengerController extends BaseController<
  IPassenger,
  PassengerDto
> {
  constructor(clientProxy: ClientProxySuperFlights) {
    super(clientProxy.clientProxyPassenger(), PassengerMsg);
  }
}
