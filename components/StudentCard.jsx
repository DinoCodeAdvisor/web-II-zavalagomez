function StudentCard({ student, subject, score }) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
    {/* Button to make it visible */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {isVisible ? "Hide" : "Show"} Student Card
      </button>
    {/* Render the component if visible */}
      {isVisible && (
        <div className="shadow-lg rounded-2xl overflow-hidden w-60 border p-4 text-center">
          <img
            src="https://avatars.githubusercontent.com/u/94272096"
            alt="Student"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold">{ student }</h2>
          <p className="text-gray-500">{ subject }</p>
          <p className="text-gray-700">{ score }</p>
        </div>
      )}
    </div>
  );
}

