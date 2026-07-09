import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useGoodreads } from "../hooks/useGoodreads";
import "../../src/widgets/goodreads.css";

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
            src={book.image}
            alt={book.title}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/58x88/111827/E5E7EB?text=Book";
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
