import { useState, useEffect, useCallback } from "react";
import { getExperiences } from "../services/api/experience.api";

export const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExperiences();
      await new Promise(resolve => setTimeout(resolve, 1500)); // Added artificial delay to show loader animation
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch experiences");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return { experiences, loading, error, refetch: fetchExperiences };
};
