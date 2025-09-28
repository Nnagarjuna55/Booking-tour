import { useState, useEffect } from "react";

export const useFetch = <T>(fetchFn: () => Promise<T>, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFn()
      .then((res) => {
        if (mounted) {
          setData(res);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Error fetching data");
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error };
};
