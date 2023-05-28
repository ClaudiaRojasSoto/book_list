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

const saveBooksToLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
  };


  const addBook = (event) => {
   event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  if (title !== '' && author !== '') {
    const book = { title, author };
    books.unshift(book);
    saveBooksToLocalStorage();
    displayBooks();
    titleInput.value = '';
    authorInput.value = '';
  }
};