import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserMsg } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyUser = this.clientProxy.clientProxyUser();

  @Post()
  create(@Body() userDto: UserDto): Observable<IUser> {
    Logger.log('create-user');
    return this._clientProxyUser.send(UserMsg.CREATE, userDto);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    Logger.log('find-all-user');
    return this._clientProxyUser.send(UserMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    Logger.log('find-one-user');
    return this._clientProxyUser.send(UserMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
    Logger.log('update-user');
    return this._clientProxyUser.send(UserMsg.UPDATE, { id, userDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    Logger.log('delete-user');
    return this._clientProxyUser.send(UserMsg.DELETE, id);
  }
}
