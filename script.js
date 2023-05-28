const bookList = document.getElementById('bookList');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const addButton = document.querySelector('#bookForm button');

let books = [];

const loadBooksFromLocalStorage = () => {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    displayBooks();
  }
};
