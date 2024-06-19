import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BorrowBookForm from "./BorrowBookForm";
import { v4 as uuidv4 } from "uuid";

interface LibraryBook {
  id: string;
  bookName: string;
  studentName: string;
  loan_date: string;
  res_date: string;
  status: boolean;
}

const ManagerLibrary: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<LibraryBook | null>(null);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState<string>("1");
  const localStorageData = localStorage.getItem("libraryBooks");
  const parsedLocalStorageData: LibraryBook[] = localStorageData
    ? JSON.parse(localStorageData)
    : [];
  console.log(parsedLocalStorageData);

  const library = useSelector((state: any) => state.libraryReducer.books);
  console.log(library);

  const addBook = (book: LibraryBook) => ({
    type: "ADD_BOOK",
    payload: book,
  });

  const updateBook = (book: LibraryBook) => ({
    type: "UPDATE_BOOK",
    payload: book,
  });

  const deleteBook = (id: string) => ({
    type: "DELETE_BOOK",
    payload: id,
  });

  const setBooks = (books: LibraryBook[]) => ({
    type: "SET_BOOKS",
    payload: books,
  });

  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(library));
  }, [library]);

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
    localStorage.setItem("libraryBooks", JSON.stringify(library));
  };

  const handleEdit = (book: LibraryBook) => {
    setEditBook(book);
    setIsFormOpen(true);
    localStorage.setItem("libraryBooks", JSON.stringify(library));
  };

  const handleSave = (book: LibraryBook) => {
    if (editBook) {
      dispatch(updateBook(book));
      localStorage.setItem("libraryBooks", JSON.stringify(library));
    } else {
      const newBook = { ...book, id: uuidv4() };
      dispatch(addBook(newBook));
      localStorage.setItem("libraryBooks", JSON.stringify(library));
    }
    setEditBook(null);
    setIsFormOpen(false);
  };
  const handleStatusChange = (id: string, status: boolean) => {
    const updatedBook = library.find((book: LibraryBook) => book.id === id);
    if (updatedBook) {
      dispatch(updateBook({ ...updatedBook, status }));
    }
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filteredLibrary = library.filter((book:LibraryBook) => {
    if (filterStatus === "1") return true;
    if (filterStatus === "2") return book.status === true;
    if (filterStatus === "3") return book.status === false;
    return true;
  });

  return (
    <div>
      <nav className="flex justify-between">
        <h1 className="font-bold text-3xl">Quản lý mượn trả sách</h1>
        <div className="flex gap-8">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="no-arrow bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="1">Tất cả</option>
            <option value="2">Đã trả</option>
            <option value="3">Chưa trả</option>
          </select>
          <button
            onClick={() => {
              setEditBook(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
          >
            Thêm thông tin
          </button>
        </div>
      </nav>
      <table className="w-5/6 ml-32 border-2 border-spacing-0">
        <thead>
          <tr className="text-2xl text-left border-2">
            <th>STT</th>
            <th className="w-1/5">Tên Sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredLibrary.map((element: LibraryBook, index: number) => (
            <tr key={element.id} className="text-xl border-2">
              <td>{index + 1}</td>
              <td>{element.bookName}</td>
              <td>{element.studentName}</td>
              <td>{element.loan_date}</td>
              <td>{element.res_date}</td>
              <td>
                <select
                  value={element.status ? "true" : "false"}
                  onChange={(e) =>
                    handleStatusChange(element.id, e.target.value === "true")
                  }
                  className=""
                >
                  <option value="true" className="bg-green-700">
                    Đã trả
                  </option>
                  <option value="false" className="bg-red-700">
                    Chưa trả
                  </option>
                </select>
              </td>
              <td className="flex gap-5">
                <button
                  onClick={() => handleEdit(element)}
                  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(element.id)}
                  className="bg-red-600 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <BorrowBookForm
          book={editBook}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManagerLibrary;
