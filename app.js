const group = document.querySelector('ul');
const addBtn = document.querySelector('.push');
const removeBtn = document.querySelector('.remove');
const authorInput = document.querySelector('.author');
const titleInput = document.querySelector('.title');
const submit = document.querySelector('form');

const booksData = [
  {
    title: 'MG6',
    author: 'ahmed',
    id: 1,
  },
  {
    title: 'BMW',
    author: 'mohamed',
    id: 2,
  },
  {
    title: 'toyota',
    author: 'osama',
    id: 3,
  },
];

let getData = JSON.parse(localStorage.getItem('books'));

let content = '';

const displayData = (data) => {
  data.forEach((book) => {
    content += `<li>
      <h2>${book.title} by ${book.author}</h2>
      <button class="remove">Remove</button>
    </li>`;
    group.innerHTML = content;
  });
};

window.addEventListener(
  'load',
  () => {
    if (!getData) {
      localStorage.setItem('books', JSON.stringify(booksData));
      getData = JSON.parse(localStorage.getItem('books'));
      displayData(getData);
    } else displayData(getData);
  },
  false
);

const addBook = () => {
  getData.push({
    title: titleInput.value,
    author: authorInput.value,
  });
  localStorage.setItem('books', JSON.stringify(getData));
  displayData(getData);
};

const removeBook = (id) => {};

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});
