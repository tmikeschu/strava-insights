import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getJson } from "../api";
import { Activity, DetailedActivity } from "../types";

interface GetActivityParams {
  include_all_efforts?: boolean;
  id: number;
  accessToken: string;
}

type GetActivityResponse = DetailedActivity;

const getParams = (params: Omit<GetActivityParams, "accessToken" | "id">) =>
  new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value?.toString()])
    )
  );

const endpoint = process.env.NEXT_PUBLIC_STRAVA_API_URL!;
export const ActivitiesQuery = {
  key: ["activity"],
  getKey: (params: GetActivityParams) => [...ActivitiesQuery.key, params],
  queryFn: async ({ accessToken, id, ...params }: GetActivityParams) =>
    fetch(`${endpoint}/activities/${id}?${getParams(params)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<GetActivityResponse>),
};

export const useActivityQuery = (
  params: GetActivityParams,
  options: UseQueryOptions<GetActivityResponse> = {}
) => {
  return useQuery({
    queryKey: ActivitiesQuery.getKey(params),
    queryFn: () => ActivitiesQuery.queryFn(params),
    ...options,
  });
};
