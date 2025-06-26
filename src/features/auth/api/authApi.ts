import {BaseResponse} from "@/common/types";
import type {loginInputs} from "@/features/auth/lib/schemas";
import {baseApi} from "@/app/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, loginInputs>({
      query: (body) => ({method: 'post', url: 'auth/login', body})
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({method: 'delete', url: 'auth/login'})
    }),
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => 'auth/me'
    })

  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi