import React from 'react'
import Container from '../../components/Container/Container'
import { useState, useEffect } from 'react'
import ProductBusket from '../../components/productBusket/ProductBusket'
import styles from '../Catalog/Catalog.module.css'
import CategoryModule from '../../components/CategoryModule/CategoryModule'

const Busket = () => {
    const [items, setItem] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5099/User/allcategorybyuser?Login=${sessionStorage.getItem('username')}`)
            .then(res2 => (res2.json()).then((r) =>
                setItem(r)))
            setLoading(false);
    }, [])

    console.log(items)
    return (
        <Container>
            <h2>Корзина</h2>

            {items.length === 0 && <p>Корзина Пуста</p>}
            <ul className={styles.product_list}>
                <CategoryModule loading={loading} items={items} link={'busket'}/>
            </ul>
        </Container>
    )
}

export default Busket