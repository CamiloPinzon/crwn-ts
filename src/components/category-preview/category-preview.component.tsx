import { Link } from "react-router-dom";

import { ProductType } from "../../types/product.type";
import ProductCard from "../product-card/product-card.component";
import { RoutesLinks } from "../../routes/routes.enum";
import "./category-preview.styles.scss";

interface CategoryPreviewInterface {
  title: string;
  products: ProductType[];
}

const CategoryPreview = ({ title, products }: CategoryPreviewInterface) => {
  const { SHOP } = RoutesLinks;
  return (
    <div className="category-preview-container">
      <Link to={`${SHOP}/${title.toLowerCase()}`}>
        <h2 className="title">{title}</h2>
      </Link>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
