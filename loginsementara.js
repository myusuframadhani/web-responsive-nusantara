<div className="h-screen w-screen flex justify-center items-center">
  <div className="flex flex-row-reverse">
    <a href="/books/add" className="bg-blue-500 rounded-lg px-4 py-2">Tambah Buku</a>
  </div>
  <div>
    {books.map((book) => (
      <div className="max-w-sm w-56 h-full mx-2 my-2 shadow-xl">
        <Card>
            <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {book.title.length > 16 ?
                    `${d.title.substring(0, 16)}...` : book.title
                }
                </h5>
            </a>
            <div className="flex items-center justify-between">
                <a
                  href={`/medicine/${book.id}`}
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Details
                </a>
            </div>
        </Card>
      </div>
    ))}
  </div>
</div>