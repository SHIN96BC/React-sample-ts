import { QueryClient } from "@tanstack/react-query";
import useAppDispatch from "../hooks/useAppDispatch";
import { logout } from "../store/slices/authSlice";

const onQueryError = (error: any) => {

};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // onError: onQueryError,
      retry: 0,
      // suspense: true,
    }
  }
});

export default queryClient;
