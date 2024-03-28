import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./Components/SearchPage";
import Bookshelf from "./Components/BookShelf";
import * as BooksAPI from "./BooksAPI";
import * as lodash from "lodash";
import { Route, Routes, Link } from "react-router-dom";

export const bookCategories = {
  READ: "read",
  WANT_TO_READ: "wantToRead",
  CURRENTLY_READING: "currentlyReading",
  NONE: "none",
};

function App() {
  const [books, setBooks] = useState([{}]);
  const [, setBooksUpdated] = useState(false);

  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => setBooks(books))
      .finally(() => console.log("Books have been loaded into state"));
  }, []);

  const addNewBook = (updatedBook) => {
    updateBookBackend(updatedBook);        
    if (!lodash.includes(books, updatedBook)) {
      setBooks((booksCollection) => [...booksCollection, updatedBook]);
    }
    setBooksUpdated((oldState) => !oldState);
  };

  const updateBookBackend = (updatedBook) => {
    BooksAPI.update(updatedBook, updatedBook.shelf).then((res) =>
      console.log(res)
    );
  };

  const updateBooksState = (updatedBook) => {    
    setBooksUpdated((oldState) => !oldState);    
    updateBookBackend(updatedBook);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf
                    title={"Currently Reading"}
                    books={books.filter(
                      (book) => book.shelf === bookCategories.CURRENTLY_READING
                    )}
                    updateBooksCollection={updateBooksState}
                  />
                  <Bookshelf
                    title={"Want to Read"}
                    books={books.filter(
                      (book) => book.shelf === bookCategories.WANT_TO_READ
                    )}
                    updateBooksCollection={updateBooksState}
                  />
                  <Bookshelf
                    title={"Read"}
                    books={books.filter(
                      (book) => book.shelf === bookCategories.READ
                    )}
                    updateBooksCollection={updateBooksState}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to={{ pathname: "/search" }}>Add a book</Link>
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <SearchPage booksInShelf={books} updateBookShelf={addNewBook} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
