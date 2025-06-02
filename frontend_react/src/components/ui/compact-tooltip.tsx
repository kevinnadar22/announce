import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface CompactTooltipProps {
  content: string | string[];
  children: ReactNode;
}

const CompactTooltip = ({ content, children }: CompactTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = (triggerElement: HTMLElement) => {
    const rect = triggerElement.getBoundingClientRect();
    const tooltipWidth = 200; // Smaller width
    const padding = 8;
    
    let x = rect.left + rect.width / 2;
    let y = rect.top - padding;
    
    // Adjust horizontal position if tooltip would go off screen
    if (x - tooltipWidth / 2 < padding) {
      x = padding + tooltipWidth / 2;
    } else if (x + tooltipWidth / 2 > window.innerWidth - padding) {
      x = window.innerWidth - padding - tooltipWidth / 2;
    }
    
    return { x, y };
  };

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (triggerRef.current) {
      const pos = calculatePosition(triggerRef.current);
      setPosition(pos);
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const handleMouseEnter = () => {
    showTooltip();
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isArrayContent = Array.isArray(content);

  const tooltipContent = (
    <div 
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg max-w-[200px]">
        {isArrayContent ? (
          <div>
            {(content as string[]).map((item, index) => (
              <>
                {index > 0 && <br />}
                {item}
              </>
            ))}
          </div>
        ) : (
          <div>{content as string}</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div 
        ref={triggerRef}
        className="inline-block" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      {isVisible && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default CompactTooltip; 