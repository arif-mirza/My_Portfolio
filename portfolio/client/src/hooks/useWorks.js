import { useState, useEffect, useCallback } from "react";
import { getWorks, deleteWork as apiDelete } from "../services/api/works.api";

export function useWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWorks();
      await new Promise(resolve => setTimeout(resolve, 1500)); // Added artificial delay to show loader animation
      setWorks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load works.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  const remove = async (id) => {
    await apiDelete(id);
    setWorks((prev) => prev.filter((w) => w.id !== id));
  };

  return { works, loading, error, refetch: fetchWorks, remove };
}
