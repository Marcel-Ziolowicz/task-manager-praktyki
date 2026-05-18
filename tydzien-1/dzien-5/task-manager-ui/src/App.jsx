import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  const tasks = [
    {
      id: 1,
      title: "Learn React",
      done: false,
      category: "Nauka",
    },
    {
      id: 2,
      title: "Build API",
      done: true,
      category: "Praca",
    },
    {
      id: 3,
      title: "Clean room",
      done: false,
      category: "Dom",
    },
  ];

  return (
    <div>
      <Header title="Task Manager" />

      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
