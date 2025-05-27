import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ExpandableTooltipProps {
  items: string[];
  visibleCount: number;
  trigger: ReactNode;
  title?: string;
  maxWidth?: string;
}

const ExpandableTooltip = ({ 
  items, 
  visibleCount, 
  trigger, 
  title = "All items",
  maxWidth = "max-w-sm"
}: ExpandableTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const hiddenItems = items.slice(visibleCount);
  
  if (hiddenItems.length === 0) {
    return <>{trigger}</>;
  }

  const calculatePosition = (triggerElement: HTMLElement) => {
    const rect = triggerElement.getBoundingClientRect();
    const tooltipHeight = 300; // Approximate max height
    const tooltipWidth = 320; // Approximate width
    const padding = 16;
    
    let x = rect.left + rect.width / 2;
    let y = rect.top - padding;
    
    // Adjust horizontal position if tooltip would go off screen
    if (x - tooltipWidth / 2 < padding) {
      x = padding + tooltipWidth / 2;
    } else if (x + tooltipWidth / 2 > window.innerWidth - padding) {
      x = window.innerWidth - padding - tooltipWidth / 2;
    }
    
    // Adjust vertical position if tooltip would go off screen
    if (y - tooltipHeight < padding) {
      y = rect.bottom + padding;
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
    }, 150); // Small delay to allow moving to tooltip
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    showTooltip();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    hideTooltip();
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipContent = (
    <div 
      ref={tooltipRef}
      className="fixed pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999
      }}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <div className={`${maxWidth} bg-gray-900 text-white rounded-md shadow-lg overflow-hidden`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm text-gray-200">
              {title}
            </p>
            <span className="text-xs text-gray-400 bg-gray-800 rounded-full px-2 py-1">
              {items.length}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className={`text-sm px-3 py-2 rounded transition-colors ${
                    index < visibleCount 
                      ? 'text-gray-300 bg-gray-800' 
                      : 'text-emerald-200 bg-emerald-900/50 font-medium'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        ref={triggerRef}
        className="inline-block cursor-pointer" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {trigger}
      </div>
      
      {isVisible && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default ExpandableTooltip; 