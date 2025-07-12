import { createContext, useContext, useState } from "react";

const CategoryContext = createContext([]);

export const CategoryProvider = ({ initialCategories = [], children }) => {
  const [categories] = useState(initialCategories);
  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
