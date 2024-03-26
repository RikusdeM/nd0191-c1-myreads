import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./Components/SearchPage";
import Book from "./Components/Book";
import Bookshelf from "./Components/BookShelf";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes, useNavigate, Link } from "react-router-dom";

export const bookCategories = {
  READ: "read",
  WANTTOREAD: "wantToRead",
  CURRENTLYREADING: "currentlyReading",
  NONE: "none",
};

function App() {
  let navigate = useNavigate();

  const [books, setBooks] = useState([{}]);
  const [booksUpdated, setBooksUpdated] = useState(false);

  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => setBooks(books))
      .finally(() => console.log("Books have been loaded into state"));
  }, []);

  const updateBooksState = (updatedBook) => {
    //trigger re-render and update backend
    setBooksUpdated((oldState) => !oldState);
        
    BooksAPI.update(updatedBook, updatedBook.shelf)
    .then((res) => console.log(res))
  };

  // console.log("all books");
  // books.map((book) => console.log(book));

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
                      (book) => book.shelf === bookCategories.CURRENTLYREADING
                    )}
                    updateBooksCollection={updateBooksState}
                  />
                  <Bookshelf
                    title={"Want to Read"}
                    books={books.filter(
                      (book) => book.shelf === bookCategories.WANTTOREAD
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
                <Link to={{ pathname: "/addBook" }}>Add a book</Link>
              </div>
            </div>
          }
        />
        <Route exact path="/addBook" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
