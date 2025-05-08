# Chess.com Grandmasters Explorer

A React application that displays chess grandmasters from the Chess.com API with an infinite scrolling interface and detailed player profiles.

## Features

- Displays a list of chess grandmasters from Chess.com API
- Infinite scroll functionality for browsing a large list of players
- Responsive grid layout that works on all device sizes
- Player detail pages showing individual player information 
- Loading states and error handling for a robust user experience
- Comprehensive test suite with Jest and React Testing Library

## Live Demo

[Live Demo Link - if deployed]

## Screenshots

![Screenshot of Chess Grandmasters List](screenshots/players-list.png)
![Screenshot of Player Profile](screenshots/player-profile.png)

## Technologies Used

- React 18 with TypeScript
- React Router for navigation
- Custom infinite scroll implementation
- Jest and React Testing Library for tests
- CSS for styling (no external UI libraries)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/amenitiz-fe-tech-challenge.git
cd amenitiz-fe-tech-challenge
```

2. Install dependencies:
```bash
yarn
```

3. Run the development server:
```bash
yarn run dev
```

4. Open http://localhost:5173 to view it in your browser

### Running Tests
Run the test suite with:

```bash
yarn run test
```

### Project Structure

src/
├── api/          # API service and utilities
├── components/   # Reusable components
├── pages/        # Page components
├── model/        # TS Interfaces
├── utils/        # General Utilities

### Implementation Decisions & Compromises

During development, I made several implementation decisions to balance performance, user experience, and time constraints:

#### API Integration:

- Direct integration with Chess.com API without a backend proxy
- No API caching implemented to keep the solution simple
- Limited error handling to basic user messages

#### Infinite Scroll:

- Used a custom infinite scroll implementation with Intersection Observer API
- Pre-fetched all player usernames at once rather than implementing pagination with the API
- This approach works well for the limited dataset but wouldn't scale to millions of records

#### Component Structure:

- Created reusable components where possible
- Kept state management simple using React hooks without additional libraries

#### Styling:

- Used plain CSS for styling to demonstrate CSS skills
- No CSS-in-JS or UI libraries to keep the bundle size small
- Limited responsive design to basic breakpoints

#### Testing:

- Focused on component and integration tests rather than end-to-end tests
- Mocked API calls rather than testing against the real API


### Production Readiness Checklist
To make this application production-ready, the following enhancements would be necessary:

#### Performance Improvements
<input disabled="" type="checkbox"> Implement proper API pagination to load only necessary data
<input disabled="" type="checkbox"> Add caching layer for API responses (using React Query, SWR, or custom cache)
<input disabled="" type="checkbox"> Code splitting with React.lazy() for route-based component loading
<input disabled="" type="checkbox"> Optimize bundle size with tree shaking and dependency optimization
<input disabled="" type="checkbox"> Implement service workers for offline capabilities and caching
<input disabled="" type="checkbox"> Add proper memory management for the infinite scroll (virtualization)

#### UI/UX Enhancements
<input disabled="" type="checkbox"> Add loading skeletons instead of simple loading text
<input disabled="" type="checkbox"> Implement proper animations for page transitions and loading states
<input disabled="" type="checkbox"> Enhanced error states with retry functionality
<input disabled="" type="checkbox"> Advanced filtering and search capabilities for players
<input disabled="" type="checkbox"> Improve responsive design for various device types and orientations
<input disabled="" type="checkbox"> Add dark mode support

#### Architecture & Code Quality
<input disabled="" type="checkbox"> Implement state management solution for larger application scale (Redux, Zustand, or Context)
<input disabled="" type="checkbox"> Add stronger typing with more specific TypeScript interfaces
<input disabled="" type="checkbox"> Extract business logic into custom hooks for better separation of concerns
<input disabled="" type="checkbox"> Implement React Error Boundaries for graceful error recovery
<input disabled="" type="checkbox"> Create a component library with Storybook for better documentation

#### Testing & Quality Assurance
<input disabled="" type="checkbox"> Increase test coverage with more edge cases
<input disabled="" type="checkbox"> Add end-to-end tests with Cypress or Playwright
<input disabled="" type="checkbox"> Implement visual regression testing
<input disabled="" type="checkbox"> Add accessibility (a11y) testing
<input disabled="" type="checkbox"> Performance testing and monitoring

#### Deployment & DevOps
<input disabled="" type="checkbox"> Set up proper CI/CD pipeline
<input disabled="" type="checkbox"> Configure environment-specific variables
<input disabled="" type="checkbox"> Add monitoring and error tracking (e.g., Sentry)
<input disabled="" type="checkbox"> Implement feature flags for controlled rollouts
<input disabled="" type="checkbox"> Configure proper caching headers and CDN distribution

#### Security
<input disabled="" type="checkbox"> Add rate limiting for API requests
<input disabled="" type="checkbox"> Implement CORS properly if creating a backend proxy
<input disabled="" type="checkbox"> Add security headers
<input disabled="" type="checkbox"> Perform dependency vulnerability scanning
<input disabled="" type="checkbox"> Add protection against common web vulnerabilities

#### Accessibility
<input disabled="" type="checkbox"> Ensure proper keyboard navigation
<input disabled="" type="checkbox"> Add ARIA attributes where necessary
<input disabled="" type="checkbox"> Ensure proper color contrast
<input disabled="" type="checkbox"> Test with screen readers
<input disabled="" type="checkbox"> Add focus management for modals and dynamic content


### Key Learnings & Challenges
During the development of this application, I encountered several challenges:

- API Limitations: The Chess.com API doesn't provide pagination for the list of titled players, which required creative solutions for handling large datasets on the client side.
- Performance Optimization: Implementing an efficient infinite scrolling solution that doesn't overload the DOM was challenging but rewarding.
- Testing Complexity: Setting up proper mocks for API calls and handling asynchronous tests required careful consideration.
