import { useState } from "react";
import { bookCategories } from "../App";
import PropTypes from "prop-types";

const BookSelector = ({ shelf, updateBookCategory }) => {
  const [shelfState, setShelfState] = useState("");

  const onCategoryChange = (category) => {
    setShelfState(category);
    updateBookCategory(category);
  };

  return (
    <div className="book-shelf-changer">
      <select
        name="bookshelfSelector"
        value={shelfState === "" ? shelf : shelfState}
        defaultChecked={true}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value={bookCategories.CURRENTLYREADING}>
          Currently Reading
        </option>
        <option value={bookCategories.WANTTOREAD}>Want to Read</option>
        <option value={bookCategories.READ}>Read</option>
        <option value={bookCategories.NONE}>None</option>
      </select>
    </div>
  );
};

BookSelector.propTypes = {
  shelf: PropTypes.string.isRequired,  
  updateBookCategory: PropTypes.func.isRequired,
};

export default BookSelector;
