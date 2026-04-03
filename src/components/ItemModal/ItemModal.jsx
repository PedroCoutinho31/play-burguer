// src/components/ItemModal/ItemModal.jsx
import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useCart } from '../../context/CartContext';
import { BREADS } from '../../data/breads';

// ── Animations ──────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
`;
const borderPulse = keyframes`
  0%,100% { box-shadow: 0 0 0 2px currentColor; }
  50%      { box-shadow: 0 0 0 2px currentColor, 0 0 12px currentColor; }
`;
const shake = keyframes`
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-6px); }
  40%     { transform: translateX(6px); }
  60%     { transform: translateX(-4px); }
  80%     { transform: translateX(4px); }
`;

// ── Overlay ──────────────────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 11, 45, 0.88);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease;
  backdrop-filter: blur(3px);
`;

// ── Modal box ────────────────────────────────────────────────
const Modal = styled.div`
  background: #0A0A0A;
  border: 3px solid #FFD700;
  box-shadow: 0 0 40px rgba(255,215,0,0.25), inset 0 0 60px rgba(0,0,0,0.6);
  width: 100%;
  max-width: 560px;
  max-height: 92vh;
  overflow-y: auto;
  animation: ${slideUp} 0.25s ease;
  position: relative;

  /* top color bar */
  &::before {
    content: '';
    display: block;
    height: 4px;
    background: repeating-linear-gradient(
      90deg, #FFD700 0 20px, #CC1414 20px 40px
    );
  }

  /* custom scrollbar inside modal */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #000; }
  &::-webkit-scrollbar-thumb { background: #CC1414; }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: #CC1414;
  border: 2px solid #FF4040;
  color: #FFF;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
  z-index: 1;

  &:hover { background: #FF2020; }
`;

// ── Image area ───────────────────────────────────────────────
const ImageArea = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  background: #111;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: saturate(1.1);
    image-rendering: auto;
  }
`;

const NoImage = styled.div`
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  background: radial-gradient(circle at 50% 50%, #1a1a2e, #0A0A0A);
`;

const PriceBadge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: #0A0A0A;
  border: 2px solid #00FF41;
  padding: 6px 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #00FF41;
  text-shadow: 0 0 8px rgba(0,255,65,0.5);
`;

// ── Body ─────────────────────────────────────────────────────
const Body = styled.div`
  padding: 20px 24px 24px;
`;

const ItemName = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(12px, 2.5vw, 16px);
  color: #FFD700;
  text-shadow: 2px 2px 0 #000;
  margin-bottom: 12px;
  line-height: 1.4;
  padding-right: 36px;
`;

const ItemDesc = styled.p`
  font-family: 'VT323', monospace;
  font-size: 19px;
  color: #888;
  line-height: 1.5;
  margin-bottom: 24px;
  border-left: 3px solid #222;
  padding-left: 12px;
`;

// ── Bread section ────────────────────────────────────────────
const SectionLabel = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #FFFFFF;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;

  span.req {
    font-size: 6px;
    color: #CC1414;
    border: 1px solid #CC1414;
    padding: 2px 5px;
  }
`;

const SectionSub = styled.p`
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: #555;
  margin-bottom: 14px;
`;

const BreadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 4px;

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BreadCard = styled.button`
  background: #111;
  border: 2px solid ${({ $selected, $color }) => $selected ? $color : '#333'};
  padding: 10px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: all 0.1s;
  position: relative;
  color: ${({ $selected, $color }) => $selected ? $color : '#666'};

  ${({ $selected, $color }) => $selected && css`
    background: ${$color}15;
    animation: ${borderPulse} 2s ease-in-out infinite;
  `}

  &:hover {
    border-color: ${({ $color }) => $color};
    background: ${({ $color }) => $color}10;
  }
`;

const BreadImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  font-size: 32px;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    image-rendering: auto;
  }
`;

const BreadName = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 6px;
  line-height: 1.5;
  text-align: center;
  color: inherit;
`;

const CheckMark = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: #fff;
`;

// ── Error hint ───────────────────────────────────────────────
const ErrorHint = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #CC1414;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${shake} 0.4s ease;
`;

