import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './Catalog.module.css'
import Container from '../../components/Container/Container'
import Search from '../../components/Search/Search'



const CatalogSearch = () => {

    let search_res

    //   const items = [
    //     {
    //         id: 1,
    //         nameItem: 'Комфортабельный автобус',
    //         img_link: 'https://sportishka.com/uploads/posts/2022-03/1646398529_33-sportishka-com-p-komfortabelnii-turisticheskii-avtobus-turi-36.jpg'
    //     },
    //     {
    //         id: 2,
    //         nameItem: 'Экономичный автобус',
    //         img_link: 'https://avatars.mds.yandex.net/get-pdb/38069/e5dadf30-4f9e-4f32-9d52-7536e6eef4a7/s1200'
    //     }]

    const params = useParams()
    search_res = params.search

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


    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search_res.toLowerCase())
    );


    return (
        <Container isActiveSideBar={true}>
            <Search />
            <div className={styles.content}>
                {loading && <p>loading...</p>}
                {!loading &&
                    <ul className={styles.product_list}>
                        {filteredItems.map(item => <ProductCard key={item.id.toString()} {...item} />)}
                    </ul>
                }
            </div>
        </Container>
    )
}

export default CatalogSearch