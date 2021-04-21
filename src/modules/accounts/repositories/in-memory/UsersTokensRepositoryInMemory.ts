import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';

import IUsersTokensRepository from '../IUsersTokensRepository';

export default class UsersTokensRepositoryInMemory
  implements IUsersTokensRepository {
  usersTokens: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      ut => ut.user_id === user_id && ut.refresh_token === refresh_token,
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(userToken => userToken.id === id);

    this.usersTokens.splice(index);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      ut => ut.refresh_token === refresh_token,
    );

    return userToken;
  }
}
