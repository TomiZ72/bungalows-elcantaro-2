import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";

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
        );
    };

    return (
        <section className="intro-section">
            <div className="intro-container">

                <div className="intro-content">

                    <motion.h2 {...reveal()}>
                        Tu descanso en Villa Elisa, con piscina climatizada.
                    </motion.h2>

                    <motion.p {...reveal(0.2)}>
                        Disfrutá de la tranquilidad, el verde y el placer
                        de relajarte en nuestros bungalows.
                    </motion.p>

                </div>

                {images.length > 0 && (
                    <motion.div
                        className="triple-carousel"
                        role="region"
                        aria-label="Fotos del complejo"
                        aria-roledescription="carrusel"
                        {...reveal(0.3)}
                    >
                        <div className="triple-carousel-track">

                            {images.map((image, index) => {
                                const offset =
                                    (index - activeIndex + images.length)
                                    % images.length;

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
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                        />
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

                                <span
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
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

                    </motion.div>
                )}

                <ul
                    className="intro-services-bar"
                    aria-label="Servicios del complejo"
                >
                    {services.map(({ Icon, label }, index) => (
                        <motion.li
                            key={label}
                            {...reveal(index * 0.15)}
                        >
                            <Icon aria-hidden="true" />
                            <span>{label}</span>
                        </motion.li>
                    ))}
                </ul>

                <div className="intro-highlights">

                    <motion.article
                        className="highlight"
                        {...reveal()}
                    >
                        <Link
                            to="/bungalows"
                            className="highlight-link"
                        >
                            <strong>Bungalows</strong>
                            <span>Hasta 4 huéspedes</span>
                        </Link>
                    </motion.article>

                    <motion.article
                        className="highlight"
                        {...reveal(0.2)}
                    >
                        <strong>Nosotros</strong>
                        <span>Conocénos más</span>
                    </motion.article>

                    <motion.article
                        className="highlight"
                        {...reveal(0.4)}
                    >
                        <a
                            href="#tourism"
                            className="highlight-link"
                        >
                            <strong>Villa Elisa</strong>
                            <span>Entre Ríos</span>
                        </a>
                    </motion.article>

                </div>

            </div>
        </section>
    );
};

export { IntroSection };