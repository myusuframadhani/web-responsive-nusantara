import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import apiConnection from "@/apiConnection";

export default function editBuku() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [publisher, setPublisher] = useState("");
  const [published, setPublished] = useState("");
  const [website, setWebsite] = useState("");
  const [isbn, setIsbn] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { book_id } = router.query;

  useEffect(() => {
    if (!book_id) {
      return;
    }
    const initBook = async () => {
      const book = await getBook();

      setTitle(book.title);
      setSubtitle(book.subtitle);
      setDescription(book.description);
      setPages(book.pages);
      setPublisher(book.publisher);
      setPublished(book.published);
      setWebsite(book.website);
      setIsbn(book.isbn);
      setAuthor(book.author);
    };

    initBook();
  }, [router]);

  const token = getCookie("token");

  const getBook = async () => {
    try {
      const response = await apiConnection.get(`/api/books/${book_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const books = response.data;
      return books;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiConnection
        .put(
          `/api/books/${book_id}/edit`,
          {
            isbn: isbn,
            title: title,
            subtitle: subtitle,
            author: author,
            published: published,
            publisher: publisher,
            pages: Number(pages),
            description: description,
            website: website,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
        });
      router.push(`/books/${book_id}`);
    } catch (error) {
      if (error.response.status === 401) {
        router.push("/login");

        return;
      }
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          className="w-1/2 h-2/3 bg-blue-200 rounded-md py-4 px-6"
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className="text-lg font-semibold">Edit Buku</p>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formTitle"
              placeholder=" "
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label
              htmlFor="formTitle"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Judul
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formSubTitle"
              placeholder=" "
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
            <label
              htmlFor="formSubTitle"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sub Judul
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formAuthor"
              placeholder=" "
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <label
              htmlFor="formAuthor"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Penulis
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formPublisher"
              placeholder=" "
              onChange={(e) => setPublisher(e.target.value)}
              required
            />
            <label
              htmlFor="formPublisher"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Penerbit
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formPages"
              placeholder=" "
              onChange={(e) => setPages(e.target.value)}
              required
            />
            <label
              htmlFor="formPages"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Jumlah Halaman
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formWebsite"
              placeholder=" "
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
            <label
              htmlFor="formWebsite"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Website
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formYear"
              placeholder=" "
              onChange={(e) => setPublished(e.target.value)}
              required
            />
            <label
              htmlFor="formYear"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tahun Terbit
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formISBN"
              placeholder=" "
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <label
              htmlFor="formISBN"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ISBN
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-800 appearance-none focus:outline-none peer"
              id="formDescription"
              placeholder=" "
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label
              htmlFor="formDescription"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Deskripsi
            </label>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-slate-500 block w-1/2 px-auto rounded-lg px-4 py-2 my-2 text-white font-bold"
            >
              Tambah Buku
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
