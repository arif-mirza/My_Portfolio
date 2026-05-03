import { useState, useEffect, useCallback } from "react";
import {
  getMessages,
  markMessageAsRead as apiMarkRead,
  deleteMessage as apiDelete,
} from "../services/api/messages.api";

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMessages();
      setMessages(data.messages);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markRead = async (id) => {
    const updated = await apiMarkRead(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  const remove = async (id) => {
    await apiDelete(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return { messages, unreadCount, loading, error, refetch: fetchMessages, markRead, remove };
}
