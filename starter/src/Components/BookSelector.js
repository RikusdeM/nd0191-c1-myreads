import { bookCategories } from "../App";

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

export default BookSelector;
