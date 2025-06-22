import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/sujeito")
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/teste")
  getTest() {
    return "rota de teste da apii"
  }
  @Get("/negocio")
  getnogocio() {
    return "elaias"
  }

  @Post("/teste")
  createTest(){
  return "eii cocota não  liga pra quem trás as nota"  
  }
}
