import CryptoJS from "crypto-js";

// Encryption key
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string;

// Encrypt data before storing it
export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Decrypt data when retrieving it
export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Custom storage to encrypt/decrypt data
export const createEncryptedStorage = () => {
  return {
    getItem: (name: string) => {
      const encryptedItem = localStorage.getItem(name);
      if (!encryptedItem) return null;
      return decrypt(encryptedItem);
    },
    setItem: (name: string, value: string) => {
      const encryptedValue = encrypt(value);
      localStorage.setItem(name, encryptedValue);
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };
};
