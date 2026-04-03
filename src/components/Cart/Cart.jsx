// src/components/Cart/Cart.jsx
import styled, { keyframes, css } from 'styled-components';
import { useCart } from '../../context/CartContext';

// ── Animations ──────────────────────────────────────────────
const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const blink = keyframes`
  0%,49% { opacity: 1; } 50%,100% { opacity: 0; }
`;
const bounce = keyframes`
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.3); }
`;

// ── Floating cart button ─────────────────────────────────────
const FloatBtn = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 1500;
  width: 64px;
  height: 64px;
  background: #FFD700;
  border: 3px solid #cc9d00;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  transition: all 0.15s;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  box-shadow: 0 4px 0 #cc9d00, 0 0 20px rgba(255,215,0,0.4);

  &:hover {
    background: #FFE566;
    transform: translateY(-3px);
    box-shadow: 0 7px 0 #cc9d00, 0 0 30px rgba(255,215,0,0.6);
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    font-size: 22px;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #CC1414;
  border: 2px solid #FF4040;
  color: #FFF;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  animation: ${bounce} 0.3s ease;
`;

// ── Overlay ──────────────────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 11, 45, 0.7);
  z-index: 1800;
  animation: ${fadeIn} 0.2s ease;
  backdrop-filter: blur(2px);
`;

// ── Sidebar ──────────────────────────────────────────────────
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(400px, 96vw);
  background: #0A0A0A;
  border-left: 3px solid #FFD700;
  z-index: 1900;
  display: flex;
  flex-direction: column;
  animation: ${slideInRight} 0.25s ease;
  box-shadow: -8px 0 40px rgba(0,0,0,0.6);

  /* top bar */
  &::before {
    content: '';
    display: block;
    height: 4px;
    background: repeating-linear-gradient(
      90deg, #FFD700 0 20px, #CC1414 20px 40px
    );
    flex-shrink: 0;
  }
`;

const SidebarHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 2px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const CartTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 11px;
  color: #FFD700;
  text-shadow: 2px 2px 0 #000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseBtn = styled.button`
  background: #1a1a1a;
  border: 2px solid #333;
  color: #AAA;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;

  &:hover { border-color: #FFD700; color: #FFD700; }
`;

// ── Items list ───────────────────────────────────────────────
const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #000; }
  &::-webkit-scrollbar-thumb { background: #CC1414; }
`;

const CartItem = styled.div`
  background: #111;
  border: 2px solid #222;
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  transition: border-color 0.1s;

  &:hover { border-color: #333; }
`;

const ItemImg = styled.div`
  width: 60px;
  min-width: 60px;
  height: 60px;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; image-rendering: auto; }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const ItemName = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #FFF;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemBread = styled.div`
  font-family: 'VT323', monospace;
  font-size: 15px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 4px;

  span.dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color || '#555'};
  }
`;

const ItemPrice = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #00FF41;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 6px;
`;

const QtyBtn = styled.button`
  width: 24px;
  height: 24px;
  background: #1a1a1a;
  border: 1px solid #333;
  color: #FFD700;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;

  &:hover { background: #222; border-color: #FFD700; }
`;

const QtyNum = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #FFF;
  min-width: 28px;
  height: 24px;
  background: #111;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  align-self: flex-start;
  transition: color 0.1s;

  &:hover { color: #CC1414; }
`;

// ── Empty state ──────────────────────────────────────────────
const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #333;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  text-align: center;
  padding: 40px;
  line-height: 2;

  div:first-child { font-size: 48px; }
`;

const InsertCoin = styled.div`
  font-size: 7px !important;
  color: #FFD700 !important;
  animation: ${blink} 1.2s step-end infinite;
`;

// ── Footer ───────────────────────────────────────────────────
const SidebarFooter = styled.div`
  padding: 16px 20px;
  border-top: 2px solid #1a1a1a;
  flex-shrink: 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TotalLabel = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #AAA;
`;

const TotalValue = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #00FF41;
  text-shadow: 0 0 8px rgba(0,255,65,0.4);
`;

const WhatsAppBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  color: #000;
  background: #00FF41;
  border: 3px solid #00C832;
  padding: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.1s;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);

  &:hover {
    background: #80FFB0;
    transform: translateY(-2px);
    box-shadow: 0 4px 0 #009920;
  }
`;

const ClearBtn = styled.button`
  width: 100%;
  font-family: 'Press Start 2P', cursive;
  font-size: 7px;
  color: #333;
  background: transparent;
  border: 1px solid #222;
  padding: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.1s;

  &:hover { color: #CC1414; border-color: #CC1414; }
`;

// ── Helpers ──────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

const buildWhatsAppUrl = (items, total) => {
  const phone = '5512991375580';
  const lines = items.map(item =>
    `🍔 *${item.name}* (${item.chosenBread.name}) x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
  );
  const text = encodeURIComponent(
    `Olá! Gostaria de fazer o seguinte pedido:\n\n${lines.join('\n')}\n\n💰 *Total: ${formatPrice(total)}*\n\nPode confirmar disponibilidade?`
  );
  return `https://wa.me/${phone}?text=${text}`;
};

// ── Component ────────────────────────────────────────────────
export const CartButton = () => {
  const { totalItems, setIsOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <FloatBtn onClick={() => setIsOpen(true)} aria-label="Abrir carrinho">
      🛒
      <Badge key={totalItems}>{totalItems}</Badge>
    </FloatBtn>
  );
};

export const CartSidebar = () => {
  const { items, isOpen, setIsOpen, updateQty, removeItem, clearCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={() => setIsOpen(false)} />
      <Sidebar>
        <SidebarHeader>
          <CartTitle>🛒 CARRINHO ({items.length})</CartTitle>
          <CloseBtn onClick={() => setIsOpen(false)}>✕</CloseBtn>
        </SidebarHeader>

        {items.length === 0 ? (
          <Empty>
            <div>🛒</div>
            <div>CARRINHO VAZIO</div>
            <InsertCoin>— ADICIONE ITENS —</InsertCoin>
          </Empty>
        ) : (
          <ItemsList>
            {items.map(item => (
              <CartItem key={item.cartKey}>
                <ItemImg>
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt={item.name} />
                    : '🍔'
                  }
                </ItemImg>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemBread $color={item.chosenBread.color}>
                    <span className="dot" />
                    {item.chosenBread.name}
                  </ItemBread>
                  <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                  <QtyControls>
                    <QtyBtn onClick={() => updateQty(item.cartKey, -1)}>−</QtyBtn>
                    <QtyNum>{item.quantity}</QtyNum>
                    <QtyBtn onClick={() => updateQty(item.cartKey, +1)}>+</QtyBtn>
                  </QtyControls>
                </ItemInfo>
                <RemoveBtn onClick={() => removeItem(item.cartKey)} title="Remover">✕</RemoveBtn>
              </CartItem>
            ))}
          </ItemsList>
        )}

        {items.length > 0 && (
          <SidebarFooter>
            <TotalRow>
              <TotalLabel>TOTAL:</TotalLabel>
              <TotalValue>{formatPrice(totalPrice)}</TotalValue>
            </TotalRow>
            <WhatsAppBtn
              href={buildWhatsAppUrl(items, totalPrice)}
              target="_blank"
              onClick={() => setIsOpen(false)}
            >
              📲 ENVIAR PEDIDO NO WHATSAPP
            </WhatsAppBtn>
            <ClearBtn onClick={clearCart}>✕ LIMPAR CARRINHO</ClearBtn>
          </SidebarFooter>
        )}
      </Sidebar>
    </>
  );
};
