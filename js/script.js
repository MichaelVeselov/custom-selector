const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
];

const mainContainer = document.querySelector('#container');

class CustomSelect {
  #id;
  #options;
  #currentSelectedOption;

  constructor(id, options) {
    this.#id = id;
    this.#options = options;
  }

  get selectedValue() {
    return this.#currentSelectedOption;
  }

  set selectedValue(item) {
    this.#currentSelectedOption = item;
  }

  #createBlockWrapper() {
    const blockWrapper = document.createElement('div');
    blockWrapper.classList.add('select-dropdown', `select-dropdown--${this.#id}`);

    return blockWrapper;
  }

  #createSelectButton() {
    const selectButton = document.createElement('button');
    selectButton.classList.add('select-dropdown__button', `select-dropdown__button--${this.#id}`);

    const span = document.createElement('span');
    span.classList.add('select-dropdown__text', `select-dropdown__text--${this.#id}`);
    span.textContent = this.#currentSelectedOption?.text || 'Choose one element';

    selectButton.appendChild(span);

    return selectButton;
  }

  #createListWrapper() {
    const listWrapper = document.createElement('ul');
    listWrapper.classList.add('select-dropdown__list', `select-dropdown__list--${this.#id}`);

    return listWrapper;
  }

  #createListItem(value, text) {
    const listItem = document.createElement('li');
    listItem.classList.add('select-dropdown__list-item');
    listItem.setAttribute('data-value', value);
    listItem.textContent = text;

    return listItem;
  }

  #createBlock() {
    const div = this.#createBlockWrapper();

    const button = this.#createSelectButton();

    const ul = this.#createListWrapper();

    this.#options.forEach((element) => {
      const li = this.#createListItem(element.value, element.text);
      ul.appendChild(li);
    });

    div.append(button, ul);

    return div;
  }

  render(container) {
    const block = this.#createBlock();
    container.appendChild(block);
  }
}

function setValue() {
  document.querySelector('.select-dropdown__text').textContent = dropDownBlock.selectedValue.text;
}

function addSelectedToItem(item) {
  dropDownListItems.forEach((item) => item.classList.remove('selected'));
  item.classList.add('selected');
}

const dropDownBlock = new CustomSelect(Date.now(), options);
dropDownBlock.render(mainContainer);

const dropDownButton = document.querySelector('.select-dropdown__button');
const dropDownListWrapper = document.querySelector('ul');
const dropDownListItems = dropDownListWrapper.querySelectorAll('li');

dropDownButton.addEventListener('click', () => {
  dropDownListWrapper.classList.toggle('active');
});

dropDownListWrapper.addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('select-dropdown__list-item')) {
    const currentValue = target.getAttribute('data-value');
    const currentItem = options.find((item) => item.value == currentValue);
    dropDownBlock.selectedValue = currentItem;
    setValue();
    addSelectedToItem(target);
    dropDownListWrapper.classList.remove('active');
  }
});
