// components/TodoFilter.jsx
export default function TodoFilter({ filter, setFilter }) {
  return (
    <div className="mb-4 flex gap-2 justify-center">
      {["all", "completed", "pending"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded ${
            filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {f === "all"
            ? "Tất cả"
            : f === "completed"
            ? "Đã hoàn thành"
            : "Chưa hoàn thành"}
        </button>
      ))}
    </div>
  );
}
