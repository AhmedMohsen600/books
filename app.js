// const Store = require('./util/store');
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}
class UI {
  static displayBooks(books) {
    const list = document.querySelector('#book-list');
    if (!books.length) list.innerHTML = '';
    let content = '';
    books.forEach((book) => {
      content += `<tr id=${book.id}>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        </tr>`;
      list.innerHTML = content;
    });
    content = '';
  }

  static generateId = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  static cleanInputs() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// localstorage
class Store {
  static getBooks() {
    let books;
    if (!localStorage.getItem('books')) books = [];
    else books = JSON.parse(localStorage.getItem('books'));
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    UI.displayBooks(books);
  }

  static removeBook(id) {
    let books = Store.getBooks();
    books = books.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    UI.displayBooks(books);
  }
}

// events
document.addEventListener('DOMContentLoaded', () => {
  const books = Store.getBooks();
  UI.displayBooks(books);
});

document.querySelector('#form-book').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author, UI.generateId());
  Store.addBook(book);
  UI.cleanInputs();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  const { id } = e.target.parentElement.parentElement;
  Store.removeBook(id);
});
