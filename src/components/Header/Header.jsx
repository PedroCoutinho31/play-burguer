// src/components/Header/Header.jsx
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const flickerTitle = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    color: #CC1414;
    text-shadow: 3px 3px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  }
  20%, 24%, 55% {
    color: #FF6060;
    text-shadow: 3px 3px 0px #000, 0 0 15px #FF2020, 0 0 30px #FF2020;
  }
`;

const pulseYellow = keyframes`
  0%, 100% { box-shadow: 0 4px 0 #FFD700, 0 0 20px rgba(255, 215, 0, 0.3); }
  50% { box-shadow: 0 4px 0 #FFD700, 0 0 40px rgba(255, 215, 0, 0.6); }
`;

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  animation: ${slideDown} 0.4s ease-out;
  background: #0A0A0A;
  border-bottom: 4px solid #FFD700;
  box-shadow: 0 4px 0 #FFD700, 0 0 30px rgba(255, 215, 0, 0.4);
  animation: ${slideDown} 0.4s ease-out, ${pulseYellow} 3s ease-in-out infinite;
`;

const TopBar = styled.div`
  background: #CC1414;
  height: 6px;
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 16px;
  }
`;

const LogoArea = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
`;

const PixelBurger = styled.div`
  width: 44px;
  height: 44px;
  image-rendering: pixelated;
  font-size: 36px;
  line-height: 1;
  filter: drop-shadow(0 0 8px #FFD700);

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 28px;
  }
`;

const LogoText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #CC1414;
  text-shadow: 3px 3px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000;
  animation: ${flickerTitle} 8s step-end infinite;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #FFD700;
  text-decoration: none;
  padding: 8px 12px;
  border: 2px solid transparent;
  transition: all 0.1s;
  cursor: pointer;
  letter-spacing: 0.5px;

  &:hover {
    border: 2px solid #FFD700;
    color: #FFFFFF;
    background: rgba(255, 215, 0, 0.1);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
  }
`;

const CTAButton = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #000;
  background: #FFD700;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.1s;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);

  &:hover {
    background: #FFF;
    transform: scale(1.04);
    box-shadow: 0 0 16px rgba(255, 215, 0, 0.8);
  }

  @media (max-width: 480px) {
    font-size: 7px;
    padding: 8px 12px;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: 2px solid #FFD700;
  color: #FFD700;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 18px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  background: #0A0A0A;
  border-top: 2px solid #FFD700;
  padding: 16px;
  gap: 12px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFD700;
  text-decoration: none;
  padding: 12px;
  border: 1px solid #333;
  cursor: pointer;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    border-color: #FFD700;
  }
`;

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <Wrapper style={{ background: scrolled ? 'rgba(10,10,10,0.98)' : '#0A0A0A' }}>
      <TopBar />
      <Inner>
        <LogoArea onClick={() => scrollTo('home')}>
          <PixelBurger>🍔</PixelBurger>
          <LogoText>PLAY BURGUER</LogoText>
        </LogoArea>

        <Nav>
          <NavLink onClick={() => scrollTo('home')}>▶ HOME</NavLink>
          <NavLink onClick={() => scrollTo('highlights')}>★ DESTAQUES</NavLink>
          <NavLink onClick={() => scrollTo('menu')}>☰ CARDÁPIO</NavLink>
          <NavLink onClick={() => scrollTo('contact')}>✉ CONTATO</NavLink>
        </Nav>

        <CTAButton href="https://wa.me/5500000000000" target="_blank">
          📲 PEDIR AGORA
        </CTAButton>

        <MobileMenuBtn onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? '✕' : '☰'}
        </MobileMenuBtn>
      </Inner>

      <MobileMenu open={mobileOpen}>
        <MobileNavLink onClick={() => scrollTo('home')}>▶ HOME</MobileNavLink>
        <MobileNavLink onClick={() => scrollTo('highlights')}>★ DESTAQUES</MobileNavLink>
        <MobileNavLink onClick={() => scrollTo('menu')}>☰ CARDÁPIO COMPLETO</MobileNavLink>
        <MobileNavLink onClick={() => scrollTo('contact')}>✉ CONTATO</MobileNavLink>
        <MobileNavLink href="https://wa.me/5500000000000" target="_blank">
          📲 PEDIR AGORA VIA WHATSAPP
        </MobileNavLink>
      </MobileMenu>
    </Wrapper>
  );
};
