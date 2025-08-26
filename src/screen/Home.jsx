import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const searchTerm = useSelector(state => state.search.searchTerm);
  const [allItems, setAllItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("http://localhost:5000/displaydata", {
          method: 'POST',
        });
        const json = await resp.json();
        setAllItems(json[0]);
        setCategories(['All', ...new Set(json[0].map(item => item.category))]);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    })();
  }, []);

  const filteredItems = allItems.filter(item => {
    const name = item?.name || '';
    const matchesSearch = name.toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map(cat => (
            <li
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        {filteredItems.length ? (
          <div className="cards-grid">
            {filteredItems.map((item) => (
              <Cards key={item._id} fooditems={item} quantity={item.option} />
            ))}
          </div>
        ) : (
          <h4>No items found</h4>
        )}
      </main>
    </div>
  );
};

export default Home;
