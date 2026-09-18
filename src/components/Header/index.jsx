import {
    Container,
    Content,
    HeaderLink,
    LinkContainer,
    Logout,
    Navigation,
    Options,
    Profile
} from "./styles";

import { UserCircleIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from 'react-router-dom';

import { useUser } from "../../hooks/UserContext";

export function Header() {
    const navigate = useNavigate();
    const { logout , userInfo } = useUser();
    const { pathname } = useResolvedPath();

    function logoutUser() {
        logout();

        navigate('/login');
    }
   ;
    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to='/' $isActive={pathname === '/'}>
                            Home
                        </HeaderLink>
                        <hr></hr>
                        <HeaderLink to='/cardapio' $isActive={pathname === '/cardapio'} >
                            Cardapio
                        </HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircleIcon color="#FFF" size={24} />
                        <div>
                            <p>Olá, <span>{userInfo?.name}</span></p>
                        </div>
                        <Logout onClick={logoutUser}>Sair</Logout>
                    </Profile>
                    <LinkContainer>
                        <ShoppingCartIcon color="#FFF" size={24} />
                        <HeaderLink to='/carrinho'>Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>

            </Content>
        </Container>
    );
}