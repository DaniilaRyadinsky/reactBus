import React, { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import Search from '../../components/Search/Search'
import Sslider from  '../../components/Sslider/Sslider'
import styles from '../Catalog/Catalog.module.css'
import CategoryModule from '../../components/CategoryModule/CategoryModule'

const Category = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchItems() {
      setLoading(true)

      const response = await fetch(`http://localhost:5099/Bus/allcategory`)
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
            <Search/>
            <div className={styles.content}>
                <Sslider />
                <CategoryModule loading={loading} items={items} link={'category'} />
            </div>
        </Container>
  )
}

export default Category