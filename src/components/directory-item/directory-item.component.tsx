import "./directory-item.styles.scss";

interface DirectoryItemProps {
  imageUrl: string;
  title: string;
}

const DirectoryItem = ({ imageUrl, title }: DirectoryItemProps) => {
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-item-body-container">
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
