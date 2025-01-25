import styles from './inBusket.module.css'
import BtnReg from '../BtnReg/BtnReg';
import React, { useState } from 'react';


const InBusket = (props) => {
    const [counter, setCounter] = useState(Number(props.quantity))
    async function Delete() {
        try {
            const response = await fetch(`http://localhost:5099/Bus/deleteorder?idbus=${props.id}&Login=${sessionStorage.getItem('username')}`);

            if (response.ok) {
            } else {
                console.error('Ошибка при удалении карточки:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    }

    async function Add() {
        try {
            const response = await fetch(`http://localhost:5099/Bus/place?idbus=${props.id}&Login=${sessionStorage.getItem('username')}`);

            if (response.ok) {
            } else {
                console.error('Ошибка при удалении карточки:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }

    }

    function increment() {
        setCounter(counter + 1)
        Add()
        props.reload(parseInt(props.price))
    }

    function decrement() {
        setCounter(counter - 1)
        Delete()
        props.reload(-parseInt(props.price))
    }

    return (
        <div className={styles.in_busket}>
            <label className={styles.in_busket_label}>В корзине</label>
            <div className={styles.add_delete}>
                <div><BtnReg style={{ padding: "5px 10px 5px 10px" }} onClick={increment}>+</BtnReg></div>
                <input className={styles.in_busket_number} type='number' value={counter} readOnly />
                <div><BtnReg style={{ padding: "5px 11px 5px 11px" }} onClick={decrement}>-</BtnReg></div>
            </div>

        </div>
    )
}

export default InBusket