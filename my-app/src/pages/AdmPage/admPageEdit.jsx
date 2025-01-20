import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/Container'
import styles from './admPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import Input from '../../components/Input/Input'
import BtnReg from '../../components/BtnReg/BtnReg'

const AdmPageEdit = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [сapacity, setCapacity] = useState('')
    const [consumption, setConsumption] = useState('')
    const [speed, setSpeed] = useState('')
    const [service1, setService1] = useState('')
    const [service2, setService2] = useState('')
    const [service3, setService3] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')

    const params = useParams()
    const index = params.id
    const navigate = useNavigate();



    useEffect(() => {
        fetch(`http://localhost:5099/Bus/findId?id=${index}`)
            .then(res2 => (res2.json()).then((r) => {
                setTitle(r.title);
                console.log(r);
                setDescription(r.description);
                setCapacity(r.сapacity);
                setConsumption(r.consumption);
                setSpeed(r.speed);
                setImage(r.image);
                setCategory(r.category);
                setPrice(r.price)
            }))
    }, [])


    const Put = async (e, link, struct) => {
        try {
            const response = await fetch(`${link + index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(struct)
            });

            if (!response.ok) throw new Error('Ошибка изменения товара');
        } catch (error) {
            console.error(error);
            alert('Ошибка изменения товара');
        }
    };

    const PutBtn = (e) => {
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
        console.log(structItem)
        Put(e, 'http://localhost:5099/Bus/', structItem)
        navigate(`/admin`)
    }




    function handleChange(event) {
        if (event.target.id === "title")
            setTitle(event.target.value)
        else if (event.target.id === "description")
            setDescription(event.target.value)
        else if (event.target.id === "сapacity")
            setCapacity(event.target.value)
        else if (event.target.id === "consumption")
            setConsumption(event.target.value)
        else if (event.target.id === "speed")
            setSpeed(event.target.value)
        else if (event.target.id === "service1")
            setService1(event.target.value)
        else if (event.target.id === "service2")
            setService2(event.target.value)
        else if (event.target.id === "service3")
            setService3(event.target.value)
        else if (event.target.id === "image")
            setImage(event.target.value)
        else if (event.target.id === "category")
            setCategory(event.target.value)
        else if (event.target.id === "price")
            setPrice(event.target.value)
    }

    return (
        <Container isActiveSideBar={false}>
            <div className={styles.container}>
                <div>
                    <h2>Изменить товар</h2>
                    <form className={styles.addTovar}>
                        <p className={styles.input}>Артикул {index}</p>
                        <Input type='text' value={title} id="title" placeholder='Имя товара' onChange={handleChange}/>
                        <Input type='text' value={category} placeholder='Категория' id='category' onChange={handleChange}/>
                        <Input type='text' value={price} placeholder='Цена' id='price' onChange={handleChange}/>
                        <Input type='text' value={description} placeholder='Описание' id='description' onChange={handleChange}/>
                        <Input type='text' value={сapacity} placeholder='Вместимость' id='сapacity' onChange={handleChange}/>
                        <Input type='text' value={consumption } placeholder='Расход топлива' id='consumption' onChange={handleChange}/>
                        <Input type='text' value={ speed} placeholder='Скорость' id='speed' onChange={handleChange}/>
                        <Input type='text' value={service1 } placeholder='Сервисы' id='service1' onChange={handleChange}/>
                        <Input type='text' value={service2 } placeholder='Сервисы' id='service2' onChange={handleChange}/>
                        <Input type='text' value={service3 } placeholder='Сервисы' id='service3' onChange={handleChange}/>
                        <Input type='text' value={ image} placeholder='Ссылка на изображение' id='image' onChange={handleChange}/>

                        <BtnReg type="button" className={styles.button} onClick={PutBtn}>Сoхранить</BtnReg>
                    </form>
                </div>
                <img className={styles.img} src={image} alt={title} />
            </div>
        </Container>
    )
}

export default AdmPageEdit