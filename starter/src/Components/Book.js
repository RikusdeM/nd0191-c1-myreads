import BookSelector from "./BookSelector";

const Book = ({ book }) => {
  // console.log("book: " + JSON.stringify(book));
  const imageLink = () => {
  try {
    if (book.imageLinks.thumbnail) {      
      return (
        book.imageLinks.thumbnail
      )
    }
  } catch {
    return ("")
  }
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
        <div className="book-shelf-changer">
          <BookSelector />
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors.length > 1
          ? book.authors.map((author) => `${author}, `)
          : book.authors}
      </div>
    </div>
  );
};

export default Book;
