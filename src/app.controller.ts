import { Controller, Get, Inject, Query } from "@nestjs/common";
import { AppService } from './app.service';
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class AppController {
  @Inject('USER_SERVICE')
  private userClient: ClientProxy

  constructor(private readonly appService: AppService) {}
  @Get('sum')
  cals(@Query('num') str) {
    const numArr = str.split(',').map(item => parseInt(item))


    this.userClient.emit('log','求和')
    return this.userClient.send('sum', numArr)
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
