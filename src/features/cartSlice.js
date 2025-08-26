import { createSlice } from '@reduxjs/toolkit';

// Helper: same product+size considered same line item -> we use id+price as identity
const sameLine = (a, b) => a.id === b.id && Number(a.price) === Number(b.price);

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // {id, name, price, quantity}
      const found = state.find(i => sameLine(i, item));
      if (found) {
        found.quantity += item.quantity || 1;
      } else {
        state.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    incrementItem: (state, action) => {
      const { id, price } = action.payload;
      const found = state.find(i => i.id === id && Number(i.price) === Number(price));
      if (found) found.quantity += 1;
    },
    decrementItem: (state, action) => {
      const { id, price } = action.payload;
      const found = state.find(i => i.id === id && Number(i.price) === Number(price));
      if (found) {
        found.quantity -= 1;
        if (found.quantity <= 0) {
          return state.filter(i => !(i.id === id && Number(i.price) === Number(price)));
        }
      }
      return state;
    },
    removeFromCart: (state, action) => {
      const { id, price } = action.payload || {};
      if (id !== undefined && price !== undefined) {
        return state.filter(i => !(i.id === id && Number(i.price) === Number(price)));
      }
      // fallback: old behavior with only id
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, incrementItem, decrementItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
