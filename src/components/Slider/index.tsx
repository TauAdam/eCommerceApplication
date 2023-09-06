import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import './style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { ModalSlider } from './modalSlider'

// import necklaceImg from '../../../src/assets/images/necklace.png'
// import { addProductImage } from 'utils/requests'

interface SliderProp {
  images: string[]
  name: string
}

export function Slider(props: SliderProp) {
  const [modalOpen, setModalOpen] = useState(false)

  const isSlider = () => (props.images.length > 1 ? true : false)

  return (
    <>
      {modalOpen && <ModalSlider {...{ ...props, setModalOpen }} />}
      {!modalOpen && isSlider() && (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {props.images.map((image) => (
            <SwiperSlide key={image}>
              <div>
                <img
                  src={image}
                  alt={props.name}
                  className="product-image"
                  onClick={() => {
                    setModalOpen(true)
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!modalOpen && !isSlider() && (
        <img
          src={props.images[0]}
          alt={props.name}
          className="product-image"
          onClick={() => {
            setModalOpen(true)
          }}
        />
      )}
    </>
  )
}
