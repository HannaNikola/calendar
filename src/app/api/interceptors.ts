import { api } from "./api";

type Subscriber = {
  resolve: () => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;

let refreshSubscribers: Subscriber[] = [];

function onRefreshSuccess() {
  refreshSubscribers.forEach(({ resolve }) => resolve());
  refreshSubscribers = [];
}

function onRefreshFailed(error: unknown) {
  refreshSubscribers.forEach(({ reject }) => reject(error));
  refreshSubscribers = [];
}

function addRefreshSubscriber(
  resolve: () => void,
  reject: (error: unknown) => void,
) {
  refreshSubscribers.push({ resolve, reject });
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        addRefreshSubscriber(() => resolve(api(originalRequest)), reject);
      });
    }

    isRefreshing = true;

    try {
      await api.post("/api/users/refresh");

      onRefreshSuccess();

      return api(originalRequest);
    } catch (refreshError) {
      onRefreshFailed(refreshError);

      window.dispatchEvent(new Event("auth:login-required"));

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
