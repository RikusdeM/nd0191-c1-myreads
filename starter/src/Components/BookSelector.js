import { bookCategories } from "../App";
import PropTypes from "prop-types";

const BookSelector = ({ shelf, updateBookCategory }) => {
  const onCategoryChange = (category) => {
    updateBookCategory(category);
  };

  return (
    <div className="book-shelf-changer">
      <select
        name="bookshelfSelector"
        value={shelf}
        defaultChecked={true}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value={bookCategories.CURRENTLY_READING}>
          {shelf === bookCategories.CURRENTLY_READING ? "✓ " : ""}
          Currently Reading
        </option>
        <option value={bookCategories.WANT_TO_READ}>
          {shelf === bookCategories.WANT_TO_READ ? "✓ " : ""}
          Want to Read
        </option>
        <option value={bookCategories.READ}>
          {shelf === bookCategories.READ ? "✓ " : ""}
          Read
        </option>
        <option value={bookCategories.NONE}>
          {shelf === bookCategories.NONE ? "✓ " : ""}
          None
        </option>
      </select>
    </div>
  );
};

BookSelector.propTypes = {
  shelf: PropTypes.string.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default BookSelector;
