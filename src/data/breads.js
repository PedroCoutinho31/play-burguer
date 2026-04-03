// src/data/breads.js
// ─────────────────────────────────────────────────────────────
//  GUIA DE CONFIGURAÇÃO DOS PÃES
//  Altere os 6 itens abaixo conforme os pães reais da sua loja.
//
//  Campos de cada pão:
//    id       → identificador único (não altere após subir pedidos)
//    name     → nome exibido no modal (ex: "Pão Brioche")
//    emoji    → emoji de fallback (usado se imageUrl estiver vazio)
//    imageUrl → URL da foto do pão (Firebase Storage, ImgBB, etc.)
//               Deixe "" para usar só o emoji
//    color    → cor de destaque do card quando selecionado
//               Use qualquer cor CSS válida
//
//  TAMANHO IDEAL DA FOTO: 200×200 px, formato JPG ou WebP
// ─────────────────────────────────────────────────────────────

export const BREADS = [
  {
    id: 'brioche',
    name: 'Brioche',
    emoji: '🍞',
    imageUrl: '', // ex: 'https://i.ibb.co/abc/brioche.jpg'
    color: '#D4A017',
  },
  {
    id: 'vermelho',
    name: 'Pão Vermelho',
    emoji: '🔴',
    imageUrl: '',
    color: '#CC1414',
  },
  {
    id: 'azul',
    name: 'Pão Azul',
    emoji: '🔵',
    imageUrl: '',
    color: '#1565C0',
  },
  {
    id: 'verde',
    name: 'Pão Verde',
    emoji: '🟢',
    imageUrl: '',
    color: '#2E7D32',
  },
  {
    id: 'preto',
    name: 'Pão Preto',
    emoji: '⚫',
    imageUrl: '',
    color: '#555555',
  },
  {
    id: 'rosa',
    name: 'Pão Rosa',
    emoji: '🌸',
    imageUrl: '',
    color: '#C2185B',
  },
];
