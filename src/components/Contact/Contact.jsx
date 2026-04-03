// src/components/Contact/Contact.jsx
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const greenPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px rgba(0,255,65,0.4), 0 0 30px rgba(0,255,65,0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(0,255,65,0.7), 0 0 50px rgba(0,255,65,0.3);
  }
`;

const titleFlicker = keyframes`
  0%, 18%, 22%, 100% { color: #FFD700; text-shadow: 3px 3px 0px #000; }
  19%, 21% { color: #FFF; text-shadow: 3px 3px 0px #000, 0 0 20px #FFD700; }
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Section = styled.section`
  background: #0A0A0A;
  border-top: 4px solid #FFD700;
  padding: 80px 24px;
  position: relative;
  overflow: hidden;

  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 38px,
      rgba(255,215,0,0.02) 38px,
      rgba(255,215,0,0.02) 40px
    );

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
`;

const Container = styled.div`
  max-width: 900px;
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
`;

const SectionTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(18px, 3.5vw, 28px);
  color: #FFD700;
  text-shadow: 3px 3px 0px #000;
  animation: ${titleFlicker} 12s step-end infinite;
  line-height: 1.4;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    max-width: 100px;
    height: 2px;
    background: #FFD700;
    opacity: 0.4;
  }
  span { font-size: 20px; }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: #111;
  border: 2px solid #333;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeInUp} 0.6s ease-out ${({ $delay }) => $delay || '0s'} both;
  transition: border-color 0.2s;

  &:hover {
    border-color: #FFD700;
  }
`;

const CardIcon = styled.div`
  font-size: 32px;
  margin-bottom: 4px;
`;

const CardTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFD700;
  text-shadow: 1px 1px 0 #000;
  line-height: 1.5;
`;

const CardText = styled.p`
  font-family: 'VT323', monospace;
  font-size: 19px;
  color: #888;
  line-height: 1.5;
`;

const CardValue = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFFFFF;
  line-height: 1.6;
`;

const OnlineIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: #00FF41;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #00FF41;
    border-radius: 50%;
    box-shadow: 0 0 6px #00FF41;
    animation: ${blink} 1.5s step-end infinite;
  }
`;

const MainCTA = styled.div`
  background: #0D1A0D;
  border: 3px solid #00FF41;
  padding: 40px;
  text-align: center;
  animation: ${greenPulse} 3s ease-in-out infinite;

  @media (max-width: 640px) {
    padding: 28px 20px;
  }
`;

const CTATitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(14px, 2.5vw, 20px);
  color: #FFFFFF;
  text-shadow: 2px 2px 0 #000;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const CTASubtitle = styled.p`
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #00FF41;
  margin-bottom: 32px;
  letter-spacing: 2px;
`;

const WhatsAppBtn = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 11px;
  color: #000;
  background: #00FF41;
  padding: 18px 32px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  border: 3px solid #00C832;
  transition: all 0.1s;
  letter-spacing: 0.5px;

  &:hover {
    background: #80FFB0;
    transform: translateY(-4px);
    box-shadow: 0 6px 0 #00A020, 0 0 30px rgba(0,255,65,0.5);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 0 #00A020;
  }

  span.icon {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
    padding: 14px 20px;
    gap: 10px;
  }
`;

const CTANote = styled.p`
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: #444;
  margin-top: 20px;
  letter-spacing: 1px;
`;

const Cursor = styled.span`
  animation: ${blink} 1s step-end infinite;
  color: #00FF41;
`;

export const Contact = () => {
  return (
    <Section id="contact">
      <Container>
        <SectionHeader>
          <SectionLabel>FALE CONOSCO</SectionLabel>
          <SectionTitle>✉ CONTATO & PEDIDOS</SectionTitle>
          <Divider><span>📲</span></Divider>
        </SectionHeader>

        <ContactGrid>
          <InfoCard $delay="0s">
            <CardIcon>📍</CardIcon>
            <CardTitle>LOCALIZAÇÃO</CardTitle>
            <CardText>Nos encontre aqui:</CardText>
            <CardValue>
              R. Dr. Monteiro César - 168<br />
              Centro<br />
              Pindamonhangaba - SP
            </CardValue>
          </InfoCard>

          <InfoCard $delay="0.1s">
            <CardIcon>🕐</CardIcon>
            <CardTitle>HORÁRIO</CardTitle>
            <CardText>Quando estamos online:</CardText>
            <CardValue>Terça a Domingos - 18h ás 23h30</CardValue>
            <OnlineIndicator>ABERTO AGORA</OnlineIndicator>
          </InfoCard>

          <InfoCard $delay="0.2s">
            <CardIcon>📲</CardIcon>
            <CardTitle>WHATSAPP</CardTitle>
            <CardText>Pedidos e dúvidas:</CardText>
            <CardValue>(12) 99137-5580</CardValue>
            <CardText>Resposta em minutos!</CardText>
          </InfoCard>

          <InfoCard $delay="0.3s">
            <CardIcon>🛵</CardIcon>
            <CardTitle>DELIVERY</CardTitle>
            <CardText>Entregamos em:</CardText>
            <CardValue>Raio de 10 km</CardValue>
            <CardText>Taxa de entrega a partir de R$ 5,00</CardText>
          </InfoCard>
        </ContactGrid>

        <MainCTA>
          <CTATitle>PRONTO PARA PEDIR?<Cursor>_</Cursor></CTATitle>
          <CTASubtitle>ENVIE SUA MENSAGEM DIRETO NO WHATSAPP!</CTASubtitle>
          <WhatsAppBtn href="https://wa.me/5512991375580" target="_blank">
            <span className="icon">📱</span>
            FALAR NO WHATSAPP
          </WhatsAppBtn>
          <CTANote>
            ▶ Atendimento rápido · Pagamento na entrega · Aceitamos PIX e cartão
          </CTANote>
        </MainCTA>
      </Container>
    </Section>
  );
};
