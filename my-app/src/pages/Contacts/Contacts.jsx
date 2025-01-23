import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import Input from '../../components/Input/Input'
import styles from './Contacts.module.css'
import BtnReg from '../../components/BtnReg/BtnReg'

const Contacts = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [topic, setTopic] = useState('')
    const [text, setText] = useState('')
    const [isSave, setIsSave] = useState(false)

    function handleChange(event) {
        setIsSave(false)
        if (event.target.id === "name")
            setName(event.target.value)
        else if (event.target.id === "email")
            setEmail(event.target.value)
        else if (event.target.id === "topic")
            setTopic(event.target.value)
        if (event.target.id === "text")
            setText(event.target.value)
    }

    function send() {
        const struct = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "email": email,
            "name": name,
            "theme": topic,
            "message": text
        }
        fetch("http://localhost:5099/Review", {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struct)
        }).then((response) => {
            if (response.status === 200) {
                setIsSave(true)
                setText('')
                setTopic('')
            }
            else {
                console.log('err')
                return;
            }
            // window.location.reload( true ) ;
        }).catch((error) => console.log(error));
    }


    return (
        <Container isActiveSideBar={true}>
            <h2>Напишите нам</h2>
            <div className={styles.form}>
                <label className={styles.label} for="name">Имя:</label>
                <Input type="text" id="name" name="name" required onChange={handleChange} value={name}/>
                <label className={styles.label} for="email">Email:</label>
                <Input type="email" id="email" name="email" required onChange={handleChange} value={email}/>
                <label className={styles.label} for="topic">Тема:</label>
                <Input type="text" id="topic" name="topic" required onChange={handleChange} value={topic}/>
                <label className={styles.label} for="text" >Сообщение:</label>
                <textarea id="text" name="text" required onChange={handleChange} value={text}></textarea>
                <BtnReg onClick={send}>Отправить</BtnReg>
                {isSave && <p>Отправлено</p>}
            </div>
            <div >
                {/* style="width: 300px; border: 1px solid #000; padding: 10px; margin-bottom: 10px;" */}
                <h3>Адрес:</h3>
                <p>
                    г. Москва, пер. Николоямский, д.4-6, стр. 3</p>

                <h3>Контактные номера телефонов:</h3>
                <p>
                    +7 (495) 505-48-11
                    +7 (495) 773-71-11</p>

                <h3>Email:</h3>
                <p>
                    info@moscowbus.ru</p>
            </div>

            <div >
                {/* style="position: relative; width: 100%; height: 100vh;" */}
                <h3>Карта:</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5770743268813!2d37.660956899999995!3d55.748476999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54aec6630573d%3A0xa47e6a911687db9f!2z0J3QuNC60L7Qu9C-0Y_QvNGB0LrQuNC5INC_0LXRgC4sIDQtNiwg0JzQvtGB0LrQstCwLCAxMDkwMDQ!5e0!3m2!1sru!2sru!4v1737211528985!5m2!1sru!2sru" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </Container>
    )
}

export default Contacts