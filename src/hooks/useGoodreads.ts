import { useEffect, useState } from "react";
import type { GoodreadsBook } from "../types/goodreads";

const API = "https://pradyun-sushena.vercel.app/api/goodreads";

export function useGoodreads() {
  const [books, setBooks] = useState<GoodreadsBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  interface GoodreadsResponse {
    updated: string | null;
    count: number;
    books: GoodreadsBook[];
    unavailable?: boolean;
  }

  useEffect(() => {
    async function load() {
      try {
        console.log("Fetching:", API);

        const response = await fetch(API);

        console.log("Status:", response.status);

        const data: GoodreadsResponse = await response.json();

        console.log(data);

        if (data.unavailable || !Array.isArray(data.books)) {
          setError("unavailable");
        } else {
          setBooks(data.books.slice(0, 8));
        }
      } catch (err) {
        console.error("GOODREADS ERROR:", err);
        setError("unavailable");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { books, loading, error };
}
