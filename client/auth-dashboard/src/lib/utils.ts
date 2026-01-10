import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type { ApiErrorResponse } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
});

// Base query with error interceptor
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  let message = "";

  if (result.error) {
    const { status, data = {} } = result.error;

    if (status === 401) {
      message = "Unauthorized - Please log in again.";
      // You can dispatch logout action here if needed
    }else if (status === 500) {
      message = "Internal Server Error";
    } else if (status === "FETCH_ERROR") {
      message = "Network Error - Cannot reach server";
    } else {
      message = "An unexpected error occurred";
    }

    const errorData = data as ApiErrorResponse || {
      message: message, timestamp: new Date().toISOString(), validationErrors: {}
    };

    // Transform error to a consistent format
  result.error = {
    status: status,
    data: errorData,
  } as FetchBaseQueryError;
  }

  return result;
};