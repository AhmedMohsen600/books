class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

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
    books = books.filter((book) => {
      return book.id !== id;
    });
    localStorage.setItem('books', JSON.stringify(books));
    UI.displayBooks(books);
  }
}

export const module = Store;
