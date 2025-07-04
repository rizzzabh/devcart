export default function ToolCard({ tool }) {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      {tool.image && (
        <img
          src={tool.image}
          alt={tool.title}
          className="w-full h-40 object-cover mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{tool.title}</h3>
      <p className="text-sm text-gray-600 mb-1">By: {tool.creator?.name}</p>
      <p className="text-sm mb-2">{tool.description}</p>
      <span className="font-bold text-blue-600">${tool.price}</span>
    </div>
  );
}
