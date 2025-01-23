import React, { useState } from 'react'
import Slider from 'react-slick';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Sslider.module.css'

const Sslider = () => {
  const [items, setItems] = useState([])

  useEffect(() => {

    fetch(`http://localhost:5099/Slider`)
      .then(res2 => (res2.json()).then((r) =>
        setItems(r)))

  }, [])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const Slide = (props) => {
    return (
      <div className={styles.slider_container}>
        <img src={props.image} alt='slide' className={styles.slider_container_img} />
      </div>
    )
  }

  return (
    <Slider className={styles.slider} {...settings}>
      {items.map(item => <Slide {...item} />)}
    </Slider>
  );
}

export default Sslider