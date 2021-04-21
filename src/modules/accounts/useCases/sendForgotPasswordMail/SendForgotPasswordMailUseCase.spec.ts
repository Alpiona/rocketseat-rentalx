import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import DayjsDateProvider from '@shared/providers/implementations/DayjsDateProvider';
import MailProviderInMemory from '@shared/providers/in-memory/MailProviderInMemory';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'user@test.com',
      name: 'User Test',
      password: '123321',
    });

    await sendForgotPasswordMailUseCase.execute('user@test.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if email is invalid', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('wrong@email.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an user token', async () => {
    const generateUserToken = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'user@test.com',
      name: 'User Test',
      password: '123321',
    });

    await sendForgotPasswordMailUseCase.execute('user@test.com');

    expect(generateUserToken).toBeCalled();
  });
});
