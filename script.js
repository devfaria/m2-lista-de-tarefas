const tasks = [
  { title: "Comprar comida para o gato", type: "Urgente" },
  { title: "Consertar Computador", type: "Importante" },
  { title: "Beber água", type: "Normal" },
  { title: "Enviar relatório trimestral", type: "Importante" },
  { title: "Fazer exercícios físicos", type: "Normal" },
  { title: "Agendar consulta médica", type: "Urgente" },
  { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
  { title: "Limpar a despensa", type: "Importante" },
  { title: "Pagar a conta de energia", type: "Urgente" },
  { title: "Assistir a um documentário interessante", type: "Normal" },
];

function renderElements(tasks) {
  const taskList = document.querySelector('.tasks__list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const newTaskItem = createTaskItem(task);
    taskList.appendChild(newTaskItem);
  });
}

function createTaskItem(task) {
  const li = document.createElement('li');
  li.className = 'task__item';

  const taskInfoContainer = document.createElement('div');
  taskInfoContainer.className = 'task-info__container';

  const taskType = document.createElement('span');
  taskType.className = 'task-type';

  switch (task.type.toLowerCase()) {
    case 'urgente':
      taskType.classList.add('span-urgent');
      taskType.setAttribute('aria-label', 'Urgente');
      break;
    case 'importante':
      taskType.classList.add('span-important');
      taskType.setAttribute('aria-label', 'Importante');
      break;
    case 'normal':
      taskType.classList.add('span-normal');
      taskType.setAttribute('aria-label', 'Normal');
      break;
  }

  const taskTitle = document.createElement('p');
  taskTitle.textContent = task.title;

  const removeButton = document.createElement('button');
  removeButton.className = 'task__button--remove-task';
  removeButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
  </svg>
  `;
  removeButton.addEventListener('click', () => {
    const taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }
    renderElements(tasks);
  });

  taskInfoContainer.appendChild(taskType);
  taskInfoContainer.appendChild(taskTitle);
  taskInfoContainer.appendChild(removeButton);
  li.appendChild(taskInfoContainer);

  return li;
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.form__button--add-task').addEventListener('click', function (event) {
    event.preventDefault();

    const titleInput = document.getElementById('input_title').value;
    const typeSelect = document.querySelector('.form__input--priority').value;

    if (titleInput && typeSelect) {
      const newTask = { title: titleInput, type: typeSelect };

      tasks.push(newTask);
      renderElements(tasks);

      document.getElementById('input_title').value = '';
      document.querySelector('.form__input--priority').value = '';
    } else {
      alert('Por favor, digite um título e selecione um tipo para a tarefa.');
    }
  });

  renderElements(tasks);
});
