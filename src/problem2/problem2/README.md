# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Currency Swap Form

A React-based currency swap application built with TypeScript and Vite that allows users to swap between different cryptocurrencies with real-time pricing and an intuitive interface.

## Features

- **Real-time Currency Swapping**: Interactive form to swap between supported cryptocurrencies
- **Live Price Data**: Fetches real-time token prices from Switcheo's API
- **Token Icons**: Dynamic token icons sourced from Switcheo's token repository
- **Input Validation**: Comprehensive form validation with error messages
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Loading States**: Smooth loading indicators for better user experience
- **Exchange Rate Calculation**: Automatic calculation of exchange rates and swap amounts

## How to Run the App

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone and navigate to the project directory:**

   ```bash
   cd c:\Users\Admin\Desktop\dev\code-challenge\src\problem2\problem2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## What I Built

### Core Implementation

1. **Currency Swap Component**:

   - Built a responsive swap form with "From" and "To" currency selectors
   - Implemented currency switching functionality with a swap button
   - Added real-time amount calculation based on current exchange rates

2. **Token Integration**:

   - Integrated with Switcheo's token icons repository for visual currency representation
   - Fetched live price data from `https://interview.switcheo.com/prices.json`
   - Filtered out tokens without pricing data for better user experience

3. **User Experience Enhancements**:

   - Added input validation for swap amounts (positive numbers only)
   - Implemented loading states during swap operations
   - Created intuitive error messaging for invalid inputs
   - Added smooth animations and transitions

4. **Technical Architecture**:
   - Used React hooks for state management (useState, useEffect, useMemo)
   - Implemented custom hooks for data fetching and price calculations
   - Added TypeScript interfaces for type safety
   - Utilized Vite for fast development and optimized builds

### Key Features Implemented

- **Smart Amount Calculation**: Automatically calculates output amount based on current exchange rates
- **Token Search & Selection**: Dropdown selectors with search functionality for easy token selection
- **Form Validation**: Real-time validation with helpful error messages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading Indicators**: Visual feedback during API calls and swap operations
- **Error Handling**: Graceful handling of network errors and invalid data

### Design Decisions

- **Modern UI**: Clean, card-based design with subtle shadows and rounded corners
- **Color Scheme**: Professional blue and gray palette for trust and reliability
- **Typography**: Clear, readable fonts with proper hierarchy
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Performance**: Optimized re-renders and efficient API calls

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: CSS-in-JS with modern CSS features
- **API Integration**: Fetch API for real-time price data
- **Icons**: SVG icons from Switcheo's token repository
- **Development**: ESLint for code quality and hot reload for rapid development

This implementation showcases modern React development practices, responsive design principles, and attention to user
