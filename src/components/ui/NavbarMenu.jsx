import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative h-full flex items-center">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-stone-600 hover:text-stone-900 font-medium text-sm"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                    className="absolute top-[calc(100%_+_1rem)] left-1/2 transform -translate-x-1/2 pt-4 w-auto"
                >
                    {active === item && (
                        <div className="bg-white backdrop-blur-xl rounded-2xl overflow-hidden border border-stone-200 shadow-xl relative z-50">
                            <motion.div
                                transition={transition}
                                layoutId="active"
                                className="w-max h-full p-4"
                            >
                                {children}
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative rounded-full border border-stone-200 bg-white/90 backdrop-blur-md shadow-lg flex justify-center space-x-6 px-8 py-3 items-center"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}) => {
    return (
        <Link to={href} className="flex space-x-4 group min-w-[300px] p-2 rounded-xl hover:bg-stone-50 transition-colors">
            <div className="flex-shrink-0 overflow-hidden rounded-lg w-[120px] h-[70px] shadow-sm border border-stone-100">
                <img
                    src={src}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div>
                <h4 className="text-base font-bold mb-1 text-stone-800 group-hover:text-structure transition-colors">
                    {title}
                </h4>
                <p className="text-stone-500 text-xs max-w-[10rem] leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }) => {
    return (
        <Link
            {...rest}
            className="text-stone-500 hover:text-structure transition-colors block text-sm py-1"
        >
            {children}
        </Link>
    );
};
