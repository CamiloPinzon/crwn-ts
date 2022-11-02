import { useContext } from "react";

import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const categoriesTitles = Object.keys(categoriesMap);

  return (
    <>
      {categoriesTitles.map((title, index) => {
        const products = (categoriesMap as any)[title];
        return (
          <CategoryPreview key={index} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
