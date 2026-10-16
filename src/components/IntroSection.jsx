import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
    FaSwimmingPool,
    FaWifi,
    FaCar,
    FaUtensils,
    FaPaw,
    FaTree,
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight
} from "react-icons/fa";

const services = [
    { Icon: FaSwimmingPool, label: "Piscina climatizada" },
    { Icon: FaWifi, label: "Wi-Fi" },
    { Icon: FaCar, label: "Cochera Semicubierta" },
    { Icon: FaUtensils, label: "Parrilla" },
    { Icon: FaPaw, label: "Pet friendly" },
    { Icon: FaTree, label: "Espacios Verdes" },
];

const IntroSection = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const changeSlide = (direction) => {
        setActiveIndex((previous) =>
            (previous + direction + images.length) % images.length
        )
    };
    return (
        <section className="intro-section">
            <div className="intro-container">
                <div className="intro-content">

                    <h2>Tu descanso en Villa Elisa, con piscina climatizada.</h2>

                    <p> Disfrutá de la tranquilidad, el verde y el placer de relajarte en nuestros bungalows. </p>
                </div>
                {images.length > 0 && (
                    <div
                        className="triple-carousel"
                        role="region"
                        aria-label="Fotos del complejo"
                        aria-roledescription="carrusel"
                    >
                        <div className="triple-carousel-track">
                            {images.map((image, index) => {
                                const offset =
                                    (index - activeIndex + images.length) % images.length;

                                let slideClass = "is-hidden";

                                if (offset === 0) {
                                    slideClass = "is-active";
                                } else if (offset === 1) {
                                    slideClass = "is-next";
                                } else if (offset === images.length - 1) {
                                    slideClass = "is-prev";
                                }

                                return (
                                    <figure
                                        key={image.src}
                                        className={`triple-slide ${slideClass}`}
                                        aria-hidden={index !== activeIndex}
                                    >
                                        <img src={image.src} alt={image.alt} />
                                    </figure>
                                );
                            })}
                        </div>

                        {images.length > 1 && (
                            <div className="triple-controls">
                                <button
                                    type="button"
                                    onClick={() => changeSlide(-1)}
                                    aria-label="Foto anterior"
                                >
                                    <FaArrowAltCircleLeft />
                                </button>

                                <span aria-live="polite" aria-atomic="true">
                                    {activeIndex + 1} / {images.length}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => changeSlide(1)}
                                    aria-label="Foto siguiente"
                                >
                                    <FaArrowAltCircleRight />
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <ul className="intro-services-bar" aria-label="Servicios del complejo">
                    {services.map(({ Icon, label }) => (
                        <li key={label}>
                            <Icon aria-hidden="true" />
                            <span>{label}</span>
                        </li>
                    ))}
                </ul>
                <div className="intro-highlights">
                    <article className="highlight">
                        <Link to="/bungalows" className="highlight-link">
                            <strong>Bungalows</strong>
                            <span>Hasta 4 huéspedes</span>
                        </Link>
                    </article>

                    <article className="highlight">
                        <strong>Nosotros</strong>
                        <span>Conocénos más</span>
                    </article>

                    <article className="highlight">
                        <a href="#tourism" className="highlight-link">
                            <strong>Villa Elisa</strong>
                            <span>Entre Ríos</span>
                        </a>
                    </article>

                </div>
            </div>
        </section>
    )
}

export { IntroSection }