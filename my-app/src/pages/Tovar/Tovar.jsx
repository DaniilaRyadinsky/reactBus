import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/Container/Container'
import styles from './Tovar.module.css'
import BtnReg from '../../components/BtnReg/BtnReg'

const Tovar = () => {

    const [item, setItem] = useState([])
    const [serv, setServ] = useState([])

    const params = useParams()
    const index = params.id

    async function fetchItems() {
        console.log(`http://localhost:5099/Bus/findId?id=${index}`)
        const response = await fetch(`http://localhost:5099/Bus/findId?id=${index}`)
        const data = await response.json()
        setItem(data)
        setServ(data.services)
        console.log(data.services)
    }

    async function Add() {
        try {
            const response = await fetch(`http://localhost:5099/Bus/place?idbus=${index}&Login=${sessionStorage.getItem('username')}`);
      
            if (response.ok) {
            } else {
              console.error('Ошибка при удалении карточки:', response.statusText);
            }
          } catch (error) {
            console.error('Ошибка сети:', error);
          }
        //   window.location.reload( true ) ;
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <Container isActiveSideBar={true}>
            <h3 className={styles.product_header}>{item.title}</h3>
            <h2 className={styles.product_header2}>{item.price}</h2>
            <p className={styles.product_header}><strong>Краткое описание товара</strong></p>
            <img className={styles.product_img} src={item.image} alt={item.title} />
            <p>Категория {item.category}</p>
            {sessionStorage.getItem('username') !== null &&
            <BtnReg onClick={Add} >В корзину</BtnReg>}
            {/* style="width:100%; max-width:600px; border: 5px solid red;" */}
            <p className={styles.product_description}>{item.description}</p>
            <p className={styles.product_description}>Мы используем только высококачественные материалы и современное оборудование, чтобы наши пассажиры чувствовали себя уютно и защищённо.</p>
            <p className={styles.product_description}>Каждый автобус проходит регулярные технические проверки, что гарантирует надежность во время путешествий. Удобные сиденья и дополнительные услуги делают каждую поездку приятной.</p>
            <h2 className={styles.product_header}>Дополнительные услуги</h2>
            <ul>
                {serv.map(i => <li>{i}</li>)}
            </ul>
            <table border="1">
                <tr>
                    <th>Параметр</th>
                    <th>Значение</th>
                </tr>
                <tr>
                    <td>Ёмкость</td>
                    <td>{item.сapacity}</td>
                </tr>
                <tr>
                    <td>Расход топлива</td>
                    <td>{item.consumption}</td>
                </tr>
                <tr>
                    <td>Скорость</td>
                    <td>{item.speed}</td>
                </tr>
            </table>
            <h2 className={styles.product_header}>Отзывы клиентов</h2>
            <p>"Лучший автобус, в котором я когда-либо ездил!" - Анна</p>
        </Container>
    )
}

export default Tovar