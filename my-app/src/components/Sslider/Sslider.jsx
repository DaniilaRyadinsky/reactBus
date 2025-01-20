import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Sslider.module.css'
import page1 from '../../img/MGL_2434.jpg'
import page2 from '../../img/61a5da4d82682c200d8f08cb.jpg'
import page3 from '../../img/nBkSUhL2h1AlmcmzIL6BrNOp2Z318Ji-mijFnuWR9mOBdDebBizCnTY8qdJf6ReJ58vU9meMMok3Ee2nhSR6ISeO9G1N_wjJ=sxnVU-LPYA9QdYVxQW2D4w.jpg'

const Sslider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500, 
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    
      return (
        <Slider className={styles.slider} {...settings}>
          <div className={styles.slider_container}>
            <img src={page1} alt='slide-1' />
          </div>
          <div>
            <img src={page2} alt='slide-2' />
          </div>
          <div>
            <img src={page3} alt='slide-3' />
          </div>
        </Slider>
      );
}

export default Sslider