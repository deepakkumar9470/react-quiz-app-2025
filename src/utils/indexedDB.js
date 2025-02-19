const DB_NAME = "quizDB";
const STORE_NAME = "quizHistory";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject("Error opening DB: ", e);
    };
  });
};

const saveAttempt = async (attemptData) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  
  store.add(attemptData);
  
  transaction.oncomplete = () => {
    console.log("Attempt saved to IndexedDB.");
  };

  transaction.onerror = (e) => {
    console.error("Error saving attempt: ", e);
  };
};

const getAllAttempts = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = (e) => {
      reject("Error retrieving attempts: ", e);
    };
  });
};

export { saveAttempt, getAllAttempts };
