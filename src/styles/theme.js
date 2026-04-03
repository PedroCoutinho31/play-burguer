// src/styles/theme.js

export const theme = {
  colors: {
    // Backgrounds
    bgDeep: '#020B2D',        // Azul escuro profundo (da imagem 2)
    bgPanel: '#0A0A0A',       // Painéis pretos
    bgPanelAlt: '#111111',    // Alternativo
    bgContainer: '#0D0D1A',   // Containers

    // Brand / Accents
    red: '#CC1414',           // Vermelho principal (da logo)
    redBright: '#FF2020',     // Vermelho hover
    yellow: '#FFD700',        // Amarelo vibrante (bordas e divisores)
    yellowLight: '#FFE566',   // Amarelo claro
    green: '#00FF41',         // Verde neon
    greenDark: '#00C832',     // Verde dark

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    textAccent: '#FFD700',

    // Borders
    borderYellow: '#FFD700',
    borderRed: '#CC1414',
    borderGreen: '#00FF41',
  },
  fonts: {
    pixel: "'Press Start 2P', cursive",
    retro: "'VT323', monospace",
  },
  shadows: {
    redGlow: '0 0 10px #CC1414, 0 0 20px #CC1414, 0 0 40px #CC1414',
    yellowGlow: '0 0 8px #FFD700, 0 0 16px #FFD700',
    greenGlow: '0 0 8px #00FF41, 0 0 16px #00FF41',
    textRed: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
    textYellow: '3px 3px 0px #000, -1px -1px 0px #000',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};
