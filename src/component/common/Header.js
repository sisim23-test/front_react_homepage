import './Header.css';
import { Link } from 'react-router-dom';

const Header = ( ) => {

    const onLogout = ( ) =>{
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('success');
        sessionStorage.removeItem('name');
        alert('로그아웃되었습니다.');
        document.location.href='/';
    }

    return (
        <header id='header'>
            <p>
                <Link to='/'>
                    <img src='/images/common/duke_swing.gif' alt='home'/>
                </Link>
            </p>
            <h1><font style={{size:30}}>스프링 홈페이지!</font></h1>
            <div>
                {console.log(sessionStorage.getItem('success'))}
                { sessionStorage.getItem('success')==='true'?
                    <Link to='/member/logout' onClick={onLogout} ><h3>{sessionStorage.getItem('name')}님! 로그아웃</h3></Link>
                    :
                    <Link to='/member/login/'><h3>로그인</h3></Link>
                }
            </div>
        </header>
    );
};

export default Header;