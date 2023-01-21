import apiConnection from "@/apiConnection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

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

export default function Index() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const token = getCookie("token");

  const getBooks = async () => {
    try {
      await apiConnection
        .get("/api/books", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          const books = response.data;
          setBooks(books.data);
          console.log(books);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-start items-center">
        <div className="flex flex-row-reverse w-full">
          <a
            href="/books/tambahBuku"
            className="bg-blue-500 rounded-lg px-4 py-2 mr-10 mt-5 text-white"
          >
            Tambah Buku
          </a>
        </div>
        <div>
          {books.map((book) => (
            <div className="max-w-sm w-56 h-full mx-2 my-2 shadow-xl">
              <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  {book.title.length > 16
                    ? `${d.title.substring(0, 16)}...`
                    : book.title}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <a
                  href={`/medicine/${book.id}`}
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Detail
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
