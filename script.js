document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const popupContainer = document.getElementById('popup-container');

  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();

  let hasError = false;

  // Очистка прошлых сообщений
  popupContainer.innerHTML = '';

  if (!name) {
    nameInput.style.border = '2px solid rgba(186, 69, 69, 1)';
    showPopupMessage('Поле "Имя" не заполнено. Пожалуйста, заполните его.', 'error');
    hasError = true;
  } else {
    nameInput.style.border = '';
  }

  if (!surname) {
    surnameInput.style.border = '2px solid rgba(186, 69, 69, 1)';
    showPopupMessage('Поле "Фамилия" не заполнено. Пожалуйста, заполните его.', 'error');
    hasError = true;
  } else {
    surnameInput.style.border = '';
  }

  if (hasError) {
    return;
  }

  const list = document.getElementById('list');
  const row = document.createElement('tr');

  const fullNameCell = document.createElement('td');
  fullNameCell.classList.add('name-column');

  const fullNameText = document.createElement('span');
  fullNameText.classList.add('name-text');
  fullNameText.innerHTML = `${name} ${surname}`;

  fullNameCell.appendChild(fullNameText);
  fullNameCell.appendChild(createButton('Отметить как прогульщика', 'absent'));
  fullNameCell.appendChild(createButton('Отметить как хорошего человека', 'good'));
  fullNameCell.appendChild(createResetButton('reset', row)); // Добавлена кнопка сброса для каждой строки
  fullNameCell.appendChild(createDeleteButton('delete', row)); // Добавлена кнопка удаления

  row.appendChild(fullNameCell);
  list.appendChild(row);

  nameInput.value = '';
  surnameInput.value = '';

  nameInput.style.border = '2px solid rgba(69, 186, 120, 1)';
  surnameInput.style.border = '2px solid rgba(69, 186, 120, 1)';

  setTimeout(() => {
    nameInput.style.border = '';
    surnameInput.style.border = '';
  }, 1000);

  showPopupMessage('Успешно!', 'success');
});

document.getElementById('reset-button').addEventListener('click', function () {
  const list = document.getElementById('list');
  list.innerHTML = ''; // Очистить всю таблицу
});

function createButton(label, type) {
  const button = document.createElement('button');
  button.textContent = label;

  if (type === 'absent') {
    button.className = 'absent-button';
    button.addEventListener('click', function () {
      button.closest('tr').style.backgroundColor = 'rgba(186, 69, 69, 0.5)';
    });
  } else if (type === 'good') {
    button.className = 'good-button';
    button.addEventListener('click', function () {
      button.closest('tr').style.backgroundColor = 'rgba(69, 186, 120, 0.5)';
    });
  }

  return button;
}

function createResetButton(type, row) {
  const button = document.createElement('button');
  button.className = 'reset-button';
  button.textContent = 'Сбросить метку';

  button.addEventListener('click', function () {
    row.style.backgroundColor = 'white';
  });

  return button;
}

function createDeleteButton(type, row) {
  const button = document.createElement('button');
  button.className = 'reset-button';
  button.textContent = 'Удалить';

  button.addEventListener('click', function () {
    row.remove();
  });

  return button;
}

function showPopupMessage(message, type) {
  const popupContainer = document.getElementById('popup-container');
  const popup = document.createElement('div');
  popup.className = type === 'success' ? 'popup-message success' : 'popup-message error';
  popup.textContent = message;

  popupContainer.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
