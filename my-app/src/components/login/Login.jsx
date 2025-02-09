import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import BtnReg from '../BtnReg/BtnReg'
import Input from '../Input/Input'


const Login = ({ setActive }) => {
    const [login, setLogin] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [placeholderLogin, setPlaceholderogin] = useState('')
    const [placeholderPassword, setPlaceholderPassword] = useState('')

    function handleChange(event) {
        if (event.target.id === "login")
            setLogin(event.target.value)
        else if (event.target.id === "pass1")
            setPassword1(event.target.value)
        else if (event.target.id === "pass2")
            setPassword2(event.target.value)
    }

    function auth() {
        if (login === '') {
            setPlaceholderogin('Введите логин')
        }
        if (password1 === '') {
            setPlaceholderPassword('Введите пароль')
        }
        if (password1 !== password2) {
            setPlaceholderPassword('Пароли не совпадают')
            return;
        }
        const struct = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "login": login,
            "password": password1,
            "email": "string",
            "firstName": "string",
            "lastName": "string",
            "middleName": "string",
            "phoneNumber": "string"
        }

        console.log(struct)

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
                    window.location.reload(true);
                }
                else {
                    setPlaceholderogin("Неправильный логин или пароль!");
                    setPassword1('')
                }
                console.log(data);

            })
            .catch((error) => console.log(error));

    }



    return (
        <div className={styles.container} onClick={() => setActive('none')}>
            <div className={styles.login_container} onClick={e => e.stopPropagation()}>
                <h1 className={styles.login_title}>Вход в профиль</h1>
                <div className={styles.login_input}>
                    {placeholderLogin !== '' && <p className={styles.err}>{placeholderLogin}</p>}
                    <Input type="text" id="login" placeholder='Логин' onChange={handleChange} value={login} />
                </div>
                <div className={styles.login_input}>
                    {placeholderPassword !== '' && <p className={styles.err}>{placeholderPassword}</p>}
                    <Input type="password" id="pass1" placeholder='Пароль' onChange={handleChange} value={password1} />
                </div>
                <Input type="password" value={password2} id="pass2" placeholder={'Повторите пароль'} onChange={handleChange} />

                {/* <Link className={styles.loginlink}>Не помню пароль</Link> */}
                <div className={styles.btn_login_container}>
                    <BtnReg onClick={auth}>Войти</BtnReg>
                    <BtnReg style={{ color: "#666" }} onClick={() => setActive('reg')}>Регистрация</BtnReg>
                </div>
            </div>
        </div>
    )
}

export default Login