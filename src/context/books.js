import { createContext, useState, useCallback } from 'react';

import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const result = await axios.get('http://localhost:3001/books');

    setBooks(result.data);
  }, []);

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const removedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(removedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const result = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const editedBook = books.map((book) => {
      if (book.id === id) return { ...book, ...result.data };
      return book;
    });
    setBooks(editedBook);
  };

  const createBook = async (title) => {
    const result = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...books, result.data];
    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    createBook,
    editBookById,
    deleteBookById,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
