import React from "react";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="pr-3">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {note.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {note.description}
          </p>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(note._id)}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 hover:bg-red-100 hover:scale-105 transition-all duration-200"
          title="Delete this task"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
