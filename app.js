const group = document.querySelector('ul');
const addBtn = document.querySelector('.push');
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

let content = '';

const generate = (dt) => {
  return `<li>
    <h2>${dt.title} by ${dt.author}</h2>
    <button class='remove'>${dt.id}</button>
  </li>`;
};

const displayData = (data) => {
  data.forEach((book) => {
    content += generate(book);
    group.innerHTML = content;
  });
  content = '';
};

let getData = JSON.parse(localStorage.getItem('books'));

window.addEventListener(
  'load',
  () => {
    if (!getData) {
      localStorage.setItem('books', JSON.stringify(booksData));
      getData = JSON.parse(localStorage.getItem('books'));
      displayData(getData);
    } else displayData(getData);
    const removeBtn = document.querySelectorAll('.remove');
    Array.from(removeBtn).forEach((bt) => {
      bt.addEventListener('click', () => {
        console.log('adsad');
        console.log(bt);
        removeBook();
      });
    });
  },
  false
);

const removeBook = () => {
  const toto = getData.filter((element, index) => {
    return element.id !== index;
  });

  localStorage.setItem('books', JSON.stringify(toto));
  displayData(getData);
};

const addBook = () => {
  getData.push({
    title: titleInput.value,
    author: authorInput.value,
    id: getData.length ? getData[getData.length - 1].id + 1 : 1,
  });

  localStorage.setItem('books', JSON.stringify(getData));
  displayData(getData);
};

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});
