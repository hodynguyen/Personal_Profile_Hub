import {
  createContext,
  useContext,
  ReactNode,
  createElement,
} from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  username: string;
  createdAt: string | null;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  loginMutation: UseMutationResult<User, Error, LoginInput>;
  registerMutation: UseMutationResult<User, Error, LoginInput>;
  logoutMutation: UseMutationResult<void, Error, void>;
};

type LoginInput = {
  username: string;
  password: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ["/api/auth/session"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutation<User, Error, LoginInput>({
    mutationFn: async (credentials) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/auth/session"], data);
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation<User, Error, LoginInput>({
    mutationFn: async (credentials) => {
      const res = await apiRequest("POST", "/api/auth/register", credentials);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/auth/session"], data);
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/session"], null);
    },
    onError: (error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user: user ?? null,
        isLoading,
        loginMutation,
        registerMutation,
        logoutMutation,
      },
    },
    children,
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
