import { useEffect, useRef } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { bungalowsData } from '../data/bungalowsData.js';

import interior from '../assets/bungalowsImg/interior.jpg';
import living from '../assets/bungalowsImg/living.jpg';
import cocina from '../assets/bungalowsImg/cocina.jpg';
import bano from '../assets/bungalowsImg/baños.jpg';
import toallas from '../assets/bungalowsImg/caturve.jpg';

const photos = [
    { src: interior, alt: 'Interior del bungalow', width: 1024, height: 720 },
    { src: living, alt: 'Sala de estar', width: 1080, height: 1080 },
    { src: cocina, alt: 'Cocina', width: 1024, height: 720 },
    { src: bano, alt: 'Baño', width: 1024, height: 720 },
    { src: toallas, alt: 'Toallas del alojamiento', width: 1080, height: 1080 },
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
        <article>
            <div className='bungalows-section'>
                <h2 className='bungalows-tittle'>Nuestros Bungalows</h2></div>
            <div ref={galleryRef} className="bungalow-photo-grid">
                {photos.map(({ src, alt, width, height }, index) => (
                    <a
                        key={src}
                        className="bungalow-photo-grid__tile"
                        href={src}
                        data-pswp-width={width}
                        data-pswp-height={height}
                        data-pswp-cropped="true"
                        aria-label={index === 0 ? 'Abrir galería de fotos' : `Ampliar foto de ${alt}`}
                        aria-haspopup="dialog"
                    >
                        <img src={src} alt={alt} width={width} height={height} />

                        {index === 0 && (
                            <span className="bungalow-photo-grid__label">
                                Ver las {photos.length} fotos
                            </span>
                        )}
                    </a>
                ))}
            </div>
            <section className="bungalow-services">

                <ul className="bungalow-services__list">
                    {bungalowsData[0].amenities.map((amenity) => (
                        <li key={amenity}>
                            <span aria-hidden="true">✓</span>
                            {amenity}
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export { BungalowGallery };
