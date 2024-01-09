import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, A11y } from 'swiper/modules'

interface SliderProp {
  images: string[]
  name: string
  setModalOpen: (arg: boolean) => void
}

export function ModalSlider(props: SliderProp) {
  const isSlider = () => (props.images.length > 1 ? true : false)

  return (
    <div
      className="product-modal"
      onClick={() => {
        props.setModalOpen(false)
      }}
    >
      {isSlider() && (
        <Swiper
          modules={[Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
        >
          {props.images.map((image) => (
            <SwiperSlide key={image}>
              <div
                className="image-wrapper"
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <img src={image} alt={props.name} className="product-image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!isSlider() && (
        <div
          className="image-wrapper"
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <img src={props.images[0]} alt={props.name} className="product-image" />
        </div>
      )}
    </div>
  )
}
