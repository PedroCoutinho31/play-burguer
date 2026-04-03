// src/hooks/useMenu.js
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

// ── Mock data para desenvolvimento (antes de configurar o Firebase) ──────────
const MOCK_MENU = [
  {
    id: '1',
    name: 'Double Stack 404',
    description: 'Dois smash burgers, cheddar derretido, bacon crocante, molho especial da casa',
    price: 32.90,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: '2',
    name: 'Player One Classic',
    description: 'Smash burger artesanal, alface, tomate, picles e maionese defumada',
    price: 24.90,
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: '3',
    name: 'Boss Level BBQ',
    description: 'Burger blend especial, molho BBQ defumado, cebola crispy, queijo gouda',
    price: 36.90,
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    category: 'burgers',
    isHighlight: true,
    available: true,
  },
  {
    id: '4',
    name: 'Combo Level Up',
    description: 'Double Stack 404 + Batata Frita + Refrigerante 400ml',
    price: 49.90,
    imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop',
    category: 'combos',
    isHighlight: true,
    available: true,
  },
  {
    id: '5',
    name: 'Frango Reboot',
    description: 'Frango empanado crocante, molho honey mustard, alface americana e pão brioche',
    price: 27.90,
    imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: '6',
    name: 'Veggie Pixel',
    description: 'Burger de grão-de-bico, pesto de manjericão, tomate seco e rúcula',
    price: 26.90,
    imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: '7',
    name: 'Hot Dog Arcade',
    description: 'Salsicha artesanal, cheddar, pico de gallo e jalapeños no pão de brioche',
    price: 22.90,
    imageUrl: 'https://images.unsplash.com/photo-1619740455993-9d8e95a634c5?w=400&h=300&fit=crop',
    category: 'burgers',
    isHighlight: false,
    available: true,
  },
  {
    id: '8',
    name: 'Batata Frita Turbo',
    description: 'Batata frita crocante temperada com sal defumado e ervas finas',
    price: 14.90,
    imageUrl: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=400&h=300&fit=crop',
    category: 'acompanhamentos',
    isHighlight: false,
    available: true,
  },
  {
    id: '9',
    name: 'Milkshake 8-Bit',
    description: 'Milkshake cremoso de chocolate, morango ou baunilha — 400ml',
    price: 18.90,
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    category: 'bebidas',
    isHighlight: false,
    available: true,
  },
  {
    id: '10',
    name: 'Combo Final Boss',
    description: 'Boss Level BBQ + Batata Frita Turbo + Milkshake 8-Bit',
    price: 59.90,
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    category: 'combos',
    isHighlight: true,
    available: true,
  },
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
          // Firebase vazio → usa mock para demonstração
          console.warn('⚠️ Firebase collection "menu" está vazia. Usando dados de demonstração.');
          setMenuItems(MOCK_MENU);
          setHighlights(MOCK_MENU.filter(item => item.isHighlight));
          setUsingMockData(true);
        } else {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMenuItems(items);
          setHighlights(items.filter(item => item.isHighlight));
        }
      } catch (err) {
        console.warn('⚠️ Firebase não configurado. Usando dados de demonstração.', err.message);
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
