export const postJson = async <Response, Body = Record<string, unknown>>(
  url: string,
  body?: Body
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ?? {}),
  });
  return response.json() as Promise<Response>;
};

export const getJson = async <T>(url: string) => {
  const response = await fetch(url);
  return response.json() as Promise<T>;
};
