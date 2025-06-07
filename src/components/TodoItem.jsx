// components/TodoItem.jsx
export default function TodoItem({ todo, onEdit, onDelete, onToggleComplete }) {
  return (
    <li className="flex items-center justify-between mb-3" key={todo.id}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed || false}
          onChange={() => onToggleComplete(todo.id, todo.completed)}
          className="w-5 h-5 cursor-pointer"
        />
        <div>
          <strong className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.title}
          </strong>{" "}
          - {todo.description || "No description"} -{" "}
          {todo.due_date ? new Date(todo.due_date).toLocaleDateString() : "No due date"}
        </div>
      </div>
      <div>
        <button
          onClick={() => onEdit(todo)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition ml-2"
        >
          Chỉnh sửa
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition ml-2"
        >
          Xóa
        </button>
      </div>
    </li>
  );
}
