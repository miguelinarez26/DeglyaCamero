import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { cn } from "../../lib/utils";

const StickyHorizontalScroll = ({
    items = [],
    className
}) => {
    const targetRef = useRef(null);
    const containerRef = useRef(null);
    const [dynamicHeight, setDynamicHeight] = React.useState("300vh"); // Fallback
    const [translateX, setTranslateX] = React.useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    React.useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && targetRef.current) {
                const scrollableWidth = containerRef.current.scrollWidth - window.innerWidth;
                // Total height = scrollable distance + 1 viewport height (for the sticky duration)
                // We add a buffer to ensure smooth transition
                const totalHeight = scrollableWidth + window.innerHeight;

                setDynamicHeight(`${totalHeight}px`);
                setTranslateX(scrollableWidth);
            }
        };

        // Initial calculation
        handleResize();

        // Recalculate on resize
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [items]);

    // Map vertical scroll progress (0 to 1) to horizontal scroll distance (0 to -translateX)
    // Note: We use -translateX because we want to move left
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${translateX}px`]);

    return (
        <section
            ref={targetRef}
            className={cn("relative w-full", className)}
            style={{ height: dynamicHeight }}
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-white">
                <motion.div
                    style={{ x }}
                    className="flex gap-8 px-8 sm:px-24"
                    ref={containerRef}
                >
                    {items.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ item }) => {
    return (
        <div className="group relative h-[65vh] w-[85vw] md:w-[600px] flex-shrink-0 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
            <div
                style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deglya-wood/90 via-deglya-wood/40 to-transparent z-10" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <div className={cn(
                    "inline-block px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 w-fit shadow-md",
                    item.bgColor || "bg-deglya-teal",
                    "text-white"
                )}>
                    {item.badge || `0${item.id}`}
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-medium text-white mb-6 transition-transform duration-300 group-hover:translate-x-2">
                    {item.title}
                </h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed transition-transform duration-300 group-hover:translate-x-2 max-w-lg">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

export default StickyHorizontalScroll;
