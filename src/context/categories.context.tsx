import { createContext, ReactNode, useState, useEffect } from "react";
import {getCollectionAndDocuments} from '../utils/firebase/firebase.utils';

interface ProductsInterface {
  children: ReactNode;
}

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider: React.FC<ProductsInterface> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async() =>{
      setCategoriesMap(await getCollectionAndDocuments());
    }
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
