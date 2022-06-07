import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { UserMsg } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clienProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}
  private _clientProxyUser = this.clienProxy.clientProxyUser();
  async validateUser(username: string, password: string): Promise<any> {
    const user = await firstValueFrom(
      this._clientProxyUser.send(UserMsg.VALIDATE_USER, { username, password }),
    );
    if (user) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    console.log(payload);

    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(userDto: UserDto) {
    return this._clientProxyUser.send(UserMsg.CREATE, userDto);
  }
}
