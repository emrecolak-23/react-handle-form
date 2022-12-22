import { useState } from 'react';

import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const deleteBookById = (id) => {
    const removedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(removedBooks);
  };

  const editBookById = (id, title) => {
    console.log(title);
    const editedBook = books.map((book) => {
      if (book.id === id) return { ...book, title };
      return book;
    });
    setBooks(editedBook);
  };

  const createBook = (title) => {
    const updatedBooks = [
      ...books,
      { id: Math.round(Math.random() * 9999), title },
    ];
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
