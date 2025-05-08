import { type ReactNode, useEffect, useRef } from 'react';
import './InfiniteScroll.css';

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  loadingIndicator?: ReactNode;
  endMessage?: ReactNode;
  className?: string;
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  keyExtractor,
  loading,
  hasMore,
  onLoadMore,
  loadingIndicator = <div className="infinite-scroll-loading">Loading more items...</div>,
  endMessage = <div className="infinite-scroll-end">You've reached the end of the list</div>,
  className = ''
}: InfiniteScrollProps<T>) {
  // Reference for the sentinel element
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  // Set up the intersection observer once
  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;
    
    const observer = new IntersectionObserver(
      entries => {
        // Only call onLoadMore when sentinel is visible, we have more items to load, and we're not currently loading
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { 
        rootMargin: '200px 0px', // Trigger earlier by extending bottom margin
        threshold: 0.1           // Trigger when just a small part is visible
      }
    );
    
    observer.observe(currentSentinel);
    
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [hasMore, loading, onLoadMore]);
  
  return (
    <div className={`infinite-scroll-container ${className}`}>
      {/* Grid layout for items */}
      <div className="infinite-scroll-items">
        {items.map((item, index) => (
          <div 
            key={keyExtractor(item, index)}
            className="infinite-scroll-item"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      {/* Only show sentinel if we have more items to load and not currently loading */}
      {hasMore && !loading && items.length > 0 && (
        <div className="infinite-scroll-sentinel" ref={sentinelRef} />
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="infinite-scroll-loading-wrapper">
          {loadingIndicator}
        </div>
      )}
      
      {/* End message when we've loaded all items */}
      {!hasMore && items.length > 0 && (
        <div className="infinite-scroll-end-wrapper">
          {endMessage}
        </div>
      )}
    </div>
  );
}