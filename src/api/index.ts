import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import useAppSelector from "../hooks/useAppSelector";

const host: string = 'http://127.0.0.1';
// const host: string = 'http://192.168.100.17:8080';

type QueryType = {
    key: string[],
    url: string,
    params: any,
    useError: boolean,
    enabled?: boolean,
};

type MutationType = {
    url: string,
    method?: 'POST'|'PATCH'|'DELETE',
    useError: boolean,
};

const useCustomQuery = ({key, url, params, useError, enabled}: QueryType): UseQueryResult => {
    const {token} = useAppSelector(state => state.auth);
    const headers = token ? {Authorization: token} : {};

    return useQuery(key, () => {
        return new Promise(async (resolve, reject) => {
            try {
                // GET
                const response: AxiosResponse = await axios.get(host + url, {params, headers});

                if (response.data.result === 200) resolve(response.data);
                else reject(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }, {
        cacheTime: 0,
        enabled: !!enabled,
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // onError: (error: any) => useHandleError(error, useErrorHandler)
    });
};

const useCustomMutation = ({url, method, useError}: MutationType): UseMutationResult => {
    const {token} = useAppSelector(state => state.auth);
    const headers = token ? {Authorization: token} : {};

    return useMutation((data: any = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let response: AxiosResponse|null = null;

                // POST
                if (method === 'POST') {
                    // response = await axios.post(host + url, data.data, {headers, params: data.params});
                    response = await axios.post(host + url, data, {headers});
                }
                // PATCH
                else if (method === 'PATCH') {
                    response = await axios.patch(host + url, data, {headers});
                }
                // DELETE
                else if (method === 'DELETE') {
                    response = await axios.delete(host + url, {data, headers});
                }

                if (response?.data.result === 200) resolve(response?.data);
                else reject(response?.data);
            } catch (e: any) {
                console.log(e.message);
                reject(e);
            }
        });
    }, {
        // onError: (error: any) => useHandleError(error, useErrorHandler)
    });
};

// const useHandleError = (error: any, useErrorHandler?: boolean) => {
//
//   if (useErrorHandler) {
//     if (error.result === 300 || error.result === 301 || error.result === 401) {
//       const dispatch = useAppDispatch();
//       console.log('hangel error');
//       dispatch(logout());
//     }
//   }
// };

export const useGet = ({key, url, params, useError = true, enabled = true}: QueryType) => {
    return useCustomQuery({key, url, params, useError, enabled});
};

export const usePost = ({url, useError = true,}: MutationType) => {
    return useCustomMutation({url, method: 'POST', useError});
};

export const usePatch = ({url, useError = true}: MutationType) => {
    return useCustomMutation({url, method: 'PATCH', useError});
};

export const useDelete = ({url, useError = true}: MutationType) => {
    return useCustomMutation({url, method: 'DELETE', useError});
};
