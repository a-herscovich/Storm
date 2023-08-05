import React, { useState, useEffect } from "react";
import "./ProductTable.scss";
import StatusBadge from "../StatusBadge/StatusBadge";
import ProductInfoModal from "../ProductInfoModal/ProductInfoModal";

const ProductTable = ({ filterText, products, setFilterText }) => {
  // State for modal being shown and hidden, initially hidden
  const [showProductModal, setShowProductModal] = useState(false);
  // State for the product that will be displayed in the modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State which displays the order for products to be displayed
  const [productsArray, setProductsArray] = useState([]);
  // State for whether the products have been sorted or not
  const [sorted, setSorted] = useState(false);
  // State for whether the products have been sorted by ascending or descending price
  const [ascending, setAscending] = useState(false);
  // State for the table markup to display based on product order
  const [productsMarkup, setProductsMarkup] = useState(<></>);

  // Open and close modal handlers
  const handleCloseModal = () => setShowProductModal(false);
  const handleShowModal = () => setShowProductModal(true);

  // Turns the json products from props to a format that can be iterated on
  function getProductsArray() {
    setProductsArray(Object.values(products).flat());
  }

  // Filtering function to include only products where the title includes the search text
  // filterText from props has already been trimmed and set to lowercase
  function filterByText(product) {
    if (product.product?.toLowerCase().includes(filterText)) {
      return true;
    }
    return false;
  }

  // Sorts products by price, then sets state involved in displaying the sorted products
  function sortByPriceLowToHigh() {
    const asc = [...productsArray].sort((a, b) => a.total - b.total);
    setProductsArray(asc);
    setSorted(true);
    setAscending(true);
  }

  function sortByPriceHighToLow() {
    const desc = [...productsArray].sort((a, b) => b.total - a.total);
    setProductsArray(desc);
    setSorted(true);
    setAscending(false);
  }

  // To unsort data, get the json products which have been converted to the iterable format
  // and set the states involved in displaying the products
  function unsortData() {
    getProductsArray();
    setSorted(false);
    setAscending(true);
  }

  // On the first click of the prices table header, sorts price low to high.
  // On the second click, sorts price high to low.
  // On the third click, unsorts prices and sets to original order.
  const handleSortClick = () => {
    if (!sorted) {
      sortByPriceLowToHigh();
    } else if (ascending) {
      sortByPriceHighToLow();
    } else {
      unsortData();
    }
  };

  // To avoid repeating code, map will return this template markup
  const productMarkupTemplate = (item) => {
    return (
      <tr>
        {/* hide-lg are the components to be hidden on a larger breakpoint - ie. the first to disappear */}
        <td className="hide-lg">{item.id}</td>
        <td className="statusData hide-lg">
          <StatusBadge label="Status" variant="active" />
        </td>
        {/* hide-md are the components to be hidden on a medium breakpoint - ie. the second to disappear */}
        <td className="hide-md">{item.quantity}</td>
        <td className="product">
          <div
            onClick={() => {
              setSelectedProduct(item.product);
              handleShowModal();
            }}
          >
            {item.product}
          </div>
          <div className="productInfo">
            <div className="serial">{item.serial}</div>
            <div className="quantityLabel"> - Qty: {item.quantity}</div>
          </div>
        </td>
        {/* hide-sm are the components to be hidden on a smaller breakpoint - ie. the last to disappear */}
        <td className="total hide-sm">${item.total}</td>
      </tr>
    );
  };

  // when products from props or filterText changes, useEffect will trigger state changes which will set the productsMarkup.
  // we either call the map function on a filtered array if there is search text,
  // or we call the map function on the non-filtered array if no search text
  useEffect(() => {
    products && getProductsArray();
    setProductsMarkup(
      filterText && filterText.length > 0
        ? productsArray &&
            productsArray
              .filter(filterByText)
              .map((item) => productMarkupTemplate(item))
        : productsArray &&
            productsArray.map((item) => productMarkupTemplate(item))
    );
  }, [products, filterText]);

  // when productsArray changes, useEffect will trigger state changes which will set the productsMarkup.
  // productsArray changes when we sort the data
  // we either call the map function on a filtered array if there is search text,
  // or we call the map function on the non-filtered array if no search text
  useEffect(() => {
    filterText
      ? setProductsMarkup(
          productsArray &&
            productsArray
              .filter(filterByText)
              .map((item) => productMarkupTemplate(item))
        )
      : setProductsMarkup(
          productsArray.map((item) => productMarkupTemplate(item))
        );
  }, [productsArray]);

  // If no products are returned, show a message
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="products">
      <ProductInfoModal
        product={selectedProduct}
        handleClose={handleCloseModal}
        show={showProductModal}
      />
      <div className="productHeader">
        <span className="tableHeading">Products </span>
        {/* The value changes when we filter results to show the number of results */}
        <span className="tableSubheading">
          {`${
            filterText && filterText.length
              ? productsArray.filter(filterByText).length
              : productsArray.length
          } of 64 results`}
        </span>
      </div>
      <table>
        <colgroup>
          <col className="hide-lg" style={{ width: "6%" }} />
          <col className="hide-lg" style={{ width: "12%" }} />
          <col className="hide-md" style={{ width: "11%" }} />
          <col style={{ width: "57%" }} />
          <col className="hide-sm" style={{ width: "14%" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="hide-lg">ID</th>
            <th className="hide-lg">Status</th>
            <th className="hide-md">Quantity</th>
            <th>Product Name</th>
            <th
              className="totalHeader hide-sm"
              onClick={() => handleSortClick()}
            >
              <span>Prices</span>
              <i className="bi bi-chevron-down font-weight-bold"></i>
            </th>
          </tr>
        </thead>
        <tbody>{productsMarkup}</tbody>
      </table>
      {/* After we have filtered, we can reset the filter text and show all results again */}
      {filterText && filterText.length > 0 && (
        <span className="viewAll" onClick={() => setFilterText("")}>
          View all products
        </span>
      )}
    </div>
  );
};

export default ProductTable;
