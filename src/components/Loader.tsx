const Loader: React.FC = () => {
  return (
    <div className="animate-pulse bg-white rounded-md border p-4 shadow-sm">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
    </div>
  );
};

export default Loader;
