import React from 'react';

function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 bg-white border-2 border-indigo-500 rounded-lg text-3xl font-bold text-indigo-600 hover:bg-indigo-100 transition duration-300"
    >
      {value}
    </button>
  );
}

export default Square;
