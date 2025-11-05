import React from 'react';
import { GoogleLogo } from '../constants';

interface TrendingTopicsProps {
  topics: string[];
  isLoading: boolean;
  onTopicClick: (topic: string) => void;
  title: string;
}

const TopicPill: React.FC<{ children: React.ReactNode; onClick: () => void; }> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-slate-700/50 hover:bg-slate-600/70 text-sm text-gray-200 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
  >
    {children}
  </button>
);

const ShimmerPill: React.FC = () => (
    <div className="bg-slate-700/50 h-7 w-28 rounded-full animate-pulse" />
);

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics, isLoading, onTopicClick, title }) => {
  return (
    <div className="w-full max-w-xl bg-slate-800/60 backdrop-blur-sm rounded-xl p-3">
      <div className="flex items-center mb-2">
        <GoogleLogo className="w-5 h-5 mr-2 flex-shrink-0" />
        <h2 className="text-md font-semibold text-gray-300">{title}</h2>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {isLoading ? (
          <>
            <ShimmerPill />
            <ShimmerPill />
            <ShimmerPill />
            <ShimmerPill />
          </>
        ) : (
          topics.map((topic, index) => (
            <TopicPill key={index} onClick={() => onTopicClick(topic)}>
              {topic}
            </TopicPill>
          ))
        )}
      </div>
    </div>
  );
};

// Add a simple scrollbar style to the head
const style = document.createElement('style');
style.textContent = `
  /* Webkit (Chrome, Safari) */
  .scrollbar-thin::-webkit-scrollbar {
    height: 4px;
  }
  .scrollbar-thumb-slate-600::-webkit-scrollbar-thumb {
    background-color: #475569;
    border-radius: 10px;
  }
  .scrollbar-track-slate-800::-webkit-scrollbar-track {
    background-color: #1e293b;
  }

  /* Firefox */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #475569 #1e293b;
  }
`;
document.head.append(style);
