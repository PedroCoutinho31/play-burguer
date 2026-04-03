// src/components/Footer/Footer.jsx
import styled, { keyframes } from 'styled-components';

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% { color: #CC1414; }
  19%, 21%, 54%, 56% { color: #FF6060; }
`;

const FooterEl = styled.footer`
  background: #000;
  border-top: 4px solid #CC1414;
  padding: 40px 24px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      #CC1414 0px, #CC1414 20px,
      #FFD700 20px, #FFD700 40px
    );
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
`;

const Brand = styled.div``;

const BrandName = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #CC1414;
  text-shadow: 2px 2px 0 #000;
  animation: ${flicker} 8s step-end infinite;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const BrandDesc = styled.p`
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: #555;
  line-height: 1.6;
`;

const Col = styled.div``;

const ColTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFD700;
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #222;
`;

const ColList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColItem = styled.li`
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: #555;
  cursor: pointer;
  transition: color 0.1s;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before { content: '▷ '; color: #333; }

  &:hover {
    color: #FFD700;
    &::before { color: #FFD700; }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Bottom = styled.div`
  border-top: 2px solid #111;
  padding: 20px 0;
  text-align: center;
  overflow: hidden;
`;

const BottomText = styled.p`
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  letter-spacing: 1px;
`;

const MarqueeWrap = styled.div`
  overflow: hidden;
  border-top: 1px solid #111;
  padding: 10px 0;
`;

const MarqueeInner = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 30s linear infinite;
`;

const MarqueeText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #1a1a1a;
  white-space: nowrap;
  padding: 0 60px;
  letter-spacing: 3px;
`;

const MARQUEE = '★ PLAY BURGUER ★ OS MELHORES SMASH BURGERS ★ PEÇA JÁ ★ DELIVERY DISPONÍVEL ★ FEITO COM AMOR ★ ';

export const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <FooterEl>
      <Inner>
        <Brand>
          <BrandName>🍔 PLAY BURGUER</BrandName>
          <BrandDesc>
            Os melhores smash burgers artesanais da cidade. Feitos com ingredientes premium, muito sabor e estilo arcade.
          </BrandDesc>
        </Brand>

        <Col>
          <ColTitle>NAVEGAÇÃO</ColTitle>
          <ColList>
            <ColItem onClick={() => scrollTo('home')}>Home</ColItem>
            <ColItem onClick={() => scrollTo('highlights')}>Destaques</ColItem>
            <ColItem onClick={() => scrollTo('menu')}>Cardápio</ColItem>
            <ColItem onClick={() => scrollTo('contact')}>Contato</ColItem>
          </ColList>
        </Col>

        <Col>
          <ColTitle>CONTATO</ColTitle>
          <ColList>
            <ColItem>WhatsApp: (11) 90000-0000</ColItem>
            <ColItem>Seg–Sex: 11h–23h</ColItem>
            <ColItem>Sáb–Dom: 11h–00h</ColItem>
            <ColItem>Rua dos Pixels, 404</ColItem>
          </ColList>
        </Col>
      </Inner>

      <Bottom>
        <BottomText>
          © 2024 PLAY BURGUER — TODOS OS DIREITOS RESERVADOS — CNPJ: 00.000.000/0001-00
        </BottomText>
        <MarqueeWrap>
          <MarqueeInner>
            {[1, 2, 3, 4].map(i => (
              <MarqueeText key={i}>{MARQUEE}</MarqueeText>
            ))}
          </MarqueeInner>
        </MarqueeWrap>
      </Bottom>
    </FooterEl>
  );
};
