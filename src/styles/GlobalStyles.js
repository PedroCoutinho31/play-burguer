// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --bg-deep: #020B2D;
    --bg-panel: #0A0A0A;
    --red: #CC1414;
    --red-bright: #FF2020;
    --yellow: #FFD700;
    --green: #00FF41;
    --white: #FFFFFF;
    --font-pixel: 'Press Start 2P', cursive;
    --font-retro: 'VT323', monospace;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    background-color: #020B2D;
    color: #FFFFFF;
    font-family: 'Press Start 2P', cursive;
    overflow-x: hidden;
    cursor: default;

    /* CRT scanline overlay */
    &::before {
      content: '';
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.07) 2px,
        rgba(0, 0, 0, 0.07) 4px
      );
      pointer-events: none;
      z-index: 9999;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #020B2D;
    border-left: 1px solid #FFD700;
  }
  ::-webkit-scrollbar-thumb {
    background: #CC1414;
    border: 1px solid #FFD700;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #FF2020;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }

  /* Utility animations */
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @keyframes flickerOn {
    0%   { opacity: 1; }
    3%   { opacity: 0.6; }
    6%   { opacity: 1; }
    10%  { opacity: 0.8; }
    13%  { opacity: 1; }
    50%  { opacity: 1; }
    53%  { opacity: 0.7; }
    56%  { opacity: 1; }
    100% { opacity: 1; }
  }

  @keyframes neonPulse {
    0%, 100% {
      text-shadow: 3px 3px 0px #000, 0 0 10px currentColor, 0 0 20px currentColor;
    }
    50% {
      text-shadow: 3px 3px 0px #000, 0 0 5px currentColor;
    }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes marqueeLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pixelFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes borderFlicker {
    0%, 100% { border-color: #FFD700; box-shadow: 0 0 8px #FFD700; }
    25% { border-color: #FFD700; box-shadow: 0 0 16px #FFD700, 0 0 32px #FFD700; }
    50% { border-color: #FFE566; box-shadow: 0 0 4px #FFD700; }
    75% { border-color: #FFD700; box-shadow: 0 0 12px #FFD700; }
  }

  @keyframes redFlicker {
    0%, 100% { color: #CC1414; text-shadow: 3px 3px 0px #000; }
    10% { color: #FF2020; text-shadow: 3px 3px 0px #000, 0 0 20px #FF2020; }
    20% { color: #CC1414; text-shadow: 3px 3px 0px #000; }
    90% { color: #CC1414; text-shadow: 3px 3px 0px #000; }
    95% { color: #FF6060; text-shadow: 3px 3px 0px #000, 0 0 10px #FF2020; }
  }

  @keyframes insertCoin {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @keyframes slideInLeft {
    from { transform: translateX(-60px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideInRight {
    from { transform: translateX(60px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes zoomIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;
