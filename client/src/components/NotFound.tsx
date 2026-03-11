import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d0a6b] via-[#5b247a] to-[#e94e77] flex items-center justify-center text-white font-sans">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-200 mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-lg font-semibold transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;
