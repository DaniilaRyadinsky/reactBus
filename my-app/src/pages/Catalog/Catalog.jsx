import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Catalog.module.css'
import Container from '../../components/Container/Container'
import Search from '../../components/Search/Search'
import CatalogModule from '../../components/CatalogModule/CatalogModule'


const Catalog = () => {
    const params = useParams()

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchItems() {
        setLoading(true)
        const response = await fetch(`http://localhost:5099/Bus/findcategory?category=${params.id}`)
        const data = await response.json()
        setItems(data)
        console.log(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (

        <Container isActiveSideBar={true}>
            <Search />
            <CatalogModule items={items} loading={loading} link={'catalog'}/>
        </Container>
    )
}

export default Catalog

