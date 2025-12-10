import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
    return signOut(auth);
  };

  const refreshRole = useCallback(
    async (email) => {
      try {
        const res = await axios.get(`${BASE_URL}/users/role/${email}`);
        setRole(res.data.role || "");
        localStorage.setItem("role", res.data.role || "");
      } catch (err) {
        console.log(err);
      }
    },
    [BASE_URL]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (current) => {
      setUser(current);
      setLoading(false);
      if (current?.email) await refreshRole(current.email);
    });

    return () => unsubscribe();
  }, [refreshRole]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        refreshRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
