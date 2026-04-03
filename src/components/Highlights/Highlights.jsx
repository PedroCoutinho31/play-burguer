// src/components/Highlights/Highlights.jsx
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const cardHoverGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(204,20,20,0.3); }
  50% { box-shadow: 0 0 25px rgba(204,20,20,0.6), 0 0 50px rgba(204,20,20,0.2); }
`;

const titleFlicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    color: #FFD700;
    text-shadow: 3px 3px 0px #000, 0 0 10px rgba(255,215,0,0.4);
  }
  19%, 21%, 54%, 56% {
    color: #FFF;
    text-shadow: 3px 3px 0px #000, 0 0 30px #FFD700;
  }
`;

const Section = styled.section`
  background: #0A0A0A;
  padding: 80px 24px;
  position: relative;
  overflow: hidden;

  /* Corrugated/rivet panel texture */
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 38px,
      rgba(255,215,0,0.03) 38px,
      rgba(255,215,0,0.03) 40px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 38px,
      rgba(255,255,255,0.02) 38px,
      rgba(255,255,255,0.02) 40px
    );

  border-top: 4px solid #FFD700;
  border-bottom: 4px solid #FFD700;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      #FFD700 0px, #FFD700 20px,
      #CC1414 20px, #CC1414 40px
    );
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      #CC1414 0px, #CC1414 20px,
      #FFD700 20px, #FFD700 40px
    );
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 56px;
`;

const SectionLabel = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #00FF41;
  text-shadow: 0 0 10px #00FF41;
  letter-spacing: 4px;
  margin-bottom: 16px;

  &::before { content: '>> '; }
  &::after { content: ' <<'; }
`;

const SectionTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(18px, 3.5vw, 28px);
  color: #FFD700;
  text-shadow: 3px 3px 0px #000;
  animation: ${titleFlicker} 12s step-end infinite;
  line-height: 1.4;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;

  &::before, &::after {
    content: '';
    flex: 1;
    max-width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #FFD700);
  }
  &::after {
    background: linear-gradient(to left, transparent, #FFD700);
  }

  span {
    font-size: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #111;
  border: 3px solid #333;
  position: relative;
  transition: all 0.15s ease;
  cursor: pointer;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out ${({ $delay }) => $delay || '0s'} both;

  &:hover {
    border-color: #CC1414;
    transform: translateY(-6px);
    animation: ${cardHoverGlow} 2s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #CC1414;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.2) contrast(1.05);
    transition: transform 0.3s ease;
    image-rendering: auto;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CardBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #CC1414;
  border: 2px solid #FF4040;
  padding: 4px 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #FFF;
  text-shadow: 1px 1px 0 #000;
  z-index: 1;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const CardName = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 11px;
  color: #FFFFFF;
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const CardDesc = styled.p`
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: #888;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Price = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #00FF41;
  text-shadow: 0 0 8px rgba(0,255,65,0.5);
`;

const OrderBtn = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #000;
  background: #FFD700;
  padding: 10px 14px;
  text-decoration: none;
  border: 2px solid #cc9d00;
  cursor: pointer;
  transition: all 0.1s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);

  &:hover {
    background: #FFF;
    transform: scale(1.05);
  }
`;

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

const buildWhatsAppUrl = (item) => {
  const phone = '5500000000000'; // ← altere para o número real
  const text = encodeURIComponent(
    `Olá! Gostaria de pedir:\n\n🍔 *${item.name}*\n${item.description}\n\n💰 Valor: ${formatPrice(item.price)}\n\nPode confirmar disponibilidade?`
  );
  return `https://wa.me/${phone}?text=${text}`;
};

export const Highlights = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <Section id="highlights">
      <Container>
        <SectionHeader>
          <SectionLabel>SELEÇÃO ESPECIAL</SectionLabel>
          <SectionTitle>★ DESTAQUES DA CASA ★</SectionTitle>
          <Divider><span>🍔</span></Divider>
        </SectionHeader>

        <Grid>
          {items.slice(0, 4).map((item, i) => (
            <Card key={item.id} $delay={`${i * 0.1}s`}>
              <CardImage>
                <img src={item.imageUrl} alt={item.name} loading="lazy" />
                <CardBadge>DESTAQUE</CardBadge>
              </CardImage>
              <CardBody>
                <CardName>{item.name}</CardName>
                <CardDesc>{item.description}</CardDesc>
                <CardFooter>
                  <Price>{formatPrice(item.price)}</Price>
                  <OrderBtn href={buildWhatsAppUrl(item)} target="_blank">
                    📲 PEDIR
                  </OrderBtn>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
