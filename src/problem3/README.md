# Problem 3 - WalletPage Component Refactoring

## Issues Found in Original Code (test.tsx)

### 1. **Runtime Error - Undefined Variable**
- **Line 38**: `lhsPriority` used but never defined
- **Impact**: Application crashes when filtering balances

### 2. **TypeScript Type Issues**
- **Line 17**: `blockchain` parameter uses `any` type
- **Line 1**: `WalletBalance` interface missing `blockchain` property
- **Impact**: Loss of type safety and potential runtime errors

### 3. **Logic Problems**
- **Lines 38-43**: Incorrect nested if statements with wrong filtering logic
- **Lines 45-53**: Inefficient sorting implementation
- **Impact**: Poor performance and incorrect balance filtering

### 4. **Data Flow Issues**
- **Lines 56-61**: `formattedBalances` created but never used
- **Line 63**: Uses `sortedBalances` instead of `formattedBalances` in render
- **Impact**: Inconsistent data formatting and type mismatches

### 5. **Performance Issues**
- **Line 54**: Unnecessary `prices` dependency in `useMemo`
- **No memoization**: Missing `useMemo` for expensive operations
- **Impact**: Unnecessary re-renders and performance degradation

### 6. **Code Quality Issues**
- **Line 13**: Unused `children` prop destructuring
- **Generic naming**: `Props` interface too generic
- **Impact**: Confusing code structure and unclear component API

## Improvements Made in Solutions

### Common Fixes Applied to Both Solutions:

#### 1. **Type Safety Enhancements**
```typescript
type BlockchainTypes = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo" | (string & {});

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockchainTypes;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}
```

#### 2. **Fixed Logic Errors**
- Eliminated undefined `lhsPriority` variable
- Corrected filtering logic: `balance.priority > -99 && balance.amount > 0`
- Simplified sorting: `rhs.priority - lhs.priority`

#### 3. **Optimized Data Processing**
- Combined mapping, filtering, and sorting into single `useMemo`
- Pre-calculated priority values to avoid repeated function calls
- Proper dependency arrays for memoization

#### 4. **Improved Code Structure**
- Renamed `Props` to `WalletPageProps`
- Removed unused `children` prop
- Added proper TypeScript return types
- Consistent use of `formattedBalances` throughout

### Additional Improvements in Clean Version (solutionWithoutComment.tsx):

#### 1. **Cleaner Code Structure**
- Removed all explanatory comments for production-ready code
- Cleaner, more readable implementation
- Focused on essential functionality

#### 2. **Enhanced USD Value Calculation**
- Added dedicated `getUsdValue` function for better separation of concerns
- Improved calculation logic for USD values
- Better reusability of USD calculation logic

#### 3. **Streamlined Implementation**
```typescript
const getUsdValue = (balance: WalletBalance): number => {
  return prices[balance.currency] * balance.amount;
};
```

#### 4. **Optimized Dependencies**
- Correctly managed `useMemo` dependencies
- Proper inclusion of `prices` in rows memo dependency array
- Better performance through optimized re-render triggers

## Key Technical Improvements

1. **Bug Elimination**: Fixed all runtime errors and type issues
2. **Type Safety**: Complete TypeScript coverage with proper interfaces
3. **Performance**: Optimized rendering with proper memoization
4. **Maintainability**: Clear code structure with logical data flow
5. **Consistency**: Unified approach to data transformation
6. **Production Ready**: Clean implementation without development comments

## Files
- `test.tsx`: Original problematic implementation
- `solution.tsx`: Refactored implementation with detailed comments explaining changes
- `solutionWithoutComment.tsx`: Clean, production-ready implementation without comments
