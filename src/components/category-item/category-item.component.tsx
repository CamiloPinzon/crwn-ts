import "./category-item.styles.scss";

interface CategoryItemProps {
  imageUrl: string;
  title: string;
}

const CategoryItem = ({ imageUrl, title }: CategoryItemProps) => {
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};

export default CategoryItem;
