import { bookCategories } from "../App";
import BookSelector from "./BookSelector";
import PropTypes from "prop-types";

const Book = ({ book, updateShelf }) => {
  // console.log("book: " + JSON.stringify(book));
  const imageLink = () => {
    try {
      if (book.imageLinks.thumbnail) {
        return book.imageLinks.thumbnail;
      }
    } catch {
      return "";
    }
  };

  const updateBook = (category) => {
    console.log("update with " + category)
    console.log("book")
    console.log(book)
    book.shelf = category; //pointer operation
    updateShelf(book);
  };

  const checkShelf = () => {
    return book.shelf ? book.shelf : bookCategories.NONE;
  };

  const bookAuthor = (book) => {
    try {
      if (book.authors.length > 1) {
        book.authors.map((author, index) => {
          if (index !== book.authors.length - 1) {
            return `${author}; `;
          } else {
            return `${author}`;
          }
        });
      } else {
        return book.authors;
      }
    } catch {
      return "";
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLink()})`,
          }}
        ></div>
        <BookSelector shelf={checkShelf()} updateBookCategory={updateBook} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{bookAuthor(book)}</div>
    </div>
  );
};

// Book.propTypes = {
//   book: PropTypes.array.isRequired,
// };

export default Book;
