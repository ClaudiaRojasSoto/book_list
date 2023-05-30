class BookList {
  constructor() {
    this.bookListContainer = document.getElementById('book-list-container');
    this.inputTitle = document.getElementById('title');
    this.inputAuthor = document.getElementById('author');
    this.inputButton = document.getElementById('add-button');
    this.books = [];

    this.loadBooksFromLocalStorage();
    this.inputButton.addEventListener('click', this.addBook.bind(this));
  }

  displayBooks() {
    this.bookListContainer.innerHTML = '';

    const list = document.createElement('ul');
    list.classList.add('list-container');

    this.books.forEach((book, index) => {
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
        this.removeBook(index);
      });

      listItem.appendChild(titleElement);
      listItem.appendChild(authorElement);
      listItem.appendChild(removeButton);
      listItem.appendChild(lineElement);

      list.appendChild(listItem);
    });

    this.bookListContainer.appendChild(list);

    if (this.books.length === 0) {
      this.bookListContainer.style.display = 'none';
    } else {
      this.bookListContainer.style.display = 'block';
    }
  }

  loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
    this.displayBooks();
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook(event) {
    event.preventDefault();
    const title = this.inputTitle.value;
    const author = this.inputAuthor.value;
    if (title !== '' && author !== '') {
      const book = { title, author };
      this.books.unshift(book);
      this.saveBooksToLocalStorage();
      this.displayBooks();
      this.inputTitle.value = '';
      this.inputAuthor.value = '';
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
    this.displayBooks();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bookList = new BookList();
});
