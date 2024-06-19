import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface LibraryBook {
  id: string;
  bookName: string;
  studentName: string;
  loan_date: string;
  res_date: string;
  status: boolean;
}

interface BorrowBookFormProps {
  book?: LibraryBook | null;
  onClose: () => void;
  onSave: (book: LibraryBook) => void;
}

const BorrowBookForm: React.FC<BorrowBookFormProps> = ({ book, onClose, onSave }) => {
  const [bookName, setBookName] = useState<string>(book ? book.bookName : '');
  const [studentName, setStudentName] = useState<string>(book ? book.studentName : '');
  const [loanDate, setLoanDate] = useState<string>(book ? book.loan_date : '');
  const [resDate, setResDate] = useState<string>(book ? book.res_date : '');
  const [status, setStatus] = useState<boolean>(book ? book.status : false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: LibraryBook = {
      id: book ? book.id : uuidv4(),
      bookName,
      studentName,
      loan_date: loanDate,
      res_date: resDate,
      status,
    };
    onSave(newBook);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl mb-4">{book ? 'Sửa thông tin sách' : 'Thêm thông tin sách'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tên sách</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tên người mượn</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Ngày mượn</label>
            <input
              type="date"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Ngày trả</label>
            <input
              type="date"
              value={resDate}
              onChange={(e) => setResDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Trạng thái</label>
            <select
              value={status ? 'true' : 'false'}
              onChange={(e) => setStatus(e.target.value === 'true') }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="true" className="bg-green-700">Đã trả</option>
              <option value="false" className="bg-red-700">Chưa trả</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
              Đóng
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
              {book ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookForm;
