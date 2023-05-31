class BookList {
  constructor() {
    this.bookListContainer = document.getElementById('book-list-container');
    this.inputTitle = document.getElementById('title');
    this.inputAuthor = document.getElementById('author');
    this.inputButton = document.getElementById('add-button');
    this.books = [];

    this.loadBooksFromLocalStorage();
    this.inputButton.addEventListener('click', this.addBook.bind(this));

    this.setupNavigation();
  }

  displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('book-item');

      const titleElement = document.createElement('p');
      titleElement.textContent = `Title: ${book.title}`;

      const authorElement = document.createElement('p');
      authorElement.textContent = `Author: ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      listItem.appendChild(titleElement);
      listItem.appendChild(authorElement);
      listItem.appendChild(removeButton);

      bookList.appendChild(listItem);
    });

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

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSectionId = link.getAttribute('href').substring(1);
        this.showSection(targetSectionId);
      });
    });
  }

  showSection = (sectionId) => {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach((link) => {
      if (link.getAttribute('href').substring(1) === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bookList = new BookList();
  bookList.displayBooks();
  updateDateTime();

  function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();

    const options = {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
    };
    const dateTimeString = now.toLocaleString('en-US', options);

    const formattedDateTime = dateTimeString.replace(',', '');

    datetimeElement.textContent = formattedDateTime;
  }

  setInterval(updateDateTime, 1000);
});
