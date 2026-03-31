import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

const catsData = [
  {
    id: 1,
    slug: 'castanuela',
    name: 'Castañuela',
    title: 'La Flamenca',
    description:
      'La reina del flamenco. Sus patas marcan el ritmo con una precisión que haría llorar hasta al más frío de los corazones. Viste de lunares y lleva el duende en los bigotes.',
    shortDesc: 'La reina del flamenco madrileño',
    image: '/assets/castanuela.png',
    color: '#FF6B35',
    year: '2024',
    edition: '1 / 50',
  },
  {
    id: 2,
    slug: 'chulapa',
    name: 'Chulapa',
    title: 'La del Rastro',
    description:
      'Vestida con flores y el orgullo de las verbenas de La Paloma. Su capa es de terciopelo negro y su mirada desafía al mismo Sol que sale por Vallecas cada mañana.',
    shortDesc: 'Orgullo de las verbenas de Madrid',
    image: '/assets/chulapa.png',
    color: '#E8445A',
    year: '2024',
    edition: '1 / 50',
  },
  {
    id: 3,
    slug: 'chulapo',
    name: 'Chulapo',
    title: 'El Galán',
    description:
      'El galán del barrio. Con su boina ladeada y el pañuelo rojo al cuello desafía a cualquier toro en los corrales y a cualquier corazón en los bailes del 15 de mayo.',
    shortDesc: 'El galán indomable del barrio',
    image: '/assets/chulapo.png',
    color: '#9B59B6',
    year: '2024',
    edition: '1 / 50',
  },
  {
    id: 4,
    slug: 'churro',
    name: 'Churro',
    title: 'El Goloso',
    description:
      'Crujiente por fuera, tierno por dentro. El más goloso de la pandilla apareció una mañana de niebla en la puerta de la churrería, oliendo a azúcar y a misterio por igual.',
    shortDesc: 'Crujiente por fuera, tierno por dentro',
    image: '/assets/churro.png',
    color: '#F0A500',
    year: '2024',
    edition: '1 / 50',
  },
];

export const AppProvider = ({ children }) => {
  const [cats] = useState(catsData);
  const [loading, setLoading] = useState(false);

  const getCatById = (id) => cats.find((cat) => cat.id === parseInt(id));
  const getCatBySlug = (slug) => cats.find((cat) => cat.slug === slug);

  return (
    <AppContext.Provider value={{ cats, loading, setLoading, getCatById, getCatBySlug }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
