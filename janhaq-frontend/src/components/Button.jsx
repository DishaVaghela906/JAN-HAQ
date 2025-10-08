export default function Button({ label, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
    >
      {label}
    </button>
  );
}
