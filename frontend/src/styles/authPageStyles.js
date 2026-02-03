const authPageStyles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    margin: '0',
  },
  
  container: {
    display: 'flex',
    maxWidth: '1100px',
    width: '100%',
    minHeight: '600px',
    background: '#ffffff',
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },

  formSection: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
    background: '#ffffff',
  },
  
  imageSection: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
    gap: '30px',
  },

  formCard: {
    width: '100%',
    maxWidth: '400px',
  },

  heading: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: '10px',
    letterSpacing: '-0.5px',
  },

  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '30px',
    lineHeight: '1.5',
  },

  formGroup: {
    marginBottom: '20px',
  },

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  
  input: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '16px',
    border: '2px solid #dbeafe',
    borderRadius: '10px',
    background: '#f0f9ff',
    color: '#1e3a8a',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none',
  },

  inputFocus: {
    border: '2px solid #3b82f6',
    background: '#ffffff',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
  },
  
  select: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    background: '#f8fafc',
    color: '#1e293b',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 12px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    paddingRight: '40px',
  },

  selectFocus: {
    border: '2px solid #2563eb',
    background: '#ffffff',
  },
  
  button: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '10px',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
  },

  buttonHover: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.6)',
    transform: 'translateY(-2px)',
  },
  
  errorMessage: {
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '500',
    background: '#fef2f2',
    border: '1px solid #fee2e2',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
    textAlign: 'center',
  },

  linkContainer: {
    marginTop: '25px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
  },

  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },

  linkHover: {
    color: '#1e40af',
    textDecoration: 'underline',
  },
  
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    padding: '20px',
  },

  image: {
    width: '180px',
    height: 'auto',
    filter: 'brightness(0) invert(1)',
    transition: 'all 0.3s ease',
  },

  imageHover: {
    transform: 'scale(1.05)',
  },

  welcomeText: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '15px',
    letterSpacing: '-0.5px',
  },

  welcomeSubtext: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: '1.6',
    maxWidth: '300px',
  },
};

export default authPageStyles;
