import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../hooks/UserContext';

import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from "./styles";
import Logo from '../../assets/logo.svg';
import { Button } from "../../components/Button";



export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um email valido')
        .required('O email é obrigatório'),
      password: yup
        .string()
        .min(6, 'Deve ter pelo menos 6 caracteres')
        .required('Digite uma senha'),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  
  const onSubmit = async (data) => {
    const { data: userData,
    } = await toast.promise(
      api.post('/session', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Verificando seus dados',
        success: {
          render() {
            setTimeout(() => {
              if (userData?.admin) {
                navigate('/admin/pedidos')
              } else {
                navigate('/');
              }
            }, 2000);
            return 'Seja Bem-Vindo(a)!  '
          },
        },
        error: 'Email ou senha invalida',
      },
    );
    putUserData(userData);

  }


  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-dev" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá , seja bem vindo ao <span>DevBurguer!</span>
          <br />
          Accesse com seu <span> Login e Senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label> Email </label>
            <input type="email" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label> Senha </label>
            <input type="password" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique Aqui!</Link>
        </p>
      </RightContainer>
    </Container>
  )
}