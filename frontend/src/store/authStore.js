import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      isAuthenticated: false,

      checkAuth: async () => {
        set({ loading: true });

        try {
          const response = await axiosInstance.get("/auth/me");

          set({
            user: response.data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to authenticate user",
            {
              position: "bottom-right",
            },
          );

          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      login: async (data) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post("/auth/login", data);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
          toast.success(response?.data?.message, {
            position: "bottom-right",
          });
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
              "Login failed. Please check your credentials.",
            {
              position: "bottom-right",
            },
          );

          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      registration: async (data) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post("/auth/register", data);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
          toast.success(response?.data?.message, {
            position: "bottom-right",
          });
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
              "Registration failed. Please check your credentials.",
            {
              position: "bottom-right",
            },
          );

          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