// ── Quantity row ─────────────────────────────────────────────
const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin: 20px 0 0;
`;

const QtyLabel = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #AAA;
  margin-right: 16px;
`;

const QtyBtn = styled.button`
  width: 36px;
  height: 36px;
  background: #1a1a1a;
  border: 2px solid #333;
  color: #FFD700;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;

  &:hover { border-color: #FFD700; background: #222; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

const QtyNum = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #FFFFFF;
  min-width: 40px;
  text-align: center;
  background: #111;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
`;

// ── Add to cart button ───────────────────────────────────────
const AddBtn = styled.button`
  width: 100%;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #000;
  background: #00FF41;
  border: 3px solid #00C832;
  padding: 16px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.1s;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  letter-spacing: 0.5px;

  &:hover {
    background: #80FFB0;
    transform: translateY(-2px);
    box-shadow: 0 4px 0 #009920;
  }
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

// ── Divider ──────────────────────────────────────────────────
const Divider = styled.div`
  height: 1px;
  background: #1a1a1a;
  margin: 20px 0;
`;

// ── Helpers ──────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

// ── Component ────────────────────────────────────────────────
export const ItemModal = ({ item, onClose }) => {
  const { addItem } = useCart();
  const CATEGORIES_WITH_BREAD = ['burgers', 'smash'];
  const hasBread = CATEGORIES_WITH_BREAD.includes(item.category);
  const [selectedBread, setSelectedBread] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);

  // close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = () => {
    if (hasBread && !selectedBread) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    addItem(item, hasBread ? selectedBread : { id: 'none', name: '—', color: '#555' }, quantity);
    onClose();
  };

  return (
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <Modal>
        <CloseBtn onClick={onClose}>✕</CloseBtn>

        {/* ── Image ── */}
        <ImageArea>
          {item.imageUrl
            ? <img src={item.imageUrl} alt={item.name} />
            : <NoImage>🍔</NoImage>
          }
          <PriceBadge>{formatPrice(item.price)}</PriceBadge>
        </ImageArea>

        <Body>
          {/* ── Name & desc ── */}
          <ItemName>{item.name}</ItemName>
          <ItemDesc>{item.description}</ItemDesc>

          <Divider />

          {/* ── Bread selection ── */}
          {hasBread && (
  <>
          {/* Se você tiver um componente <Divider /> ou similar, coloque-o aqui */}
          <SectionLabel>
             ESCOLHA O PÃO <span className="req">OBRIGATÓRIO</span>
          </SectionLabel>
          <SectionSub>Selecione 1 opção para continuar</SectionSub>
                
          <BreadGrid>
            {BREADS.map(bread => (
              <BreadCard
               key={bread.id}
                $selected={selectedBread?.id === bread.id}
                $color={bread.color}
                onClick={() => { setSelectedBread(bread); setShowError(false); }}
              >
               <BreadImg>
                  {bread.imageUrl
                    ? <img src={bread.imageUrl} alt={bread.name} />
                    : bread.emoji
                  }
               </BreadImg>
               <BreadName>{bread.name}</BreadName>
                {selectedBread?.id === bread.id && (
                  <CheckMark $color={bread.color}>✓</CheckMark>
                )}
              </BreadCard>
            ))}
          </BreadGrid>
          
          {showError && (
           <ErrorHint key={Date.now()}>
              ⚠ SELECIONE UM PÃO PARA CONTINUAR
           </ErrorHint>
          )}
        </>
      )}
 
          <Divider />

          {/* ── Quantity ── */}
          <QuantityRow>
            <QtyLabel>QTDE:</QtyLabel>
            <QtyBtn onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>−</QtyBtn>
            <QtyNum>{quantity}</QtyNum>
            <QtyBtn onClick={() => setQuantity(q => Math.min(10, q + 1))}>+</QtyBtn>
          </QuantityRow>

          {/* ── Add to cart ── */}
          <AddBtn onClick={handleAdd}>
            🛒 ADICIONAR AO CARRINHO
            <span style={{ opacity: 0.7 }}>
              {formatPrice(item.price * quantity)}
            </span>
          </AddBtn>
        </Body>
      </Modal>
    </Overlay>
  );
};
