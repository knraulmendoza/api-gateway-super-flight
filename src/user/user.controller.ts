import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMsg } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { BaseController } from 'src/core/base-controller';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController extends BaseController<UserDto, IUser> {
  constructor(clientProxy: ClientProxySuperFlights) {
    super(clientProxy.clientProxyUser(), UserMsg);
  }
}
