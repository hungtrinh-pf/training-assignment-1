export const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const attachAuth = (options?: RequestInit) => {
  const token = localStorage.getItem("access_token");
  const headers = new Headers(options?.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return { ...options, headers };
}

export const fetchJson = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, attachAuth(options));
    if (response.ok) {
      const responseObj = await response.json();
      return responseObj.data;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchNoData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, attachAuth(options));
  
  if (!response.ok) {
    const errorObject = await response.json();
    throw new Error(errorObject.message);
  }
};