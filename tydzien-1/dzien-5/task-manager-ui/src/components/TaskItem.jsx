function TaskItem({ task }) {
  return (
    <li
      style={{
        textDecoration: task.done ? "line-through" : "none",
      }}
    >
      {task.title}

      {task.category && <span> [{task.category}]</span>}
    </li>
  );
}

export default TaskItem;
