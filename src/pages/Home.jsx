import { useState } from "react";
import foods from "../data/foods";
import FoodCard from "../components/FoodCard";

function Home({ cart, addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Burgers", "Pizza", "Indian", "Sides", "Desserts", "Drinks"];
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase()) || food.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === "All" || food.category === category);
  });
  return (
    <main className="page-container">
      <section className="hero"><div className="hero-content"><span className="eyebrow">GOOD FOOD, GOOD MOOD</span><h1>Delicious food,<br />delivered with love.</h1><p>Discover your favourites and order something delicious today.</p><a href="#menu" className="hero-button">Explore Menu →</a></div><div className="hero-emoji">🍕</div><div className="hero-decoration">🍔</div></section>
      <section className="menu-section" id="menu">
        <div className="section-heading"><div><span className="eyebrow">OUR MENU</span><h2>Explore our menu</h2></div><span className="results-count">{filteredFoods.length} items found</span></div>
        <div className="search-box"><span>🔎</span><input type="text" placeholder="Search burgers, pizza, desserts..." value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button onClick={() => setSearch("")}>Clear</button>}</div>
        <div className="category-list">{categories.map((item) => <button key={item} className={category === item ? "category-button active" : "category-button"} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="food-grid">{filteredFoods.map((food) => { const cartItem = cart.find((item) => item.id === food.id); return <FoodCard key={food.id} food={food} onAdd={addToCart} quantity={cartItem ? cartItem.quantity : 0} />; })}</div>
        {filteredFoods.length === 0 && <div className="empty-state"><span>🍽️</span><h3>No food items found</h3><p>Try another search or choose a different category.</p><button className="primary-button" onClick={() => { setSearch(""); setCategory("All"); }}>Show All Foods</button></div>}
      </section>
    </main>
  );
}
export default Home;
