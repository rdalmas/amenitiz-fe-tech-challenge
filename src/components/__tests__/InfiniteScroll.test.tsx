import { render, screen } from '@testing-library/react';
import { InfiniteScroll } from '../InfiniteScroll';
import '@testing-library/jest-dom';

// Mock Intersection Observer
class MockIntersectionObserver {
  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '0px';
    this.thresholds = options?.threshold ? 
      Array.isArray(options.threshold) ? options.threshold : [options.threshold] : 
      [0];
  }
  
  observe = jest.fn((element: Element) => {
    // Simulate intersection immediately for testing
    this.callback([{
      isIntersecting: true,
      target: element,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now()
    }], this);
  });
  
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn().mockReturnValue([]);
}

// Setup global mocks
global.IntersectionObserver = MockIntersectionObserver as any;

describe('InfiniteScroll Component', () => {
  const mockItems = ['item1', 'item2', 'item3'];
  const mockRenderItem = (item: string) => <div>{item}</div>;
  const mockKeyExtractor = (item: string) => item;
  const mockLoadMore = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the items correctly', () => {
    render(
      <InfiniteScroll
        items={mockItems}
        renderItem={mockRenderItem}
        keyExtractor={mockKeyExtractor}
        loading={false}
        hasMore={true}
        onLoadMore={mockLoadMore}
      />
    );
    
    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.getByText('item2')).toBeInTheDocument();
    expect(screen.getByText('item3')).toBeInTheDocument();
  });
  
  it('shows loading indicator when loading is true', () => {
    render(
      <InfiniteScroll
        items={mockItems}
        renderItem={mockRenderItem}
        keyExtractor={mockKeyExtractor}
        loading={true}
        hasMore={true}
        onLoadMore={mockLoadMore}
      />
    );
    
    const loadingElement = screen.getByText(/loading more items/i);
    expect(loadingElement).toBeInTheDocument();
  });
  
  it('shows end message when hasMore is false', () => {
    render(
      <InfiniteScroll
        items={mockItems}
        renderItem={mockRenderItem}
        keyExtractor={mockKeyExtractor}
        loading={false}
        hasMore={false}
        onLoadMore={mockLoadMore}
      />
    );
    
    const endElement = screen.getByText(/end of the list/i);
    expect(endElement).toBeInTheDocument();
  });
  
  it('applies custom className correctly', () => {
    const { container } = render(
      <InfiniteScroll
        items={mockItems}
        renderItem={mockRenderItem}
        keyExtractor={mockKeyExtractor}
        loading={false}
        hasMore={true}
        onLoadMore={mockLoadMore}
        className="custom-class"
      />
    );
    
    const element = container.querySelector('.infinite-scroll-container.custom-class');
    expect(element).toBeInTheDocument();
  });
});