import React from "react";
import './About.css'
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('nav.about')}</h1>
      <p>{t('about.p1')}</p>
      <p>{t('about.p2')}</p>
      <p>{t('about.p3')}</p>
      <p>{t('about.p4')}</p>
    </>
  );
}

export default About;
