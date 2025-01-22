import React, { useState } from 'react'
import styles from '../login/Login.module.css'
import BtnReg from '../BtnReg/BtnReg'
import Input from '../Input/Input'

const Registration = ({ setActive }) => {
    const [login, setLogin] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [err, setErr] = useState(false)
    const [placeholderLogin, setPlaceholderogin] = useState('')
    const [placeholderPassword, setPlaceholderPassword] = useState('')

    function handleChange(event) {
        setErr(false)
        if (event.target.id === "login")
            setLogin(event.target.value)
        else if (event.target.id === "pass1")
            setPassword1(event.target.value)
        else if (event.target.id === "pass2")
            setPassword2(event.target.value)
        if (event.target.id === "email")
            setEmail(event.target.value)
        else if (event.target.id === "firstName")
            setFirstName(event.target.value)
        else if (event.target.id === "lastName")
            setLastName(event.target.value)
        if (event.target.id === "middleName")
            setMiddleName(event.target.value)
        else if (event.target.id === "phoneNumber")
            setPhoneNumber(event.target.value)
    }

    function reg() {
        console.log(login)
        console.log(password1)
        console.log(password2)
        if (password1 !== password2) {
            setPlaceholderPassword('Пароли не совпадают')
            return;
        }
            
        const struct = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "login": login,
            "password": password1,
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "middleName": middleName,
            "phoneNumber": phoneNumber
        }

        fetch("http://localhost:5099/User/reg", {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struct)
        }).then((response) => {
            if (response.status === 200) {
                setActive('login')
            }
            else {
                setPlaceholderogin("Почта или имя уже занято");
                return;
            }
            // window.location.reload( true ) ;
        }).catch((error) => console.log(error));
    }

    return (
        <div className={styles.container} onClick={() => setActive('none')}>
            <div className={styles.login_container} onClick={e => e.stopPropagation()}>
                <h1 className={styles.login_title}>Регистрация</h1>
                <div>
                    {placeholderLogin !== '' && <p className={styles.err}>{placeholderLogin}</p>}
                    <Input type="text" id="login" placeholder='Логин' onChange={handleChange} value={login} />
                </div>
                <div>
                    {placeholderPassword !== '' && <p className={styles.err}>{placeholderPassword}</p>}
                    <Input type="password" id="pass1" placeholder='Пароль' onChange={handleChange} value={password1} />
                </div>
                <Input type="password" value={password2} id="pass2" placeholder={'Повторите пароль'} onChange={handleChange} />
                <Input type="text" id="email" placeholder='Email' onChange={handleChange} value={email} />
                <Input type="text" id="firstName" placeholder='Имя' onChange={handleChange} value={firstName} />
                <Input type="text" id="lastName" placeholder='Фамилия' onChange={handleChange} value={lastName} />
                <Input type="text" id="middleName" placeholder='Отчество' onChange={handleChange} value={middleName} />
                <Input type="text" id="phoneNumber" placeholder='Телефон' onChange={handleChange} value={phoneNumber} />
                {err && <p className={styles.err}>Пароли не совпадают</p>}
                <div className={styles.btn_login_container}>
                    <BtnReg onClick={reg}>Создать аккаунт</BtnReg>
                    <BtnReg style={{ color: "#666" }} onClick={() => setActive('login')}>Войти</BtnReg>
                </div>

            </div>
        </div>
    )
}

export default Registration