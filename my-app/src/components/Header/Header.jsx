import React, { useState } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import BtnReg from '../BtnReg/BtnReg'
import Login from '../login/Login'
import Registration from '../registration/Registration'

const Header = () => {
    const [mode, setMode] = useState('none')

    const navigate = useNavigate();

    function logout() {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        navigate('/')
    }

    function adm() {
        navigate('/admin')
    }

    function busket() {
        navigate('/busket')
    }


    // useEffect(()=> {
    //     if (sessionStorage.getItem('username') !== null) {
    //         setMode
    //     }
    //     if(sessionStorage.getItem('username') === 'admin')
    //         navigate('/admin')
    // },[])


    return (
        <div className={styles.header_container}>
            <div className={styles.logo_container}>
                <Link className={styles.nav_buttons_a} to='/'>
                    <img src="https://img.cataloxy.ru/fl/aa/2a/86394.gif" alt="Логотип" className={styles.logo_image} />
                </Link>
            </div>
            <div className={styles.header_content}>
                <h1 className={styles.header_content_h1}>Столичная</h1>
                {/* style="color: blue; margin: 0;padding-left: 35px;" */}
                <h2 className={styles.header_content_p}>Добро пожаловать на наш сайт</h2>
                {/* style="margin: 5px 0; border-color: gray;" */}
                <hr className={styles.header_content_hr} />
                <nav className={styles.nav_buttons}>
                    <Link className={styles.nav_buttons_a} to='/'>Каталог</Link>
                    <Link className={styles.nav_buttons_a} to='/about_us'>О нас</Link>
                    <Link className={styles.nav_buttons_a} to='/contacts'>Контакты</Link>
                </nav>
            </div>
            <div className={styles.btn_container}>
                {sessionStorage.getItem('username') === null && <BtnReg onClick={() => setMode('login')}>Войти</BtnReg>}
                {sessionStorage.getItem('username') !== null &&
                    <p className={styles.user}>Здравствуйте, {sessionStorage.getItem('username')}</p>}
                {sessionStorage.getItem('username') !== null &&
                    <BtnReg onClick={logout}>Выйти</BtnReg>}
                {sessionStorage.getItem('username') !== null &&
                    <BtnReg onClick={busket}>Корзина</BtnReg>}

                {sessionStorage.getItem('username') === 'admin' && <BtnReg onClick={adm}>Админ панель</BtnReg>}
            </div>
            {mode === 'login' && <Login setActive={(e) => setMode(e)} />}
            {mode === 'reg' && <Registration setActive={(e) => setMode(e)} />}
        </div>
    )
}

export default Header