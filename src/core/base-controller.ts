import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
// import { IGeneryRepository } from './genery-repository.abstract';
@ApiTags()
export class BaseController<T, I> {
  constructor(private clientProxy: ClientProxy, readonly messageRmq: any) {}
  getAll(): Observable<I[]> {
    throw new Error('Method not implemented.');
  }
  @Post()
  @ApiOperation({ summary: 'Create data' })
  create(@Body() entity: T): Observable<I> {
    return this.clientProxy.send(this.messageRmq.CREATE, entity);
  }

  @Get()
  findAll(): Observable<I[]> {
    return this.clientProxy.send(this.messageRmq.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<I> {
    return this.clientProxy.send(this.messageRmq.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passengerDto: T): Observable<I> {
    return this.clientProxy.send(this.messageRmq.UPDATE, {
      id,
      passengerDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientProxy.send(this.messageRmq.DELETE, id);
  }
}
