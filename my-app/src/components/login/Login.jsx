import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link , useNavigate} from 'react-router-dom'
import BtnReg from '../BtnReg/BtnReg'
import Input from '../Input/Input'


function setToken(str) {
    localStorage.setItem("token", str);
}

function setLogin(str) {

}

function getToken() {
    return localStorage.getItem("token");
}

export { getToken, setToken };

const Login = ({ setActive }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [placeholderLogin, setPlaceholderogin] = useState('')
    const [placeholderPassword, setPlaceholderPassword] = useState('')

    function handleChange(event) {
        if (event.target.id === "login")
            setLogin(event.target.value)
        else if (event.target.id === "pass")
            setPassword(event.target.value)
    }

    function auth() {
        // console.log(login)
        // console.log(password)
        if (login === '') {
            setPlaceholderogin('Введите логин')
        }
        if (password === '') {
            setPlaceholderPassword('Введите пароль')
        }
        const struct = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "login": login,
            "password": password,
            "email": "string"
        }

        fetch("http://localhost:5099/User/login", {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struct)
        }).then((response) => response.json())
            .then((data) => {
                if (data['token']) {
                    sessionStorage.setItem("token", data['token']);
                    sessionStorage.setItem("username", data['username']);
                    setActive('none')
                    window.location.reload( true ) ;
                }
                else {
                    setPlaceholderogin("Неправильный логин или пароль!");
                    setPassword('')
                }
                console.log(data);
                
            })
            .catch((error) => console.log(error));

    }



    return (
        <div className={styles.container} onClick={() => setActive('none')}>
            <div className={styles.login_container} onClick={e => e.stopPropagation()}>
                <h1 className={styles.login_title}>Вход в профиль</h1>
                <div>
                    {placeholderLogin !== '' && <p className={styles.err}>{placeholderLogin}</p>}
                    <Input type="text" id="login" placeholder='Логин' onChange={handleChange} value={login} />
                </div>
                <div>
                    {placeholderPassword !== '' && <p className={styles.err}>{placeholderPassword}</p>}
                    <Input type="password" id="pass" placeholder='Пароль' onChange={handleChange} value={password} />
                </div>

                <Link className={styles.loginlink}>Не помню пароль</Link>
                <div className={styles.btn_login_container}>
                    <BtnReg onClick={auth}>Войти</BtnReg>
                    <BtnReg style={{ color: "#666" }} onClick={() => setActive('reg')}>Регистрация</BtnReg>
                </div>
            </div>
        </div>
    )
}

export default Login