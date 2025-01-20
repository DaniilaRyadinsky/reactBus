import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/Container'
import styles from './admPage.module.css'
import AdmProductCard from '../../components/AdmProductCard/AdmProductCard'
import Input from '../../components/Input/Input'
import BtnReg from '../../components/BtnReg/BtnReg'
import CatalogModuleAdm from '../../components/CatalogModule/CatalogModuleAdm'
import CategoryModule from '../../components/CategoryModule/CategoryModule'


const AdmPage = () => {
      const [items, setItems] = useState([])
      const [loading, setLoading] = useState(false)
    
      async function fetchItems() {
        setLoading(true)
    
        const response = await fetch(`http://localhost:5099/Bus/all`)
        const data = await response.json()
        setItems(data)
        setLoading(false)
      }
    
      useEffect(() => {
        fetchItems()
      }, [])

    function Post(link, struct) {
        console.log(link)
        fetch(link, {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(struct)
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data['success']) {
                    // эшкере
                }
            })
            .catch((error) => console.log(error));
    }


    function load(e) {
        console.log('clk')
        e.preventDefault()
        var title = document.getElementById("title").value;
        var category = document.getElementById("category").value;
        var price = document.getElementById("price").value;
        var description = document.getElementById("description").value;
        var сapacity = document.getElementById("сapacity").value;
        var consumption = document.getElementById("consumption").value;
        var speed = document.getElementById("speed").value;
        var service1 = document.getElementById("service1").value;
        var service2 = document.getElementById("service2").value;
        var service3 = document.getElementById("service3").value;
        var image = document.getElementById("image").value;

        var structItem = {
            "title": title,
            "description": description,
            "services": [service1 , service2 , service3],
            "сapacity": сapacity,
            "consumption": consumption,
            "speed": speed,
            "image": image,
            "category": category,
            "price": price
        }
        Post("http://localhost:5099/Bus", structItem)
        window.location.reload( true ) ;
    }

    return (
        <Container isActiveSideBar={false}>
            <div className={styles.container}>
            <div>
            <h2>Добавить товар</h2>
            <form className={styles.addTovar}>
                <Input type='text' id="title" placeholder='Имя товара'  />
                <Input type='text' placeholder='Категория' id='category' />
                <Input type='text' placeholder='Цена' id='price' />
                <Input type='text' placeholder='Описание' id='description' />
                <Input type='text' placeholder='Вместимость' id='сapacity' />
                <Input type='text' placeholder='Расход топлива' id='consumption' />
                <Input type='text' placeholder='Скорость' id='speed' />
                <Input type='text' placeholder='Сервисы' id='service1' />
                <Input type='text' placeholder='Сервисы' id='service2' />
                <Input type='text' placeholder='Сервисы' id='service3' />
                <Input type='text' placeholder='Ссылка на изображение' id='image' />
                <BtnReg type="button" className={styles.button} onClick={load}>Сoхранить</BtnReg>
            </form>
            </div>
            {/* <CategoryModule></CategoryModule> */}
            <CatalogModuleAdm items={items} loading={loading}/> 
            </div>
        </Container>
    )
}

export default AdmPage