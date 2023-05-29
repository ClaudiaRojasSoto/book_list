const bookList = document.getElementById('bookList');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const addButton = document.querySelector('#bookForm button');

let books = [];

function displayBooks() {
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const listItem = document.createElement('li');
    const titleElement = document.createElement('p');
    const authorElement = document.createElement('p');
    const removeButton = document.createElement('button');
    const lineElement = document.createElement('hr');

    listItem.style.listStyleType = 'none';

    titleElement.textContent = `Title: ${book.title}`;
    authorElement.textContent = `Author: ${book.author}`;
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () => {
      removeBook(index);
    });

    listItem.appendChild(titleElement);
    listItem.appendChild(authorElement);
    listItem.appendChild(removeButton);
    listItem.appendChild(lineElement);

    bookList.appendChild(listItem);
  });
}

function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    displayBooks();
  }
}

function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function addBook(event) {
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
}
// Problems with declaration of variables and their use
function removeBook(index) {
  books.splice(index, 1);
  saveBooksToLocalStorage();
  displayBooks();
}

document.addEventListener('DOMContentLoaded', loadBooksFromLocalStorage);
addButton.addEventListener('click', addBook);
