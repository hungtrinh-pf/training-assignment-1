export const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const fetchJson = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  const responseObj = await response.json();
  return responseObj.data;
};

export const fetchNoData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorObject = await response.json();
    return errorObject.message;
  }
};