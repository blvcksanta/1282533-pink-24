var modalError = document.querySelector('.modal-error');
var modalErrorButton = document.querySelector('.modal-error__button');
var modalSuccess = document.querySelector('.modal-success');
var modalSuccessButton = document.querySelector('.modal-success__button');

// Добавляет класс disable для модального окна с ошибкой
modalErrorButton.addEventListener('click', function() {
  if (modalError.classList.contains('modal-error__disable')) {
    modalError.classList.remove('modal-error__disable');
  } else {
    modalError.classList.add('modal-error__disable');
  }
});

// Добавляет класс disable для модального окна с успешным заполнением
modalSuccessButton.addEventListener('click', function() {
  if (modalSuccess.classList.contains('modal-success__disable')) {
    modalSuccess.classList.remove('modal-success__disable');
  } else {
    modalSuccess.classList.add('modal-success__disable');
  }
});
