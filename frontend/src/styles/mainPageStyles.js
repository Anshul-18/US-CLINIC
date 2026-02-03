const mainPageStyles = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#1e3a8a',
    background: 'linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
  },

  // Navigation Bar
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #dbeafe',
    boxShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '-0.5px',
  },

  navButtonContainer: {
    display: 'flex',
    gap: '15px',
  },

  navButton: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  loginButton: {
    background: 'transparent',
    color: '#2563eb',
    border: '2px solid #3b82f6',
  },

  signupButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
  },

  // Hero Section
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '60px',
    flexWrap: 'wrap',
  },

  heroContent: {
    flex: '1',
    minWidth: '400px',
    maxWidth: '600px',
  },

  heroTitle: {
    fontSize: '56px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    lineHeight: '1.1',
    letterSpacing: '-1px',
  },

  heroSubtitle: {
    fontSize: '20px',
    color: '#475569',
    marginBottom: '40px',
    lineHeight: '1.6',
    fontWeight: '400',
  },

  heroButtonContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },

  ctaButton: {
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  secondaryButton: {
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    background: 'white',
    color: '#2563eb',
    border: '2px solid #3b82f6',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  heroImageContainer: {
    flex: '1',
    minWidth: '400px',
    maxWidth: '500px',
    textAlign: 'center',
  },

  heroImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },

  // Features Section
  featuresSection: {
    padding: '100px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
  },

  sectionTitle: {
    fontSize: '42px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  },

  sectionSubtitle: {
    fontSize: '18px',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '60px',
    maxWidth: '600px',
    margin: '0 auto 60px auto',
    lineHeight: '1.6',
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    marginTop: '60px',
  },

  featureCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    border: '2px solid #dbeafe',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },

  featureIcon: {
    fontSize: '48px',
    marginBottom: '20px',
    display: 'block',
  },

  featureTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '15px',
    letterSpacing: '-0.3px',
  },

  featureDescription: {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '1.6',
  },

  // Services Section
  servicesSection: {
    padding: '100px 40px',
    background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)',
  },

  servicesContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '60px',
  },

  serviceCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '30px',
    border: '2px solid #dbeafe',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },

  serviceIcon: {
    fontSize: '40px',
    marginBottom: '15px',
    display: 'block',
  },

  serviceTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: '10px',
    letterSpacing: '-0.2px',
  },

  serviceDescription: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.5',
  },

  // Stats Section
  statsSection: {
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    textAlign: 'center',
  },

  statCard: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    borderRadius: '16px',
    padding: '30px',
    border: '2px solid #bfdbfe',
    transition: 'all 0.3s ease',
  },

  statNumber: {
    fontSize: '36px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    letterSpacing: '-1px',
  },

  statLabel: {
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500',
  },

  // CTA Section
  ctaSection: {
    padding: '100px 40px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  },

  ctaTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  },

  ctaDescription: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px auto',
    lineHeight: '1.6',
  },

  // Footer
  footer: {
    padding: '60px 40px 30px 40px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    borderTop: 'none',
  },

  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },

  footerText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '20px',
  },

  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },

  footerLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },

  // Responsive adjustments
  '@media (max-width: 768px)': {
    heroTitle: {
      fontSize: '36px',
    },
    heroSubtitle: {
      fontSize: '16px',
    },
    featuresGrid: {
      gridTemplateColumns: '1fr',
    },
    navbar: {
      padding: '15px 20px',
    },
    hero: {
      padding: '60px 20px',
      gap: '40px',
    },
  }
};

export default mainPageStyles;
