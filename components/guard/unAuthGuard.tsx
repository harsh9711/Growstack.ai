"use client";
import { useLayoutEffect } from "react";
import Spinner2 from "../Spinner2/Spinner2";
import { useSelector } from "react-redux";
import { persistor, RootState } from "@/lib/store";
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import instance from "@/config/axios.config";
import {
  login,
  logout,
  setInitialized,
  setUserLoading,
} from "@/lib/features/auth/auth.slice";

const withUnAuthGuard = (WrappedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const dispatch = useDispatch();

    const { initialized } = useSelector(
      (rootState: RootState) => rootState.auth
    );

    const init = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          dispatch(setUserLoading(true));
          const response = await instance.get(`/users/api/v1`);
          const userData = response.data.data;
          dispatch(login(userData));
        } catch (error: any) {
          dispatch(logout());
          persistor.purge();
        } finally {
          dispatch(setUserLoading(false));
        }
      } else {
        dispatch(logout());
        persistor.purge();
      }
      dispatch(setInitialized(true));
    };

    useLayoutEffect(() => {
      init();
    }, []);

    if (!initialized) {
      return <Spinner2 />;
    }

    // Render the wrapped component once initialized
    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withUnAuthGuard;
