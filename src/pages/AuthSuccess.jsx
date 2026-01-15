import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthSuccess() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const finishAuth = async () => {
      await checkAuth();
      setTimeout(() => {
        navigate('/my-profile');
      }, 1000);
    };

    finishAuth();
  }, [checkAuth, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
          Authentication <span className="text-emerald-500">Successful</span>
        </h2>
        <p className="text-zinc-500 text-sm">Redirecting to your profile...</p>
      </div>
    </div>
  );
}

export default AuthSuccess;