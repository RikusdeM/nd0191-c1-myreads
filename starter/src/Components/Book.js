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
    book.shelf = category //pointer operation    
    updateShelf(book)
  }

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
        <BookSelector shelf={book.shelf} updateBookCategory={updateBook} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors.length > 1
          ? book.authors.map((author, index) => {
              if (index !== book.authors.length - 1) {
                return `${author}; `;
              } else {
                return `${author}`;
              }
            })
          : book.authors}
      </div>
    </div>
  );
};

// Book.propTypes = {
//   book: PropTypes.array.isRequired,  
// };

export default Book;
