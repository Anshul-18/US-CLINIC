import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import mainPageStyles from '../styles/mainPageStyles';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div style={mainPageStyles.page}>
      {/* Navigation Bar */}
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section style={mainPageStyles.hero}>
        <div style={mainPageStyles.heroContent}>
          <h1 style={mainPageStyles.heroTitle}>
            Your Health,<br />
            Our Priority
          </h1>
          <p style={mainPageStyles.heroSubtitle}>
            Experience world-class healthcare with our modern clinic management system. 
            Book appointments, manage treatments, and connect with certified doctors — all in one place.
          </p>
          <div style={mainPageStyles.heroButtonContainer}>
            <button 
              style={mainPageStyles.ctaButton}
              onClick={() => navigate('/signup')}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }}
            >
              Get Started
            </button>
            <button 
              style={mainPageStyles.secondaryButton}
              onClick={() => navigate('/doctors')}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.4)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Doctors
            </button>
          </div>
        </div>        <div style={mainPageStyles.heroImageContainer}>
          <img
            src="https://c8.alamy.com/comp/2XTK4KE/dentist-doctor-cartoon-with-sad-rotten-tooth-prevention-diagnosis-and-treatment-of-tooth-and-gum-diseases-dental-hygiene-and-oral-care-prevention-2XTK4KE.jpg"
            alt="Dentist Clinic"
            style={mainPageStyles.heroImage}
          />
        </div>
      </section>

      {/* Features Section */}
      <section style={mainPageStyles.featuresSection}>
        <h2 style={mainPageStyles.sectionTitle}>Why Choose US-CLINIC?</h2>
        <p style={mainPageStyles.sectionSubtitle}>
          We combine cutting-edge technology with compassionate care to deliver 
          an exceptional healthcare experience for every patient.
        </p>
        
        <div style={mainPageStyles.featuresGrid}>
          <div 
            style={mainPageStyles.featureCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <span style={mainPageStyles.featureIcon}>👨‍⚕️</span>
            <h3 style={mainPageStyles.featureTitle}>Expert Doctors</h3>
            <p style={mainPageStyles.featureDescription}>
              Our team of certified medical professionals brings years of experience 
              and specialized expertise to provide you with the best possible care.
            </p>
          </div>

          <div 
            style={mainPageStyles.featureCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <span style={mainPageStyles.featureIcon}>📱</span>
            <h3 style={mainPageStyles.featureTitle}>Easy Booking</h3>
            <p style={mainPageStyles.featureDescription}>
              Schedule appointments with just a few clicks. Get instant confirmations, 
              reminders, and real-time updates on your appointment status.
            </p>
          </div>

          <div 
            style={mainPageStyles.featureCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <span style={mainPageStyles.featureIcon}>🏥</span>
            <h3 style={mainPageStyles.featureTitle}>Modern Facilities</h3>
            <p style={mainPageStyles.featureDescription}>
              State-of-the-art equipment and modern facilities ensure you receive 
              the highest quality medical care in a comfortable environment.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={mainPageStyles.servicesSection}>
        <div style={mainPageStyles.servicesContainer}>
          <h2 style={mainPageStyles.sectionTitle}>Our Services</h2>
          <p style={mainPageStyles.sectionSubtitle}>
            Comprehensive healthcare services tailored to meet all your medical needs
          </p>
          
          <div style={mainPageStyles.servicesGrid}>
            <div 
              style={mainPageStyles.serviceCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={mainPageStyles.serviceIcon}>🩺</span>
              <h4 style={mainPageStyles.serviceTitle}>General Checkups</h4>
              <p style={mainPageStyles.serviceDescription}>Comprehensive health examinations</p>
            </div>

            <div 
              style={mainPageStyles.serviceCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={mainPageStyles.serviceIcon}>🦷</span>
              <h4 style={mainPageStyles.serviceTitle}>Dental Care</h4>
              <p style={mainPageStyles.serviceDescription}>Professional dental treatments</p>
            </div>

            <div 
              style={mainPageStyles.serviceCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={mainPageStyles.serviceIcon}>💊</span>
              <h4 style={mainPageStyles.serviceTitle}>Pharmacy</h4>
              <p style={mainPageStyles.serviceDescription}>Prescription and over-the-counter medications</p>
            </div>

            <div 
              style={mainPageStyles.serviceCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={mainPageStyles.serviceIcon}>🔬</span>
              <h4 style={mainPageStyles.serviceTitle}>Lab Tests</h4>
              <p style={mainPageStyles.serviceDescription}>Accurate diagnostic testing</p>
            </div>

            <div 
              style={mainPageStyles.serviceCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={mainPageStyles.serviceIcon}>🚑</span>
              <h4 style={mainPageStyles.serviceTitle}>Emergency Care</h4>
              <p style={mainPageStyles.serviceDescription}>24/7 emergency medical services</p>
            </div>

            <div 
              style={mainPageStyles.serviceCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={mainPageStyles.serviceIcon}>🏃‍♂️</span>
              <h4 style={mainPageStyles.serviceTitle}>Wellness Programs</h4>
              <p style={mainPageStyles.serviceDescription}>Preventive care and wellness coaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={mainPageStyles.statsSection}>
        <h2 style={mainPageStyles.sectionTitle}>Our Impact</h2>
        <div style={mainPageStyles.statsGrid}>
          <div 
            style={mainPageStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <div style={mainPageStyles.statNumber}>10K+</div>
            <div style={mainPageStyles.statLabel}>Happy Patients</div>
          </div>
          
          <div 
            style={mainPageStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <div style={mainPageStyles.statNumber}>50+</div>
            <div style={mainPageStyles.statLabel}>Expert Doctors</div>
          </div>
          
          <div 
            style={mainPageStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <div style={mainPageStyles.statNumber}>15+</div>
            <div style={mainPageStyles.statLabel}>Years Experience</div>
          </div>
          
          <div 
            style={mainPageStyles.statCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <div style={mainPageStyles.statNumber}>24/7</div>
            <div style={mainPageStyles.statLabel}>Emergency Care</div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={mainPageStyles.ctaSection}>
        <h2 style={mainPageStyles.ctaTitle}>Ready to Get Started?</h2>
        <p style={mainPageStyles.ctaDescription}>
          Join thousands of satisfied patients who trust US-CLINIC for their healthcare needs. 
          Book your appointment today and experience the difference.
        </p>
        <button 
          style={mainPageStyles.ctaButton}
          onClick={() => navigate('/signup')}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }}
        >
          Book Your Appointment
        </button>
      </section>

      {/* Footer */}
      <footer style={mainPageStyles.footer}>
        <div style={mainPageStyles.footerContent}>          <div style={mainPageStyles.footerLinks}>
            <span style={mainPageStyles.footerLink}>About Us</span>
            <span style={mainPageStyles.footerLink}>Services</span>
            <span style={mainPageStyles.footerLink}>Contact</span>
            <span style={mainPageStyles.footerLink}>Privacy Policy</span>
            <span style={mainPageStyles.footerLink}>Terms of Service</span>
          </div>
          <p style={mainPageStyles.footerText}>
            © 2025 US-CLINIC. All rights reserved. | Providing quality healthcare since 2010
          </p>
        </div>
      </footer>
    </div>
  );
};export default MainPage;
