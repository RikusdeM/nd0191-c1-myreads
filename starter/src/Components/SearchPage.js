import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import * as lodash from "lodash";

const SearchPage = ({ booksInShelf, updateBookShelf }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const consolidatedBooks = (newBooks) => {
    const booksOnShelf = lodash.intersectionBy(newBooks, booksInShelf, "id");
    const booksNotOnShelf = lodash.differenceBy(newBooks, booksOnShelf, "id");

    const booksFromTheShelf = booksOnShelf.map((bookToAdd) => {
      return lodash.find(booksInShelf, ["id", bookToAdd.id]);
    });

    return [...booksFromTheShelf, ...booksNotOnShelf];
  };

  useEffect(() => {
    let isMounted = true;

    const searchBooks = async () => {
      if (query.length === 0) {
        setBooks([]);
        return;
      }

      try {
        const result = await BooksAPI.search(query, 20);
        if (isMounted) {
          if (Array.isArray(result)) {
            setBooks(result.length > 0 ? consolidatedBooks(result) : []);
          } else {
            setBooks([]);
          }
        }
      } catch (error) {
        console.error("Error searching for books:", error);
      }
    };

    searchBooks();

    return () => {
      isMounted = false;
    };
  }, [query]);

  const onInputChange = (event) => {
    const queryValue = event.target.value;
    setQuery(queryValue);
  };

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
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.length > 0 ? (
            books.map((book, index) => (
              <li key={index}>
                <Book book={book} updateShelf={updateBookShelf} />
              </li>
            ))
          ) : (
            <p>No search results found</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
