import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { SearchEngineNode } from '../types';

interface PlanetarySystemProps {
  searchEngines: SearchEngineNode[];
  highlightedEngines: string[];
  onPlanetClick: (engine: SearchEngineNode) => void;
  monthlySearchesLabel: string;
}

const Planet: React.FC<{ 
  node: SearchEngineNode; 
  isHighlighted: boolean;
  onClick: (engine: SearchEngineNode) => void;
  containerWidth: number;
  containerHeight: number;
  monthlySearchesLabel: string;
}> = ({ node, isHighlighted, onClick, containerWidth, containerHeight, monthlySearchesLabel }) => {
  const { x = 0, y = 0, radius = 10, name, color, description, logo: LogoComponent, monthlySearches } = node;
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamically position tooltip to avoid going off-screen
  const tooltipWidth = 200;
  const tooltipGap = 12;

  // Position tooltip to the left if the planet is on the right half of the screen, and vice-versa.
  const tooltipX = (x > containerWidth / 2) 
    ? -radius - tooltipWidth - tooltipGap 
    : radius + tooltipGap;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer group"
      onClick={() => onClick(node)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle
        r={radius}
        className={`${color} transition-all duration-500 ease-in-out`}
        style={{
          filter: isHighlighted ? `drop-shadow(0 0 ${radius/2}px white)` : 'none',
          transform: isHighlighted ? 'scale(1.1)' : 'scale(1)',
        }}
      />

      {/* Logo */}
      <foreignObject
        x={-radius}
        y={-radius}
        width={radius * 2}
        height={radius * 2}
        style={{ pointerEvents: 'none', transition: 'opacity 300ms', opacity: isHovered ? 0 : 1 }}
      >
        <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center p-[20%]">
          {LogoComponent && <LogoComponent className="w-full h-full" />}
        </div>
      </foreignObject>

      <text
        textAnchor="middle"
        dy=".3em"
        className="fill-white font-bold text-xs md:text-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ pointerEvents: 'none', filter: 'drop-shadow(0 0 3px black)' }}
      >
        {name}
      </text>

      {/* Tooltip with description */}
      {isHovered && (
         <foreignObject 
            x={tooltipX}
            y={-50}
            width={tooltipWidth} 
            height="180"
            style={{ pointerEvents: 'none', overflow: 'visible' }}
          >
           <div 
             xmlns="http://www.w3.org/1999/xhtml"
             className="bg-slate-800/90 text-gray-200 backdrop-blur-sm text-xs p-3 rounded-lg shadow-xl space-y-2"
            >
             <p>{description}</p>
             <div className="pt-2 border-t border-slate-700">
                <span className="font-semibold text-gray-400 block">{monthlySearchesLabel}</span>
                <p className="font-bold text-cyan-300">{monthlySearches}</p>
             </div>
           </div>
         </foreignObject>
      )}
    </g>
  );
};

export const PlanetarySystem: React.FC<PlanetarySystemProps> = ({ searchEngines, highlightedEngines, onPlanetClick, monthlySearchesLabel }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<SearchEngineNode[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedEngines = useMemo(() => {
    return [...searchEngines].sort((a, b) => b.popularity - a.popularity);
  }, [searchEngines]);

  useEffect(() => {
    if (!containerRef.current || sortedEngines.length === 0) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    setDimensions({ width, height });

    const maxPopularity = d3.max(sortedEngines, d => d.popularity) || 100;

    // Adjust radius range for mobile
    const minRadius = width < 768 ? 12 : 15;
    const maxRadius = Math.min(width, height) / (width < 768 ? 10 : 8);
    const radiusScale = d3.scaleSqrt().domain([0, maxPopularity]).range([minRadius, maxRadius]);

    const initialNodes: SearchEngineNode[] = sortedEngines.map(engine => ({
      ...engine,
      radius: radiusScale(engine.popularity),
      x: width / 2 + (Math.random() - 0.5) * 500,
      y: height / 2 + (Math.random() - 0.5) * 500,
    }));
    setNodes(initialNodes);

    const centerNode = initialNodes[0];

    const simulation = d3.forceSimulation(initialNodes)
      .force('charge', d3.forceManyBody().strength(d => (d === centerNode ? -1000 : -200)))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.8))
      .force('collide', d3.forceCollide<SearchEngineNode>().radius(d => d.radius + 10).strength(0.9))
      .force('x', d3.forceX(width / 2).strength(d => (d === centerNode ? 0.8 : 0.05)))
      .force('y', d3.forceY(height / 2).strength(d => (d === centerNode ? 0.8 : 0.05)))
      .on('tick', () => {
        setNodes([...initialNodes]);
      });
      
    return () => simulation.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedEngines, containerRef.current?.clientWidth]); // Rerun on resize

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full">
        {nodes.map((node) => (
          <Planet 
            key={node.id} 
            node={node} 
            isHighlighted={highlightedEngines.includes(node.id)}
            onClick={onPlanetClick} 
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            monthlySearchesLabel={monthlySearchesLabel}
          />
        ))}
      </svg>
    </div>
  );
};
