import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser() {
    try {
      return await firstValueFrom(this.client.send('auth.register.user', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser() {
    try {
      return await firstValueFrom(this.client.send('auth.login.user', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify')
  async verifyUser() {
    try {
      return await firstValueFrom(this.client.send('auth.verify.user', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
