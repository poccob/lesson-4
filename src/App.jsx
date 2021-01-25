import React from 'react';
import TodoItem from './components/TodoItem';

const colors = ['grey', 'red', 'blue', 'orange', 'green'];

function App() {
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      text: 'Попробовать создать ToDo',
      completed: false,
      color: 'grey',
    },
    {
      id: 2,
      text: 'Сохранить задачи стейта',
      completed: false,
      color: 'grey',
    },
  ]);

  const [activeColor, setActiveColor] = React.useState('grey');

  const addTasks = (text) => {
    if (text !== '') {
      const id = tasks.slice(-1)[0].id + 1;
      const completed = false;
      const color = activeColor;
      setTasks([...tasks, { id, text, completed, color }]);
    }
  };

  const keyUpEnter = (event) => {
    if (event.key === 'Enter') {
      addTasks(event.target.value.trim());
      event.target.value = '';
    }
  };

  const removeTask = (index) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      setTasks(
        tasks.filter((obj, i) => {
          return index !== i;
        }),
      );
    }
  };

  const updateTask = (index) => {
    const newText = window.prompt('Напишине новое значение поля');
    if (newText.trim() !== '') {
      setTasks(
        tasks.map((obj, i) => {
          if (index === i) {
            return { ...obj, text: newText };
          }
          return obj;
        }),
      );
    }
  };

  const checkedTask = (index) => {
    setTasks(
      tasks.map((obj, i) => {
        if (index === i) {
          const newChecked = !obj.completed;
          return { ...obj, completed: newChecked };
        }
        return obj;
      }),
    );
  };

  return (
    <div className="App">
      <div className="todo">
        <h2>Список задач</h2>
        {tasks.map((obj, index) => (
          <TodoItem
            key={obj.id}
            removeTask={() => removeTask(index)}
            updateTask={() => updateTask(index)}
            checkedTask={() => checkedTask(index)}
            text={obj.text}
            id={obj.id}
            checked={obj.completed}
            activeColor={obj.color}
          />
        ))}
        <div className="todo-input">
          <input onKeyUp={keyUpEnter} type="text" placeholder="Текст задачи..." autoFocus={true} />
          <ul>
            {colors.map((color, id) => (
              <li
                key={id + color}
                className={`todo-color ${color} ${color === activeColor && 'active'}`}
                onClick={() => {
                  setActiveColor(color);
                }}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
