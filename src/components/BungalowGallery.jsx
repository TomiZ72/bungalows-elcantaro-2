import { useEffect, useRef } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { motion } from 'motion/react';
import { bungalowsData } from '../data/bungalowsData.js';

import interior from '../assets/bungalowsImg/interior.jpg';
import living from '../assets/bungalowsImg/living.jpg';
import cocina from '../assets/bungalowsImg/cocina.jpg';
import bano from '../assets/bungalowsImg/baños.jpg';
import toallas from '../assets/bungalowsImg/caturve.jpg';
import bungalowExt from '../assets/complexImg/bungalowExt.jpg'
import parrilla from '../assets/complexImg/parrilla.jpg'

const reveal = (delay = 0) => ({
    initial: {
        opacity: 0,
        y: 50
    },
    whileInView: {
        opacity: 1,
        y: 0
    },
    viewport: {
        once: true,
        amount: 0.1
    },
    transition: {
        duration: 1,
        delay,
        ease: "easeOut"
    }
});

const photos = [
    { src: interior, alt: 'Interior del bungalow', width: 1024, height: 720 },
    { src: living, alt: 'Sala de estar', width: 1080, height: 1080 },
    { src: cocina, alt: 'Cocina', width: 1024, height: 720 },
    { src: bano, alt: 'Baño', width: 1024, height: 720 },
    { src: toallas, alt: 'Toallas del alojamiento', width: 1080, height: 1080 },
    { src: bungalowExt, alt: 'Exterior', width: 1080, height: 1080 },
    { src: parrilla, alt: 'Parrilla', width: 1080, height: 1080 }

];

const BungalowGallery = () => {
    const galleryRef = useRef(null);

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: galleryRef.current,
            children: 'a',
            pswpModule: () => import('photoswipe'),
            closeTitle: 'Cerrar galería',
            arrowPrevTitle: 'Foto anterior',
            arrowNextTitle: 'Foto siguiente',
            zoomTitle: 'Cambiar zoom',
        });

        lightbox.init();

        return () => lightbox.destroy();
    }, []);

    return (
    <section className="bungalow-section">
         <motion.h2
            className="bungalows-tittle"
            {...reveal()}
        >
            Alojamiento
        </motion.h2>


        <motion.h2
            className="bungalows-subtittle"
            {...reveal()}
        >
            Nuestros Bungalows
        </motion.h2>

        <div
            ref={galleryRef}
            className="bungalow-photo-grid"
        >
            {photos.map(({ src, alt, width, height }, index) => (
                <motion.a
                    key={src}
                    className="bungalow-photo-grid__tile"
                    href={src}
                    data-pswp-width={width}
                    data-pswp-height={height}
                    data-pswp-cropped="true"
                    aria-label={
                        index === 0
                            ? "Abrir galería de fotos"
                            : `Ampliar foto de ${alt}`
                    }
                    aria-haspopup="dialog"
                    {...reveal(index * 0.15)}
                >
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                    />

                    {index === 0 && (
                        <span className="bungalow-photo-grid__label">
                            Ver las {photos.length} fotos
                        </span>
                    )}

                </motion.a>
            ))}
        </div>

        <section className="bungalow-services">

            <ul className="bungalow-services__list">
                {bungalowsData.amenities.map((amenity, index) => (
                    <motion.li
                        key={amenity}
                        {...reveal(index * 0.15)}
                    >
                        <span aria-hidden="true">✓</span>
                        {amenity}
                    </motion.li>
                ))}
            </ul>

        </section>

    </section>
);}

export{BungalowGallery}