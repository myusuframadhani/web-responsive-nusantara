import apiConnection from "@/apiConnection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Book() {
  const [book, setBook] = useState({});
  const [error, setError] = useState("");
  const router = useRouter();
  const { book_id } = router.query;

  useEffect(() => {
    if (router.asPath !== router.route) {
    }
    getBook();
  }, [router]);

  const token = getCookie("token");

  const getBook = async () => {
    try {
      await apiConnection
        .get(`/api/books/${book_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const books = response.data;
          setBook(books);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await apiConnection
        .delete(`/api/books/${book_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const books = response.data;
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-4/5 w-4/5">
        <div className="flex-col">
          <p className="text-lg">Judul : {book.title}</p>
          <p className="text-md py-1">Subjudul : {book.subtitle}</p>
          <p className="text-md py-1">Penulis : {book.author}</p>
          <p className="text-md py-1">Tahun Terbit : {book.published}</p>
          <p className="text-md py-1">Penerbit : {book.publisher}</p>
          <p className="text-md py-1">ISBN : {book.isbn}</p>
          <p className="text-md py-1">Website : {book.website}</p>
          <p className="text-md py-1">Deskripsi : {book.description}</p>
        </div>
        <div className="p-3">
          <a
            href={`/books/${book_id}/edit`}
            className="bg-green text-white px-2 py-2"
          >
            Edit
          </a>
          <button
            type="button"
            className="bg-red text-white px-2 py-1"
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
