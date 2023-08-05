import { useState, useEffect } from "react";
import { Header, ProductTable } from "./components";

function App() {
  // State for json response of fetching from products.json
  const [products, setProducts] = useState();
  // State for the search text
  const [filterText, setFilterText] = useState();

  // When search text is received, set it to lowercase and trim to be passed to ProductTable
  // Since the search input comes from the Search component within Header, we pass this function down through props to use the input
  const handleSearch = (input) => {
    setFilterText(input.toLowerCase().trim());
  };

  async function getProducts() {
    // fetch products from the products.json file as json and sets state to be passed down to ProductTable
    try {
      let res = await fetch("./products.json", {
        headers: {
          Accept: "application/json",
        },
      });
      let productsJson = await res.json();
      setProducts(productsJson);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // On page load, calls the getProducts function
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <ProductTable
        filterText={filterText}
        setFilterText={setFilterText}
        products={products}
      />
    </div>
  );
}

export default App;
