// src/components/Menu/Menu.jsx
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scanPulse = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const titleFlicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% { color: #CC1414; text-shadow: 3px 3px 0px #000; }
  19%, 21%, 54%, 56% { color: #FF6060; text-shadow: 3px 3px 0px #000, 0 0 20px #FF2020; }
`;

const Section = styled.section`
  background: #020B2D;
  padding: 80px 24px;
  position: relative;

  background-image:
    linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
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
  color: #CC1414;
  text-shadow: 3px 3px 0px #000;
  animation: ${titleFlicker} 10s step-end infinite;
  line-height: 1.4;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-family: 'VT323', monospace;
  font-size: 20px;
  color: #555;
  letter-spacing: 2px;
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
    max-width: 140px;
    height: 2px;
    background: #CC1414;
    opacity: 0.5;
  }

  span { font-size: 18px; }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
  justify-content: center;
`;

const Tab = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: ${({ $active }) => ($active ? '#000' : '#FFD700')};
  background: ${({ $active }) => ($active ? '#FFD700' : 'transparent')};
  border: 2px solid #FFD700;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.1s;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ $active }) => ($active ? '#FFE566' : 'rgba(255,215,0,0.15)')};
    box-shadow: 0 0 12px rgba(255,215,0,0.4);
  }

  @media (max-width: 480px) {
    font-size: 7px;
    padding: 8px 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #0A0A0A;
  border: 2px solid #222;
  display: flex;
  flex-direction: row;
  gap: 0;
  position: relative;
  transition: all 0.15s ease;
  overflow: hidden;
  animation: ${fadeInUp} 0.5s ease-out ${({ $delay }) => $delay} both;

  &:hover {
    border-color: #FFD700;
    transform: translateY(-4px);
    box-shadow: 0 4px 0 #cc9d00, 0 0 20px rgba(255,215,0,0.15);
  }

  /* Left accent bar */
  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #333;
    transition: background 0.2s;
  }

  &:hover::before {
    background: #FFD700;
  }
`;

const CardImg = styled.div`
  width: 120px;
  min-width: 120px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    image-rendering: auto;
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const CardContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardName = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFFFFF;
  line-height: 1.5;
`;

const CardDesc = styled.p`
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: #666;
  line-height: 1.4;
  flex: 1;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 4px;
`;

const Price = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 11px;
  color: #00FF41;
  text-shadow: 0 0 6px rgba(0,255,65,0.4);
`;

const OrderBtn = styled.a`
  font-family: 'Press Start 2P', cursive;
  font-size: 6px;
  color: #000;
  background: #00FF41;
  padding: 8px 10px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.1s;
  border: 2px solid #00C832;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  &:hover {
    background: #80FFB0;
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  font-family: 'Press Start 2P', cursive;
  color: #333;
  font-size: 10px;
  line-height: 2;

  div:first-child { font-size: 48px; margin-bottom: 16px; }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 80px 24px;

  div {
    font-family: 'Press Start 2P', cursive;
    color: #FFD700;
    font-size: 10px;
    letter-spacing: 3px;
  }

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #FFD700;
    margin: 20px auto;
    animation: ${scanPulse} 1s step-end infinite;
  }
`;

const CATEGORY_LABELS = {
  burgers: '🍔 BURGERS',
  combos: '🎮 COMBOS',
  bebidas: '🥤 BEBIDAS',
  acompanhamentos: '🍟 ACOMPANHAMENTOS',
  sobremesas: '🍦 SOBREMESAS',
};

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

const buildWhatsAppUrl = (item) => {
  const phone = '5500000000000';
  const text = encodeURIComponent(
    `Olá! Gostaria de pedir:\n\n🍔 *${item.name}*\n${item.description}\n\n💰 Valor: ${formatPrice(item.price)}\n\nPode confirmar disponibilidade?`
  );
  return `https://wa.me/${phone}?text=${text}`;
};

export const Menu = ({ menuItems = [], categories = [], loading = false }) => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filtered =
    activeCategory === 'todos'
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory);

  return (
    <Section id="menu">
      <Container>
        <SectionHeader>
          <SectionLabel>BANCO DE DADOS DE SABORES</SectionLabel>
          <SectionTitle>☰ CARDÁPIO COMPLETO</SectionTitle>
          <SubTitle>SELECIONE SEU NÍVEL DE SABOR</SubTitle>
          <Divider><span>🎮</span></Divider>
        </SectionHeader>

        <CategoryTabs>
          <Tab
            $active={activeCategory === 'todos'}
            onClick={() => setActiveCategory('todos')}
          >
            🕹️ TODOS
          </Tab>
          {categories.map(cat => (
            <Tab
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat] || cat.toUpperCase()}
            </Tab>
          ))}
        </CategoryTabs>

        {loading ? (
          <LoadingState>
            <div>CARREGANDO CARDÁPIO...</div>
          </LoadingState>
        ) : filtered.length === 0 ? (
          <EmptyState>
            <div>🚫</div>
            <div>NENHUM ITEM</div>
            <div>NESTA CATEGORIA</div>
          </EmptyState>
        ) : (
          <Grid>
            {filtered.map((item, i) => (
              <Card key={item.id} $delay={`${(i % 8) * 0.05}s`}>
                <CardImg>
                  <img src={item.imageUrl} alt={item.name} loading="lazy" />
                </CardImg>
                <CardContent>
                  <CardName>{item.name}</CardName>
                  <CardDesc>{item.description}</CardDesc>
                  <CardBottom>
                    <Price>{formatPrice(item.price)}</Price>
                    <OrderBtn href={buildWhatsAppUrl(item)} target="_blank">
                      📲 PEDIR
                    </OrderBtn>
                  </CardBottom>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
};
