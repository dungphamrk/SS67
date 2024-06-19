interface LibraryBook {
  id: string;
  bookName: string;
  studentName: string;
  loan_date: string;
  res_date: string;
  status: string;
}
const localStorageData = localStorage.getItem("libraryBooks");
const parsedLocalStorageData: LibraryBook[] = localStorageData
  ? JSON.parse(localStorageData)
  : [];
const initialState = {
  books:
    parsedLocalStorageData.length > 0
      ? parsedLocalStorageData
      : [
          {
            id: "1",
            bookName: "1984",
            studentName: "Nguyễn văn A",
            loan_date: "19/7/2019",
            res_date: "17/2/2020",
            status: true,
          },
          {
            id: "2",
            bookName: "1984",
            studentName: "Nguyễn văn A",
            loan_date: "19/7/2019",
            res_date: "17/2/2020",
            status: true,
          },
          {
            id: "3",
            bookName: "1984",
            studentName: "Nguyễn văn A",
            loan_date: "19/7/2019",
            res_date: "17/2/2020",
            status: true,
          },
        ],
};
export const libraryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case `ADD_BOOK`:
      console.log(state);

      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case `UPDATE_BOOK`:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case `DELETE_BOOK`:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case `SET_BOOKS`:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};
