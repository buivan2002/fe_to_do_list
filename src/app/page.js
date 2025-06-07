"use client";

import { useState, useEffect } from "react";
import TodoModal from "../components/TodoModal";
import TodoItem from "../components/TodoItem";
import TodoFilter from "../components/TodoFilter";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("https://be-to-do-list.onrender.com/api/todos");
      const data = await res.json();
      setTodos(
        data.map((todo) => ({
          ...todo,
          completed: todo.is_completed === true,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const openEditModal = (todo) => {
    setEditTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.due_date ? todo.due_date.split("T")[0] : "");
    setShowModal(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setEditTodo(null);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAddTodo = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      const res = await fetch("https://be-to-do-list.onrender.com/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          due_date: dueDate || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const newTodo = await res.json();
      setTodos((prev) => [
        {
          ...newTodo,
          completed: newTodo.is_complete === 1,
        },
        ...prev,
      ]);
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Error adding todo");
    }
  };

  const handleEditTodo = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      const res = await fetch(`https://be-to-do-list.onrender.com/api/todos/${editTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          due_date: dueDate || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to update todo");

      const updatedTodo = await res.json();
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === updatedTodo.id
            ? {
                ...updatedTodo,
                completed: updatedTodo.is_completed,
              }
            : todo
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Cập nhật todo thất bại");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://be-to-do-list.onrender.com/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete todo");

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      alert("Xóa todo thất bại");
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      await fetch(`https://be-to-do-list.onrender.com/api/checktodos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Todo List</h1>

      <TodoFilter filter={filter} setFilter={setFilter} />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Thêm Todo
        </button>
      </div>

      <TodoModal
        showModal={showModal}
        onClose={closeModal}
        onSubmit={editTodo ? handleEditTodo : handleAddTodo}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        editTodo={editTodo}
      />

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onToggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}
