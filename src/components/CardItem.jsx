import React from 'react'


function CardItem(props) {
  return (

   

<li className='cards__item'>
        <div className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              src={props.src}
              className='cards__item__img'
              alt='IT WORD'
              loading='eager'
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </li>
  )
}

export default CardItem