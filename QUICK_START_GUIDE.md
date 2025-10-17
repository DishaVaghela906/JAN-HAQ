# 🚀 Quick Start Guide - Saved Items Feature

## ⚠️ IMPORTANT: Fix MongoDB Connection First

Your backend is running but **MongoDB is not connected**. You need to update your `.env` file in the `backend` folder.

### Fix MongoDB Connection

1. Open `backend/.env` file
2. Replace the placeholders in `MONGO_URI`:

**Current (NOT WORKING):**
```env
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.mongodb.net/complaintsDB?retryWrites=true&w=majority
```

**Fix to (replace with your actual credentials):**
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/complaintsDB?retryWrites=true&w=majority
```

3. Save the file
4. Restart the backend server

---

## 🎯 Quick Test Steps

Once MongoDB is connected:

### 1. Register/Login
- Go to http://localhost:3001/register
- Create an account or login at http://localhost:3001/login

### 2. Test Saving from Laws Page
- Go to http://localhost:3001/laws
- Click the bookmark icon (top-right) on any law card
- Icon should fill with purple color

### 3. Test Saving from Schemes Page
- Go to http://localhost:3001/schemes
- Click the bookmark icon on any scheme card
- Icon should fill with purple color

### 4. Test Saving from Problem Solver
- Go to http://localhost:3001/problem-solver
- Search for "housing rights" or any query
- Click bookmark icon on search results

### 5. View Saved Items
- Go to http://localhost:3001/dashboard
- Click the "Saved Items" card
- OR go directly to http://localhost:3001/saved-laws
- You should see all your saved items!

### 6. Test Filtering
- On the saved items page, click:
  - **"All"** - Shows everything
  - **"Laws"** - Shows only laws
  - **"Schemes"** - Shows only schemes

### 7. Test Removing Items
- Click the red trash icon on any saved item
- Confirm the dialog
- Item should disappear from the list

### 8. Test Guest User Flow
- Logout (if logged in)
- Go to any page with save buttons
- Click a bookmark icon
- Should see a beautiful login prompt modal

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Make sure MongoDB URI is correct in `.env`
- Run: `cd backend && npm install`

### Frontend won't start
- Check if port 3001 is available (or whatever port React uses)
- Run: `cd janhaq-frontend && npm install`

### "Item already saved" error
- This means the item is already in your library
- Try saving a different item

### Save button not working
- Check browser console for errors (F12)
- Make sure you're logged in
- Check backend terminal for API errors

### Bookmark icon not changing
- Refresh the page
- Check network tab in browser devtools
- Verify MongoDB is connected

---

## 📱 Features to Test

- ✅ Save laws from /laws page
- ✅ Save schemes from /schemes page
- ✅ Save search results from /problem-solver
- ✅ View all saved items
- ✅ Filter by type (All/Laws/Schemes)
- ✅ Remove saved items
- ✅ Guest user login prompt
- ✅ Dark mode compatibility
- ✅ Responsive design (try on mobile)

---

## 🎨 Visual Guide

### Bookmark States
- **Not Saved**: Gray outlined bookmark icon
- **Saved**: Purple filled bookmark icon
- **Saving**: Spinning circle animation

### Colors Used
- **Laws**: Blue badges and accents
- **Schemes**: Green badges and accents
- **Saved Items**: Purple theme throughout

---

## 📊 MongoDB Check

After fixing `.env`, restart backend and you should see:
```
✅ Connected to MongoDB Atlas
✅ JanHaq Server running at http://localhost:3000
```

If you still see disconnected, your credentials are wrong.

---

## 🎉 Success Indicators

When everything works:
1. Bookmark icons change color when clicked
2. Saved items page shows your items
3. Stats bar shows correct counts
4. Filters work properly
5. Remove button deletes items
6. Guest users see login prompt

---

**Need help? Check the console logs in both browser and backend terminal!**
