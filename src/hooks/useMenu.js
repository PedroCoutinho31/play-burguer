// src/hooks/useMenu.js
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

// ── Mock data com os itens da Play Burguer ──────────────────────────────────
const MOCK_MENU = [
  // --- BURGERS TEMÁTICOS ---
  {
    id: 'pac-man',
    name: 'PAC MAN',
    description: 'Pão de brioche, carne de 120g, alface americana, cebola roxa, tomate, geleia de bacon, queijo e maionese da casa.',
    price: 28.90,
    imageUrl: '/pacman.jpg', 
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: 'crash',
    name: 'CRASH',
    description: 'Pão de brioche, burguer de 120g, queijo, geleia de bacon, molho cheddar, alface americana, tomate, cebola roxa e maionese da casa.',
    price: 30.90,
    imageUrl: '/crash.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'detona-ralph',
    name: 'DETONA RALPH',
    description: 'Pão vermelho ou brioche, burguer de 120g, bacon crocante, queijo, molho cheddar, alface americana, tomate, cebola roxa e maionese da casa.',
    price: 29.90,
    imageUrl: '/detonaralph.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'luigi',
    name: 'LUIGI',
    description: 'Pão verde ou brioche, burguer de 120g, queijo, alface americana, tomate e maionese da casa.',
    price: 22.90,
    imageUrl: '/luigi.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'top-gear',
    name: 'TOP GEAR',
    description: 'Pão de brioche, burguer de 120g, queijo, bacon, ovo, alface americana, tomate, cebola roxa e maionese da casa.',
    price: 29.90,
    imageUrl: '/topgear.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'sonic',
    name: 'SONIC',
    description: 'Pão azul ou brioche, burguer de 120g, queijo, bacon, anéis de cebola empanada, molho cheddar, alface americana, tomate, cebola roxa e maionese da casa.',
    price: 30.90,
    imageUrl: '/sonic.jpg',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: 'super-mario',
    name: 'SUPER MARIO',
    description: 'Pão vermelho ou brioche, burguer de 120g, queijo, ovo, alface americana, tomate e maionese da casa.',
    price: 23.90,
    imageUrl: '/supermario.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'metal-slug',
    name: 'METAL SLUG',
    description: 'Pão preto ou brioche, burguer de 120g, cheddar em fatias, bacon crocante e maionese da casa.',
    price: 27.90,
    imageUrl: '/metalslug.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'kong-jr',
    name: 'KONG JR.',
    description: 'Pão brioche, burguer de 120g, queijo, onion bacon (anel de cebola enrolado com bacon), geleia de bacon, alface americana, tomate, cebola roxa e maionese da casa.',
    price: 34.90,
    imageUrl: '/kongjr.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'street-fighter',
    name: 'STREET FIGHTER',
    description: 'Pão de brioche, burguer de 120g, queijo, cebola caramelizada, bacon crocante, tomate cereja, alface americana e maionese da casa.',
    price: 29.90,
    imageUrl: '/streetfighter.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'donkey-kong',
    name: 'DONKEY KONG',
    description: 'Pão de brioche, 2 burguers de 120g, queijo, bacon, onion bacon, molho cheddar, tomate cereja, alface americana e maionese da casa.',
    price: 38.90,
    imageUrl: '/donkeykong.jpg',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: 'zelda',
    name: 'ZELDA',
    description: 'Pão verde, 2 burguers de 120g, queijo, bacon, molho cheddar e maionese da casa.',
    price: 35.90,
    imageUrl: '/zelda.jpg',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: 'mega-man',
    name: 'MEGA MAN',
    description: 'Pão azul ou brioche, burguer de 120g, queijo, bacon, doritos, molho de pimenta jalapeño, alface americana, tomate, cebola roxa e maionese da casa.',
    price: 30.90,
    imageUrl: '/megaman.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'mortal-kombat',
    name: 'MORTAL KOMBAT',
    description: 'Pão preto ou brioche, 3 burguers de 120g, 3 camadas de bacon, 3 camadas de queijo, cebola caramelizada, molho cheddar, alface americana, tomate e maionese da casa.',
    price: 38.90,
    imageUrl: '/mortalkombat.jpg',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: 'yoshi',
    name: 'YOSHI',
    description: 'Pão verde ou brioche, burguer de 120g, queijo prato e maionese da casa.',
    price: 20.90,
    imageUrl: '/yoshi.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: 'bomberman',
    name: 'BOMBERMAN',
    description: 'Pão brioche, burguer de 120g, queijo gratinado, fatias de bacon, geleia de abacaxi, alface americana, tomate e cebola roxa.',
    price: 25.90,
    imageUrl: '/bomberman.jpg',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },

  // --- DUPLO SMASH PLAY ---
  {
    id: 'smash-cheddar',
    name: 'Duplo Smash Cheddar',
    description: '2 carnes de 60g, pão brioche, cheddar, tomate, alface, cebola roxa e maionese.',
    price: 32.90,
    imageUrl: '/duplocheddar.jpg',
    category: 'smash',
    isHighlight: false,
    available: true,
  },
  {
    id: 'smash-bacon',
    name: 'Duplo Smash Bacon',
    description: '2 carnes de 60g, pão brioche, bacon, cheddar, tomate, alface e cebola roxa.',
    price: 34.90,
    imageUrl: '/duplobacon.jpg',
    category: 'smash',
    isHighlight: false,
    available: true,
  },
  {
    id: 'smash-egg',
    name: 'Duplo Smash Egg',
    description: '2 carnes de 60g, pão brioche, ovo, cheddar, tomate, alface e cebola roxa.',
    price: 31.90,
    imageUrl: '/duploegg.jpg',
    category: 'smash',
    isHighlight: false,
    available: true,
  },
  {
    id: 'smash-salada',
    name: 'Duplo Smash Salada',
    description: '2 carnes de 60g, pão brioche, cheddar, tomate, alface, cebola roxa e maionese.',
    price: 28.90,
    imageUrl: '/duplosalada.jpg',
    category: 'smash',
    isHighlight: false,
    available: true,
  },

  // --- ACOMPANHAMENTOS ---
  {
    id: 'porcao-fritas',
    name: 'Batata Frita (;',
    description: 'Fritas crocantes.',
    price: 14.90,
    imageUrl: 'batatafrita.jpg',
    category: 'acompanhamentos',
    isHighlight: false,
    available: true,
  },
  {
    id: 'maionese-bacon',
    name: 'Maionese com Bacon',
    description: 'Maionese cremosa verde de bacon ;)',
    price: 1.00,
    imageUrl: 'maionese.jpg',
    category: 'acompanhamentos',
    isHighlight: false,
    available: true,
  },
  {
    id: 'Batata-Cheddar',
    name: 'Batata frita + Cheddar e Bacon',
    description: 'Batata frita crocante com queijo cheddar e fatias de bacon.',
    price: 17.00,
    imageUrl: 'batatacheddar.jpg',
    category: 'acompanhamentos',
    isHighlight: false,
    available: true,
  },

  // --- SOBREMESAS ---
  {
    id: 'Milkshake',
    name: 'Milk Shake Açai com Leite Condensado e Chantininho',
    description: 'Milk Shake Açai com Leite Condensado e Chantininho.',
    price: 12.90,
    imageUrl: 'milkshake.jpg',
    category: 'sobremesas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'brownie',
    name: 'Brownie Pac Man',
    description: 'Brownie de chocolate crocante e cremoso.',
    price: 6.00,
    imageUrl: 'brownie.jpg',
    category: 'sobremesas',
    isHighlight: false,
    available: true,
  },

  // --- BEBIDAS ---
  {
    id: 'coca-cola',
    name: 'Coca-Cola Lata 350 ml',
    description: 'Refrigerante coca-cola tradicional em lata de 350 ml.',
    price: 7.50,
    imageUrl: 'coca.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'coca-cola-zero',
    name: 'Coca-Cola Zero Lata 350 ml',
    description: 'Refrigerante coca-cola zero em lata de 350 ml.',
    price: 7.50,
    imageUrl: 'cocazero.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'agua-mineral',
    name: 'Água Mineral',
    description: 'Água mineral sem gás em garrafa de 500 ml.',
    price: 5.00,
    imageUrl: 'agua.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'agua-mineral-com-gas',
    name: 'Água Mineral com Gás',
    description: 'Água mineral com gás em garrafa de 500 ml.',
    price: 5.00,
    imageUrl: 'aguagas.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'Suco-Laranja',
    name: 'Suco de Laranja',
    description: 'Suco de laranja natural.',
    price: 9.50,
    imageUrl: 'suco.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'Suco-Maracujá',
    name: 'Suco de Maracujá',
    description: 'Suco de maracujá natural.',
    price: 9.50,
    imageUrl: 'suco.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: 'Suco-Guarana',
    name: 'Suco de Guarana com açai',
    description: 'Suco de guarana com açai.',
    price: 9.50,
    imageUrl: 'suco.jpg',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  }
  
];

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuRef = collection(db, 'menu');
        const q = query(
          menuRef,
          where('available', '==', true),
          orderBy('category')
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          console.warn('⚠️ Firebase collection "menu" está vazia. Usando dados locais.');
          setMenuItems(MOCK_MENU);
          setHighlights(MOCK_MENU.filter(item => item.isHighlight));
          setUsingMockData(true);
        } else {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMenuItems(items);
          setHighlights(items.filter(item => item.isHighlight));
        }
      } catch (err) {
        console.warn('⚠️ Erro ao buscar Firebase ou índice ausente. Usando dados locais.', err.message);
        setMenuItems(MOCK_MENU);
        setHighlights(MOCK_MENU.filter(item => item.isHighlight));
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const getByCategory = (category) =>
    menuItems.filter(item => item.category === category);

  const categories = [...new Set(menuItems.map(item => item.category))];

  return {
    menuItems,
    highlights,
    loading,
    error,
    usingMockData,
    getByCategory,
    categories,
  };
};