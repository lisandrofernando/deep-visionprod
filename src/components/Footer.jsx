import React, { useState } from 'react'
import {Link} from "react-scroll"
import "./Footer.css"
import myLog from '../assets/logoandvideos/FullLogo_Transparent.png'

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus('Please enter your name');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus('Please enter your message');
      return false;
    }
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSubmitStatus('Message sent successfully!');
      } else {
        setSubmitStatus(data.message || 'Failed to send message.');
      }
    } catch (error) {
      setSubmitStatus('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className='footer-container' id='contact'>
       <section className='footer-subscription'>
         <p className='footer-subscription-heading'>
             PARTNER WITH US
         </p>
        <div className='input-areas'>
          <form onSubmit={sendEmail}>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder='Your Name'  
              className='footer-input' 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input 
              type="email" 
              name='email' 
              placeholder='Your Email' 
              className='footer-input' 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input 
              type="tel" 
              name='phone' 
              placeholder='Your Phone Number' 
              className='footer-input' 
              value={formData.phone}
              onChange={handleInputChange}
            />
            <textarea 
              name="message" 
              id="message" 
              cols="30" 
              rows="10" 
              placeholder='Your Message' 
              className='footer-input' 
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button 
              type='submit' 
              className={`footer-input btn-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus && (
              <div className={`submit-status ${submitStatus.includes('Error') || submitStatus.includes('Please') ? 'error' : 'success'}`}>
                {submitStatus}
              </div>
            )}
          </form>
        </div>
          </section> 
          <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Sponsor Us</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <a href="https://www.instagram.com/deepvision101/" target='_blank' rel="noreferrer" >Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=100091952197954" target='_blank' rel="noreferrer" >Facebook</a>
            <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A91192290&keywords=deep%20visionmx&origin=RICH_QUERY_SUGGESTION&position=0&searchId=50e70c45-3a84-478a-83a9-7e7904f9662c&sid=598" target='_blank' rel="noreferrer" >LinkedIn</a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
             <div className="footer__logo">
             <img src={myLog} alt="Company Logo" />
               </div>
          </div>
          <small className='website-rights'>Deep Vision By Eng.Lisandro Fernando. All Rights Reserved © 2024</small>
          <div className='social-icons'>
            <a href="https://www.facebook.com/profile.php?id=100091952197954"
              className='social-icon-link facebook'
              rel="noreferrer" 
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </a>
            <a href="https://www.instagram.com/deepvision101/"
              className='social-icon-link instagram'
              rel="noreferrer" 
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a>
            <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A91192290&keywords=deep%20visionmx&origin=RICH_QUERY_SUGGESTION&position=0&searchId=50e70c45-3a84-478a-83a9-7e7904f9662c&sid=598"
              className='social-icon-link linkedin'
              rel="noreferrer" 
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer