# 🍔 PLAY BURGUER — Landing Page SPA

Landing page retro-arcade para hamburgueria, construída com **React + Vite + Firebase**.

---

## 🎮 Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **React 18** | UI / Componentes |
| **Vite 5** | Build tool / Dev server |
| **Styled Components** | CSS-in-JS / Tema |
| **Firebase Firestore** | Cardápio em tempo real |
| **Press Start 2P** | Fonte principal pixel-art |
| **VT323** | Fonte retro secundária |

---

## 📁 Estrutura de Pastas

```
play-burguer/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header/         ← Navbar fixa com logo e CTA
│   │   ├── Hero/           ← Banner principal com animações
│   │   ├── Highlights/     ← Seção de destaques/combos
│   │   ├── Menu/           ← Cardápio completo com filtros
│   │   ├── Contact/        ← Contato + CTA WhatsApp
│   │   └── Footer/         ← Rodapé completo
│   ├── firebase/
│   │   └── config.js       ← ⚠️ Configure aqui suas credenciais
│   ├── hooks/
│   │   └── useMenu.js      ← Hook Firestore + fallback mock
│   ├── styles/
│   │   ├── GlobalStyles.js ← Reset + animações globais + CRT
│   │   └── theme.js        ← Paleta de cores e tipografia
│   ├── App.jsx
│   └── main.jsx
├── firestore.rules         ← Regras de segurança do Firestore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Setup Inicial

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um projeto novo
3. Habilite **Firestore Database**
4. Vá em **Project Settings → General → Your Apps → Web App**
5. Copie as credenciais para `src/firebase/config.js`:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

### 3. Popular o Firestore
Na collection `menu`, crie documentos com esta estrutura:

```json
{
  "name": "Double Stack 404",
  "description": "Dois smash burgers, cheddar, bacon, molho especial",
  "price": 32.90,
  "imageUrl": "https://...",
  "category": "burgers",
  "isHighlight": true,
  "available": true
}
```

**Categorias disponíveis:**
- `burgers`
- `combos`
- `bebidas`
- `acompanhamentos`
- `sobremesas`

### 4. Configurar WhatsApp
Em `src/hooks/useMenu.js` e nos componentes, substitua:
```js
const phone = '5512991375580';
// por:
const phone = '55' + 'DDD' + 'NUMERO'; // ex: '5511999990000'
```

### 5. Executar em desenvolvimento
```bash
npm run dev
```

### 6. Build para produção
```bash
npm run build
npm run preview
```

---

## 🎨 Personalização

### Cores (src/styles/theme.js)
```js
colors: {
  bgDeep: '#020B2D',    // Fundo principal
  red: '#CC1414',       // Vermelho da marca
  yellow: '#FFD700',    // Bordas e destaques
  green: '#00FF41',     // Neon verde / CTA
}
```

### Dados do restaurante
Pesquise por `5512991375580` e substitua pelo número real de WhatsApp.
Pesquise por `Rua dos Pixels, 404` para alterar o endereço.
Pesquise por `(11) 90000-0000` para alterar o telefone.

---

## ✨ Features Implementadas

- [x] Estética retro arcade com fonte Press Start 2P
- [x] Efeito CRT scanlines na página inteira
- [x] Animação de flicker/piscando nos títulos principais
- [x] Banner hero com burger flutuante e grid animado
- [x] Seção de destaques com cards hover animados
- [x] Cardápio completo com filtros por categoria
- [x] Integração Firebase Firestore (com fallback de mock data)
- [x] CTA WhatsApp em cada item do cardápio
- [x] Header fixo responsivo com nav mobile
- [x] Marquee scrolling animado
- [x] Borda amarela pulsante e efeitos neon
- [x] Scrollbar customizada estilo arcade
- [x] Totalmente responsivo (mobile/tablet/desktop)
- [x] Banner de modo demo quando Firebase não configurado

---

## 📦 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

*Desenvolvido com ❤️ e muita nostalgia de fliperama*
