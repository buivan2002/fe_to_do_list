// components/TodoModal.jsx
import React from "react";

export default function TodoModal({
  showModal,
  onClose,
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  editTodo,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">
          {editTodo ? "Chỉnh sửa Todo" : "Thêm Todo Mới"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-3">
            <label className="block font-medium mb-1">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Hạn chót</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                editTodo ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {editTodo ? "Cập nhật" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
