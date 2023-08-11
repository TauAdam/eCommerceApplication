import React from 'react'
import './Footer.css'
import logo from './logo.png'
import world from './Lang.svg'
import vk from './VK.png'
import inst from './Instagram.png'
import tg from './Telegram.png'
import wa from './Whatsapp.png'

export default function Footer() {
  return (
    <div className="wrapper__footer">
      <img src={logo} alt="Logo" />
      <div className="links">
        <div className="links__nav">
          <h3>Избранное</h3>
          <h3>Корзина</h3>
          <h3>Контакты</h3>
        </div>
        <div className="links__service">
          <h3 className="links__content">Условия сервиса</h3>
          <div className="links__langs">
            <div>
              <img className="links__img" src={world} alt="vk" />
            </div>
            <div className="links__lang">Каз</div>
            <div className="links__lang">Rus</div>
            <div className="links__lang">Eng</div>
          </div>
        </div>
      </div>
      <div className="social">
        <img src={vk} alt="vk" />
        <img src={inst} alt="instagram" />
        <img src={tg} alt="telegram" />
        <img src={wa} alt="whatsapp" />
      </div>
    </div>
  )
}
