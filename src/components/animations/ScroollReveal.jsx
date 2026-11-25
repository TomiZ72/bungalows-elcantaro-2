import { motion, useReducedMotion } from "motion/react";

const ScrollReveal = ({
    children,
    as = "div",
    direction = "up",
    delay = 0,
    duration = 0.9,
    distance = 40,
    once = true,
    className = "",
    ...props
}) => {
    const reduceMotion = useReducedMotion();
    const Component = motion[as];

    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: -distance },
        right: { x: distance },
        zoom: { scale: 0.95 },
        fade: {}
    };

    return (
        <Component
            {...props}
            className={className}
            initial={
                reduceMotion
                    ? false
                    : { opacity: 0, ...directions[direction] }
            }
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
            }}
            viewport={{
                once,
                amount: 0.1
            }}
            transition={{
                duration: reduceMotion ? 0 : duration,
                delay: reduceMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </Component>
    );
};

export default ScrollReveal;