// src/components/Hero/Hero.jsx
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const flickerRed = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    color: #CC1414;
    text-shadow: 4px 4px 0px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  }
  20%, 24%, 55% {
    color: #FF6060;
    text-shadow: 4px 4px 0px #000, 0 0 20px #FF2020, 0 0 40px #FF2020, 0 0 80px #FF2020;
  }
`;

const floatBurger = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-3deg); }
  50% { transform: translateY(-18px) rotate(3deg); }
`;

const borderGlow = keyframes`
  0%, 100% {
    border-color: #FFD700;
    box-shadow: inset 0 0 20px rgba(255,215,0,0.05), 0 0 20px rgba(255,215,0,0.4);
  }
  50% {
    border-color: #FFE566;
    box-shadow: inset 0 0 40px rgba(255,215,0,0.1), 0 0 40px rgba(255,215,0,0.7);
  }
`;

const insertCoin = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scanMove = keyframes`
  0% { top: 0; }
  100% { top: 100%; }
`;

const Section = styled.section`
  min-height: 100vh;
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #020B2D;

  /* Grid background */
  background-image:
    linear-gradient(rgba(255,215,0,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.04) 1px, transparent 1px);
  background-size: 40px 40px;

  @media (max-width: 768px) {
    padding-top: 72px;
    min-height: 100svh;
  }
`;

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255,255,255,0.02),
    transparent
  );
  animation: ${scanMove} 6s linear infinite;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const TextSide = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
`;

const TagLine = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #00FF41;
  text-shadow: 0 0 10px #00FF41;
  margin-bottom: 20px;
  letter-spacing: 3px;
  animation: ${fadeInUp} 0.6s ease-out;

  &::before {
    content: '▶ ';
  }
`;

const MainTitle = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(28px, 5vw, 52px);
  line-height: 1.3;
  margin-bottom: 12px;
  animation: ${flickerRed} 10s step-end infinite;
  color: #CC1414;
  text-shadow: 4px 4px 0px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;

  span {
    display: block;
    color: #FFD700;
    text-shadow: 3px 3px 0px #000, 0 0 10px rgba(255,215,0,0.5);
    font-size: clamp(20px, 3.5vw, 38px);
    animation: none;
  }
`;

const Subtitle = styled.p`
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #A0A0A0;
  line-height: 1.6;
  margin: 20px 0 36px;
  animation: ${fadeInUp} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease-out 0.4s both;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #000;
  background: #00FF41;
  padding: 16px 24px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 3px solid #00C832;
  transition: all 0.1s;
  letter-spacing: 0.5px;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);

  &:hover {
    background: #00FF80;
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #00C832, 0 0 20px rgba(0,255,65,0.5);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 0 #00C832;
  }

  @media (max-width: 480px) {
    font-size: 8px;
    padding: 14px 18px;
  }
`;

const SecondaryBtn = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #FFD700;
  background: transparent;
  padding: 14px 22px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 3px solid #FFD700;
  transition: all 0.1s;
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(255,215,0,0.1);
    transform: translateY(-3px);
    box-shadow: 0 6px 0 #cc9d00, 0 0 20px rgba(255,215,0,0.4);
  }

  @media (max-width: 480px) {
    font-size: 8px;
    padding: 12px 18px;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 2px solid rgba(255,215,0,0.2);
  animation: ${fadeInUp} 1s ease-out 0.6s both;

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNum = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(14px, 2.5vw, 22px);
  color: #FFD700;
  text-shadow: 2px 2px 0 #000, 0 0 10px rgba(255,215,0,0.5);
`;

const StatLabel = styled.div`
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: #666;
  margin-top: 4px;
  letter-spacing: 1px;
`;

const VisualSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const BurgerPanel = styled.div`
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1;
  background: #0A0A0A;
  border: 4px solid #FFD700;
  animation: ${borderGlow} 3s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* Rivet corners */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #FFD700;
    border-radius: 50%;
  }
  &::before { top: 8px; left: 8px; box-shadow: calc(100% + 340px) 0 0 #FFD700, 0 calc(100% + 340px) 0 #FFD700, calc(100% + 340px) calc(100% + 340px) 0 #FFD700; }
`;

const BurgerEmoji = styled.div`
  font-size: clamp(100px, 15vw, 160px);
  animation: ${floatBurger} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255,215,0,0.4)) drop-shadow(0 10px 20px rgba(0,0,0,0.8));
  user-select: none;
  image-rendering: pixelated;
`;

const PixelBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #CC1414;
  border: 2px solid #FF2020;
  padding: 4px 8px;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #FFF;
  text-shadow: 1px 1px 0 #000;
  animation: ${insertCoin} 1.5s step-end infinite;
`;

const InsertCoin = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFD700;
  text-shadow: 0 0 10px #FFD700;
  animation: ${insertCoin} 1.2s step-end infinite;
  letter-spacing: 2px;
`;

const ScrollMarquee = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #CC1414;
  border-top: 2px solid #FF4040;
  padding: 8px 0;
  overflow: hidden;
`;

const MarqueeInner = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 25s linear infinite;
`;

const MarqueeText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #FFD700;
  white-space: nowrap;
  padding: 0 60px;
  letter-spacing: 2px;

  &::before { content: '★ '; }
`;

export const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const MARQUEE_TEXT = '★ SMASH BURGERS ARTESANAIS  ★  DELIVERY VIA WHATSAPP  ★  ABERTO TODO DIA  ★  COMBOS ESPECIAIS  ★  INGREDIENTES PREMIUM  ★  FEITO NA HORA  ';

  return (
    <Section id="home">
      <ScanLine />
      <Container>
        <TextSide>
          <TagLine>PLAYER 1 — SELECIONE SEU BURGER</TagLine>
          <MainTitle>
            PLAY
            <span>BURGUER</span>
          </MainTitle>
          <Subtitle>
            Os melhores smash burgers artesanais da cidade, feitos com ingredientes selecionados e muito amor. Level up no sabor!
          </Subtitle>
          <ButtonGroup>
            <PrimaryBtn href="https://wa.me/5512991375580" target="_blank">
              📲 PEDIR NO WHATSAPP
            </PrimaryBtn>
            <SecondaryBtn onClick={() => scrollTo('menu')}>
              ☰ VER CARDÁPIO
            </SecondaryBtn>
          </ButtonGroup>
          <Stats>
            <StatItem>
              <StatNum>+430</StatNum>
              <StatLabel>AVALIAÇÕES</StatLabel>
            </StatItem>
            <StatItem>
              <StatNum>5★</StatNum>
              <StatLabel>AVALIAÇÃO</StatLabel>
            </StatItem>
            <StatItem>
              <StatNum>30min</StatNum>
              <StatLabel>ENTREGA</StatLabel>
            </StatItem>
          </Stats>
        </TextSide>

        <VisualSide>
          <BurgerPanel>
            <BurgerEmoji role="img" aria-label="Burger pixel art">🍔</BurgerEmoji>
            <PixelBadge>NEW!</PixelBadge>
          </BurgerPanel>
          <InsertCoin>— INSERT COIN —</InsertCoin>
        </VisualSide>
      </Container>

      <ScrollMarquee>
        <MarqueeInner>
          {[1, 2, 3, 4].map(i => (
            <MarqueeText key={i}>{MARQUEE_TEXT}</MarqueeText>
          ))}
        </MarqueeInner>
      </ScrollMarquee>
    </Section>
  );
};
