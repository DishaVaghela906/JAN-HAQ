// This file simulates a simple user database using localStorage.

const DB_KEY = 'janhaqUserDatabase';

// Function to get all users from the database
const getUsers = () => {
  const db = localStorage.getItem(DB_KEY);
  return db ? JSON.parse(db) : {};
};

// Function to get a single user by their email
export const getUser = (email) => {
  const users = getUsers();
  return users[email] || null;
};

// Function to save a new user or update an existing one
export const saveUser = (userData) => {
  const users = getUsers();
  // We use the email as the unique key for each user
  users[userData.email] = userData;
  localStorage.setItem(DB_KEY, JSON.stringify(users));
};