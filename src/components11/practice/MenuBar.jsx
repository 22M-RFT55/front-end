//1. 로그인시 로그아웃, 이메일 출력, 로그아웃시 로그인
//2. 로그아웃 기능
//3. pathname이 일치하는 경우 메뉴의 className='active'
//-------------------------------------------------------
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModalContext } from '../context/ModalContext';
import { onLog } from 'firebase/app';

const MenuBar = () => {
    const { setConfirm } = useContext(ModalContext);
    const navi = useNavigate();
    const email = sessionStorage.getItem('email');
    const { pathname } = useLocation();

    const onLogout = () => {
        if (window.confirm('You Want to Logout?')) {
            sessionStorage.clear();
            navi('/');
        }
    };

    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">REACT</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '500px' }} navbarScroll>
                        <Nav.Link className={pathname === '/book' && 'active'} href="/book">도서검색</Nav.Link>
                        <Nav.Link className={pathname === '/shop' && 'active'} href="/shop">상품검색</Nav.Link>
                        <Nav.Link className={pathname === '/post' && 'active'} href="/post">게시글</Nav.Link>
                        {email &&
                            <>
                                <Nav.Link className={pathname === '/cart' && 'active'} href="/cart">장바구니</Nav.Link>
                                <Nav.Link className={pathname === '/favorite' && 'active'} href="/favorite">즐겨찾기</Nav.Link>
                            </>
                        }
                    </Nav>
                    {email ?
                        <Nav>
                            <Nav.Link href="#" className='active'>{email}</Nav.Link>
                            <Nav.Link onClick={onLogout} href="#">로그아웃</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href="/login">로그인</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default MenuBar