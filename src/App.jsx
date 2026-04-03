// src/App.jsx
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { CartProvider } from './context/CartContext';
import { useMenu } from './hooks/useMenu';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Highlights } from './components/Highlights/Highlights';
import { Menu } from './components/Menu/Menu';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CartButton, CartSidebar } from './components/Cart/Cart';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const MockBanner = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: #0A0A1A;
  border: 2px solid #FFD700;
  padding: 10px 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #FFD700;
  text-shadow: 1px 1px 0 #000;
  z-index: 9000;
  text-align: center;
  max-width: 90vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 0 20px rgba(255,215,0,0.3);

  span {
    animation: ${blink} 1.5s step-end infinite;
    margin-right: 8px;
  }

  @media (max-width: 480px) {
    font-size: 6px;
    padding: 8px 14px;
  }
`;

function AppContent() {
  const { menuItems, highlights, categories, loading, usingMockData } = useMenu();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights items={highlights} />
        <Menu menuItems={menuItems} categories={categories} loading={loading} />
        <Contact />
      </main>
      <Footer />
      <CartButton />
      <CartSidebar />
      
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
