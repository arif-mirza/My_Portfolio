import React, { useEffect } from 'react';
import "../styles/contactPage.css";
import "../styles/ContactForm.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactForm from '../components/ContactForm';

function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 500, once: false });
    window.addEventListener('scroll', AOS.refresh);
    return () => window.removeEventListener('scroll', AOS.refresh);
  }, []);

  return (
    <>
      <div className="py-5">
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-12">
              <h1 id="section-title-07" data-aos='fade-right'>Get In Touch</h1>
              <h1 id="section-title-08" data-aos='fade-left'>Get In Touch</h1>
            </div>
          </div>

          <div className="container center-div">
            <div className="row text-center contact-info" style={{ maxWidth: '560px', margin: '0 auto' }}>
              <p>
                I'm currently in search of new and better opportunities. My inbox is always
                open — whether you wanna hire or just say hi, I'll try my best to get back to you!
              </p>
            </div>
          </div>

          {/* API-connected contact form */}
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center">
              <div data-aos="fade-up" style={{ width: '100%', maxWidth: '560px' }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;