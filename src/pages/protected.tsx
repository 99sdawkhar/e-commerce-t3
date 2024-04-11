import { useState, useEffect } from 'react';

const Protected = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the database
    const fetchCategories = async () => {
      // Implement fetching logic using tRPC or other API methods
      // Set the fetched categories to the state
      // setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleCategorySelection = (categoryId: number) => {
    // Implement category selection logic
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategorySelection(category.id)}
              />
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Protected;