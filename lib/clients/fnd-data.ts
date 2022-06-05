interface FndDataClientArgs {
  url: string;
  options?: RequestInit;
}

export const fndDataClient = ({ url, options }: FndDataClientArgs) => {
  const { NEXT_PUBLIC_FND_DATA_URL } = process.env;
  const fndDataUrl = new URL(url, NEXT_PUBLIC_FND_DATA_URL);
  return fetch(fndDataUrl.href, { ...options });
};
