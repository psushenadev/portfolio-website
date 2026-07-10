import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useGoodreads } from "../../hooks/useGoodreads";
import "./goodreads.css";

export default function GoodreadsWidget() {
  const { books, loading, error } = useGoodreads();

  if (loading) {
    return <div className="gr-loading">Syncing with Goodreads...</div>;
  }

  if (error) {
    return <div className="gr-error">Unable to load bookshelf.</div>;
  }

  return (
    <div className="gr-widget">
      {books.map((book) => (
        <motion.a
          key={book.id}
          href={book.link}
          target="_blank"
          rel="noreferrer"
          className="gr-book"
          whileHover={{
            x: 6,
            scale: 1.02,
          }}
        >
          <img
            src={book.cover}
            alt={book.title}
            onError={(e) => {
              console.log("Image failed:", book.cover);
              e.currentTarget.src =
                "https://placehold.co/60x90/111827/FFFFFF?text=📚";
            }}
          />

          <div className="gr-info">
            <h4>{book.title}</h4>

            <p>{book.author}</p>
          </div>

          <ExternalLink size={16} className="opacity-40" />
        </motion.a>
      ))}
    </div>
  );
}
