import { configureStore } from "@reduxjs/toolkit";


export const createMockStore = () =>
  configureStore({
    reducer: () => ({}), // empty reducer, you don't need state here
  });