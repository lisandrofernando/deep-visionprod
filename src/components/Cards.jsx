import React, { useEffect } from 'react'
import './Cards.css';
import CardItem from './CardItem';
import testing from '../assets/logoandvideos/Testing.jpg'
import devops from '../assets/logoandvideos/Devops.jpg'
import development from '../assets/logoandvideos/Develoment.jpg'
import projectMang from '../assets/logoandvideos/Management.jpg'
import Ai from '../assets/logoandvideos/AI.jpg'
import { useTranslation } from 'react-i18next';

import dataEngineering from '../assets/logoandvideos/DataEngineering.jpg'

function Cards() {
  const { t } = useTranslation();
  useEffect(() => {
    const images = [testing, devops, development, projectMang, Ai, dataEngineering];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  return (
    <div className='cards' id='services'>
      <h1>{t('cards.title')}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem src={testing} text={t('cards.testingText')} label={t('cards.testingLabel')} path='/services' />
            <CardItem src={devops} text={t('cards.devopsText')} label={t('cards.devopsLabel')} path='/services' />
          </ul>
          <ul className='cards__items'>
            <CardItem src={development} text={t('cards.developmentText')} label={t('cards.developmentLabel')} path='/services' />
            <CardItem src={projectMang} text={t('cards.managementText')} label={t('cards.managementLabel')} path='/services' />
            <CardItem src={Ai} text={t('cards.aiText')} label={t('cards.aiLabel')} path='/services' />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={dataEngineering}
              text='Transform raw data into powerful insights — we design and build scalable data pipelines, warehouses, and analytics solutions that fuel smarter business decisions powered by AI.'
              label='Data Engineering'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards