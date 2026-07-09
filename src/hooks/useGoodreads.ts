import { useEffect, useState } from "react";
import type { GoodreadsBook } from "../types/goodreads";

const API = "https://pradyun-sushena.vercel.app/api/goodreads";

export function useGoodreads() {
  const [books, setBooks] = useState<GoodreadsBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  interface GoodreadsResponse {
    updated: string;
    count: number;
    books: GoodreadsBook[];
  }

  useEffect(() => {
    async function load() {
      try {
        console.log("Fetching:", API);

        const response = await fetch(API);

        console.log("Status:", response.status);

        const data: GoodreadsResponse = await response.json();

        console.log(data);

        setBooks(data.books);
      } catch (err) {
        console.error("GOODREADS ERROR:", err);
        setError("Couldn't load books.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  books: books.slice(0, 8);
  return { books, loading, error };
}
