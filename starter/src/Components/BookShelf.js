import PropTypes from "prop-types";
import Book from "./Book";

const Bookshelf = ({ title, books, updateBooksCollection }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={index}>
              <Book book={book} updateShelf={updateBooksCollection} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  updateBooksCollection: PropTypes.func.isRequired,
};

export default Bookshelf;
