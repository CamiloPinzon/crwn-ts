import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../context/categories.context";
import { ProductType } from "../../types/product.type";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState<ProductType[]>(
    categoriesMap[category!.toLowerCase() as keyof typeof categoriesMap]
  );

  useEffect(() => {
    setProducts(
      categoriesMap[category!.toLowerCase() as keyof typeof categoriesMap]
    );
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category!.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
