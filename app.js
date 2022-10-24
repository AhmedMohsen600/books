const group = document.querySelector('ul');
const addBtn = document.querySelector('.push');
const authorInput = document.querySelector('.author');
const titleInput = document.querySelector('.title');
const submit = document.querySelector('form');

let generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const booksData = [
  {
    title: 'MG6',
    author: 'ahmed',
    id: generateId(),
  },
  {
    title: 'BMW',
    author: 'mohamed',
    id: generateId(),
  },
  {
    title: 'toyota',
    author: 'osama',
    id: generateId(),
  },
];

const generate = (dt) => {
  return `<li>
    <h2>${dt.title} by ${dt.author}</h2>
    <button onclick="removeBook('${dt.id}')" class='remove'>Remove</button>
  </li>`;
};

let getData = JSON.parse(localStorage.getItem('books'));
let content = '';
const displayData = (data) => {
  if (!data.length) group.innerHTML = '';
  data.forEach((book) => {
    content += generate(book);
    group.innerHTML = content;
  });
  content = '';
};

const addBook = () => {
  getData.push({
    title: titleInput.value,
    author: authorInput.value,
    id: generateId(),
  });

  localStorage.setItem('books', JSON.stringify(getData));
  displayData(getData);
};

const removeBook = (id) => {
  getData = getData.filter((element) => {
    return element.id !== id;
  });
  localStorage.setItem('books', JSON.stringify(getData));
  displayData(getData);
};

window.addEventListener(
  'load',
  () => {
    if (!getData) {
      localStorage.setItem('books', JSON.stringify([]));
      getData = JSON.parse(localStorage.getItem('books'));
      displayData(getData);
    } else displayData(getData);
  },
  false
);

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});
