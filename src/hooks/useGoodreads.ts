import { useEffect, useState } from "react";
import type { GoodreadsBook } from "../types/goodreads";

const API = "https://pradyun-portfolio-api.vercel.app/api/goodreads";

export function useGoodreads() {
  const [books, setBooks] = useState<GoodreadsBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        console.log("Fetching:", API);

        const response = await fetch(API);

        console.log("Status:", response.status);

        const text = await response.text();

        console.log("Raw response:", text);

        const data: GoodreadsBook[] = JSON.parse(text);

        console.log("Parsed:", data);

        setBooks(data);
      } catch (err) {
        console.error("GOODREADS ERROR:", err);
        setError("Couldn't load books.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { books, loading, error };
}
