document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  const searchBookForm = document.getElementById("searchBook");
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  const STORAGE_KEY = "BOOKSHELF_APP";
  let editBookId = null;

  function generateId() {
    return +new Date();
  }

  function generateBookObject(id, title, author, year, isComplete) {
    return {
      id,
      title,
      author,
      year,
      isComplete,
    };
  }

  function findBook(bookId) {
    const books = getBooks();
    return books.find((book) => book.id === bookId);
  }

  function findBookIndex(bookId) {
    const books = getBooks();
    return books.findIndex((book) => book.id === bookId);
  }

  function getBooks() {
    if (typeof Storage !== "undefined") {
      const books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return books !== null ? books : [];
    }
    return [];
  }

  function saveBooks(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }

  function renderBooks(books) {
    incompleteBookList.innerHTML = "";
    completeBookList.innerHTML = "";

    books.forEach((book) => {
      const bookElement = makeBookElement(book);
      if (book.isComplete) {
        completeBookList.append(bookElement);
      } else {
        incompleteBookList.append(bookElement);
      }
    });
  }

  function makeBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    const bookTitle = document.createElement("h3");
    bookTitle.setAttribute("data-testid", "bookItemTitle");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("data-testid", "bookItemAuthor");
    bookAuthor.innerText = `Penulis: ${book.author}`;

    const bookYear = document.createElement("p");
    bookYear.setAttribute("data-testid", "bookItemYear");
    bookYear.innerText = `Tahun: ${book.year}`;

    const buttonContainer = document.createElement("div");

    const isCompleteButton = document.createElement("button");
    isCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    isCompleteButton.innerText = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    isCompleteButton.addEventListener("click", function () {
      toggleBookCompleteStatus(book.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.addEventListener("click", function () {
      removeBook(book.id);
    });

    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.innerText = "Edit Buku";
    editButton.addEventListener("click", function () {
      editBook(book.id);
    });

    buttonContainer.append(isCompleteButton, deleteButton, editButton);
    bookElement.append(bookTitle, bookAuthor, bookYear, buttonContainer);

    return bookElement;
  }

  function toggleBookCompleteStatus(bookId) {
    const books = getBooks();
    const bookIndex = findBookIndex(bookId);
    if (bookIndex !== -1) {
      books[bookIndex].isComplete = !books[bookIndex].isComplete;
      saveBooks(books);
      renderBooks(books);

      const message = books[bookIndex].isComplete
        ? "Buku selesai dibaca!"
        : "Buku belum selesai dibaca!";
      showNotification(message);
    }
  }

  function removeBook(bookId) {
    const books = getBooks();
    const bookIndex = findBookIndex(bookId);
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      saveBooks(books);
      renderBooks(books);

      showNotification("Buku berhasil dihapus!");
    }
  }

  function editBook(bookId) {
    const book = findBook(bookId);
    if (book) {
      editBookId = bookId;
      document.getElementById("bookFormTitle").value = book.title;
      document.getElementById("bookFormAuthor").value = book.author;
      document.getElementById("bookFormYear").value = book.year;
      document.getElementById("bookFormIsComplete").checked = book.isComplete;

      document.getElementById("bookFormSubmit").onclick = function (event) {
        event.preventDefault();
        updateBook();
      };
    }
  }

  function updateBook() {
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;
    const isComplete = document.getElementById("bookFormIsComplete").checked;

    const books = getBooks();
    const bookIndex = findBookIndex(editBookId);
    if (bookIndex !== -1) {
      books[bookIndex] = generateBookObject(
        editBookId,
        title,
        author,
        year,
        isComplete
      );
      saveBooks(books);
      renderBooks(books);

      showNotification("Buku berhasil diedit!");

      editBookId = null;
      bookForm.reset();
      document.getElementById("bookFormSubmit").onclick = addNewBook;
    }
  }

  function addNewBook(event) {
    event.preventDefault();
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = parseInt(document.getElementById("bookFormYear").value);
    const isComplete = document.getElementById("bookFormIsComplete").checked;
    const id = generateId();
    const book = generateBookObject(id, title, author, year, isComplete);
    const books = getBooks();
    books.push(book);
    saveBooks(books);
    renderBooks(books);

    showNotification("Buku berhasil ditambahkan ke rak!");
    bookForm.reset();
  }

  bookForm.addEventListener("submit", addNewBook);

  searchBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTitle = document.getElementById("searchBookTitle").value;
    const books = getBooks();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    renderBooks(filteredBooks);
  });

  renderBooks(getBooks());

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
});
