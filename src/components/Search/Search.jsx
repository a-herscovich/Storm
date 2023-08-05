import React, { useEffect, useState } from "react";
import "./Search.scss";
import Button from "react-bootstrap/Button";

const Search = ({ handleSearch }) => {
  // State for search text input to text field
  const [input, setInput] = useState("");
  // State for if the input is valid
  const [isValidInput, setIsValidInput] = useState(true);

  // input change handler checks if search text only contains alphanumeric characters
  const handleInputChange = (e) => {
    const value = e.target.value;
    const isValid = /^[a-z0-9]+$/i.test(value);
    setInput(value);
    // value === "" is needed to remove error text when search text is empty
    setIsValidInput(isValid || value === "");
  };

  // if the search text is empty, this is valid. This removes error text if it was displayed
  useEffect(() => {
    if (input === "") {
      setIsValidInput(true);
    }
  }, [input]);

  return (
    <div className="search">
      <div className="searchBarContainer">
        <div className="searchBar">
          <i className="bi bi-search fs-6"></i>
          <input
            className="searchInput"
            id="searchText"
            type="text"
            placeholder="Search"
            onChange={(e) => handleInputChange(e)}
            value={input}
          />
        </div>
        <Button
          className="searchBtn"
          // button is displayed if input is invalid to prevent user from proceeding
          disabled={!isValidInput}
          // resets the input to blank after search for ease of use
          onClick={() => {
            handleSearch(input);
            setInput("");
          }}
        >
          Search
        </Button>
      </div>
      {/* Conditionally render error text if not valid input */}
      <div className="errorTextContainer">
        {!isValidInput && (
          <span className="errorText">
            Text must contain only alphanumeric characters.
          </span>
        )}
      </div>
    </div>
  );
};

export default Search;
