import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([{}]);

  const searchForBooks = () => {
    BooksAPI.search(query, 14)
      .then((books) => setBooks(books))
      .finally(() => console.log("Search results have been updated"));
  };

  const onInputChange = (event) => {
    setQuery(event.target.value);
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (query.length > 0) {
        searchForBooks();
      }
    }
  };

  console.log(books);
  //   console.log(books.length);
  //   console.log(books.authors)

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={{ pathname: "/" }}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.length > 1
            ? books.map((book, index) => (
                <li key={index}>
                  <Book book={book} updateShelf={() => {}} />
                </li>
              ))
            : "No search results found"}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
