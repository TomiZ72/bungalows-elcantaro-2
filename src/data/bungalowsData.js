import baños from '../assets/bungalowsImg/baños.jpg'
import cocina from '../assets/bungalowsImg/cocina.jpg'
import caturve from '../assets/bungalowsImg/caturve.jpg'
import interior from '../assets/bungalowsImg/interior.jpg'
import living from '../assets/bungalowsImg/living.jpg'
import bungalowExt from '../assets/complexImg/bungalowExt.jpg'
import parrilla from '../assets/complexImg/parrilla.jpg'


const bungalowsImg = {
    images: [
        { src: baños, alt: 'Baño' },
        { src: cocina, alt: 'Cocina' },
        { src: caturve, alt: 'Caturve' },
        { src: interior, alt: 'Interior' },
        { src: living, alt: 'Living' },
        { src: parrilla, alt: 'Parrilla'},
        { src: bungalowExt, alt: 'Exterior'},
]
};

const bungalowsData = 
    {
        id: 1,
        name: 'Apartamento de un dormitorio',
        description: 'Un espacio cómodo y acogedor para descansar, desconectar de la rutina y disfrutar de Villa Elisa a tu ritmo. Tu lugar para hacer una pausa y sentirte bien.',
        image: bungalowsImg,
        capacity: 4,
        singlebed: 0,
        doubleBed: 1,
        trundleBed: 2,
        amenities: ['Wi-Fi', 'TV', 'Cocina', 'Aire acondicionado', 'Ducha', 'Servicio de Limpieza'],
        petsAllowed: true,
        smokingAllowed: false,
    }
export { bungalowsData, bungalowsImg }