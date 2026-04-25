import { useState, useRef } from "react";

const useDragScroll = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        // On calcule la position de départ par rapport au conteneur
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        // On multiplie par 2 pour une sensation de glisse plus rapide
        const walk = (x - startX) * 2; 
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return {
        scrollRef,
        isDragging,
        dragEvents: {
            onMouseDown: handleMouseDown,
            onMouseLeave: stopDragging,
            onMouseUp: stopDragging,
            onMouseMove: handleMouseMove,
        }
    };
};

export default useDragScroll;