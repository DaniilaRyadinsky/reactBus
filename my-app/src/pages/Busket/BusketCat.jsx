import React from 'react'
import Container from '../../components/Container/Container'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../Catalog/Catalog.module.css'
import CatalogModuleBusk from '../../components/CatalogModule/CatalogModuleBusk'
const BusketCat = () => {
    const [items, setItem] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5099/User/ordersbylogin?Login=${sessionStorage.getItem('username')}&Category=${params.id}`)
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
                <CatalogModuleBusk loading={loading} items={items}/>
            </ul>
        </Container>
    )
}

export default BusketCat