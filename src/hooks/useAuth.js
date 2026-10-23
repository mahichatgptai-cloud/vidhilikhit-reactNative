/**
 * Custom hook for authentication state and operations
 */

import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearError = useAuthStore((state) => state.clearError);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    restoreSession,
  };
};

export default useAuth;
