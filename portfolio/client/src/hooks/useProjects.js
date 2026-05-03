import { useState, useEffect, useCallback } from "react";
import { getProjects, deleteProject as apiDelete } from "../services/api/projects.api";

export function useProjects(params = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects(params);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Added artificial delay to show loader animation
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const remove = async (id) => {
    await apiDelete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return { projects, loading, error, refetch: fetchProjects, remove };
}
