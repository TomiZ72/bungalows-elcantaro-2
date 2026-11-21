import { useRef, useState } from 'react';
import { WhatsAppButton } from './WhatsappButton';

const BungalowCard = ({ bungalows = [] }) => {
    const bungalow = bungalows[0];
    const originalImages = bungalow?.image?.images ?? [];
    // Presentamos primero la foto del interior, sin cambiar el orden usado en otras secciones.
    const images = originalImages.length > 3
        ? [originalImages[3], ...originalImages.filter((_, index) => index !== 3)]
        : originalImages;

    const [activeIndex, setActiveIndex] = useState(0);
    const touchStart = useRef(null);

    if (!bungalow || images.length === 0) return null;

    const showImage = (index) => {
        setActiveIndex((index + images.length) % images.length);
    };

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event) => {
        if (!touchStart.current || images.length < 2) return;

        const touch = event.changedTouches[0];
        const distanceX = touch.clientX - touchStart.current.x;
        const distanceY = touch.clientY - touchStart.current.y;

        if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY)) {
            showImage(activeIndex + (distanceX < 0 ? 1 : -1));
        }
        touchStart.current = null;
    };

    const activeImage = images[activeIndex] ?? images[0];

    return (
        <section className="bungalows-section" id="bungalows">
            <div className="bungalows-container">
                <div className="bungalows-heading">
                    <h2>Nuestros alojamientos</h2>
                    <p>Explorá los espacios de El Cántaro y encontrá tu lugar para descansar en Villa Elisa.</p>
                </div>

                <div className="bungalows-showcase">
                    <div className="bungalow-gallery" aria-label="Galería de fotos de los bungalows">
                        <div
                            className="bungalow-gallery-frame"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={() => { touchStart.current = null; }}
                        >
                            <img
                                className="bungalow-gallery-image"
                                src={activeImage.src}
                                alt={activeImage.alt}
                                loading="lazy"
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        className="bungalow-gallery-arrow is-prev"
                                        onClick={() => showImage(activeIndex - 1)}
                                        aria-label="Ver foto anterior"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        className="bungalow-gallery-arrow is-next"
                                        onClick={() => showImage(activeIndex + 1)}
                                        aria-label="Ver foto siguiente"
                                    >
                                        ›
                                    </button>
                                    <span className="bungalow-gallery-counter" aria-live="polite" aria-atomic="true">
                                        {activeIndex + 1} / {images.length}
                                    </span>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="bungalow-gallery-thumbnails" role="group" aria-label="Elegir foto">
                                {images.map((image, index) => (
                                    <button
                                        type="button"
                                        key={image.src}
                                        className={`bungalow-gallery-thumb ${index === activeIndex ? 'is-active' : ''}`}
                                        onClick={() => showImage(index)}
                                        aria-label={`Ver foto: ${image.alt}`}
                                        aria-pressed={index === activeIndex}
                                    >
                                        <img src={image.src} alt="" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bungalow-details">
                        <span className="bungalow-capacity">Hasta {bungalow.capacity} personas</span>
                        <h3>Bungalows El Cántaro</h3>
                        <p className="bungalow-description">{bungalow.description}</p>

                        <h4>Comodidades</h4>
                        <ul className="bungalow-amenities" aria-label="Servicios incluidos">
                            {bungalow.amenities.map((amenity) => (
                                <li key={amenity}>{amenity}</li>
                            ))}
                        </ul>

                        <div className="bungalow-conditions">
                            <span>{bungalow.petsAllowed ? 'Aceptamos mascotas' : 'No se aceptan mascotas'}</span>
                            <span>{bungalow.smokingAllowed ? 'Se permite fumar' : 'No se permite fumar'}</span>
                        </div>

                        <WhatsAppButton
                            className="bungalow-button"
                            message="¡Hola! Quisiera consultar disponibilidad para los bungalows de El Cántaro."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { BungalowCard };
