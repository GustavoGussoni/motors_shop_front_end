import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../Input';
import { LoginSchema, iLogin } from './loginSchema';
import { Button } from '../../Button';
import { AuthContext } from '../../../Contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormLogin = () => {
    const navigate = useNavigate()
  const { userLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLogin>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });

  const submit: SubmitHandler<iLogin> = (data) => {
    userLogin(data);
  };

  const navigateRegister = () => {
   navigate('/register');
  };
  return (
    <form className="flex flex-col gap-y-6 " onSubmit={handleSubmit(submit)}>
      <Input
        id="email"
        label="Email"
        type="text"
        placeholder="Digitar email"
        register={register('email')}
        disabled={false}
      />
      {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      <Input
        id="password"
        label="Senha"
        type="password"
        placeholder="Digitar senha"
        register={register('password')}
        disabled={false}
      />
      {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      <span className="text-grey-2 font-medium text-[14px] flex justify-end">Esqueci minha senha</span>
      <Button variant="brand1" size="big" text="Entrar" type="submit" className="self-center max-w-[315px] w-full" />
      <span className="text-grey-2 font-normal text-[14px] flex justify-center">Ainda não possui conta?</span>
      <Button
        variant="light"
        size="big"
        text="Cadastrar"
        type="button"
        className="self-center max-w-[315px] w-full"
        onClick={navigateRegister}
      />
    </form>
  );
};
