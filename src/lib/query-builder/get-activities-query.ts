import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getJson } from "../api";
import { Activity } from "../types";

interface ActivitiesParams {
  before?: number;
  after?: number;
  perPage?: number;
  page?: number;
  accessToken: string;
}

type ActivitiesResponse = Activity[];

const getParams = (params: Omit<ActivitiesParams, "accessToken">) =>
  new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value?.toString()])
    )
  );

const endpoint = process.env.NEXT_PUBLIC_STRAVA_API_URL!;
export const ActivitiesQuery = {
  key: ["activities"],
  getKey: (params: ActivitiesParams) => [...ActivitiesQuery.key, params],
  queryFn: async ({ accessToken, ...params }: ActivitiesParams) =>
    fetch(`${endpoint}/athlete/activities?${getParams(params)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<ActivitiesResponse>),
};

export const useActivitiesQuery = (
  params: ActivitiesParams,
  options: UseQueryOptions<ActivitiesResponse> = {}
) => {
  return useQuery({
    queryKey: ActivitiesQuery.getKey(params),
    queryFn: () => ActivitiesQuery.queryFn(params),
    ...options,
  });
};
