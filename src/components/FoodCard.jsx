
function FoodCard({ food, onAdd, quantity }) {
  return (
    <article className="food-card">
      <div
        className="food-image"
        style={{ backgroundColor: food.color }}
      >
        {food.image ? (
          <img src={food.image} alt={food.name} />
        ) : (
          <span className="food-emoji">{food.emoji}</span>
        )}

        <span className="rating">★ {food.rating}</span>
      </div>

      <div className="food-info">
        <div className="food-title-row">
          <h3>{food.name}</h3>
          <span className="food-category">{food.category}</span>
        </div>

        <p>{food.description}</p>

        <div className="food-meta">
          <span>◷ {food.time}</span>
          <strong>₹{food.price}</strong>
        </div>

        <button
          className="add-button"
          onClick={() => onAdd(food)}
        >
          {quantity > 0
            ? `Add More (${quantity}) +`
            : "+ Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default FoodCard;

