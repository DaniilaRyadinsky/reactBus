import React from 'react'
import Container from '../../components/Container/Container'
import { useState, useEffect } from 'react'
import CatalogModuleBusk from '../../components/CatalogModule/CatalogModuleBusk'



const Busket = () => {
    const [items, setItem] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5099/User/ordersbylogin?Login=${sessionStorage.getItem('username')}`)
            .then(res2 => (res2.json()).then((r) =>
                setItem(r)))
        setLoading(false);
    }, [])

    console.log(items)
    return (
        <Container>
            <h2>Корзина</h2>

            <CatalogModuleBusk loading={loading} items={items} />

        </Container>
    )
}

export default Busket