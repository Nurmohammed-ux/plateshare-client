🍽️ PlateShare

A community platform for sharing spare food before it goes to waste.
Post it, find it, collect it.



📖 About the Project

PlateShare connects neighbours with spare food to the people nearby who can use it. Anyone can browse available food, request items they need, and — once logged in — post their own surplus food for others to collect. It's built to make sharing food just as easy as throwing it out, so good food finds a good home instead of a bin.




✨ Key Features


* Browse & Search Food — A public homepage highlights the six food listings with the highest quantity available, with a full "Available Foods" page to search and explore everything on offer.

* Firebase Authentication — Secure email/password and social login gate all private actions (adding food, managing listings, viewing food details, and requesting food).

* Add Food with Image Hosting — Logged-in users can post surplus food through a form that uploads photos via imgbb, auto-fills donator info (name, email, photo) from their Firebase account, and defaults new listings to "available".

* Manage My Foods (Update & Delete) — Donators get a private dashboard listing only the food they've posted, with full update (pre-filled edit form) and delete (SweetAlert-confirmed) controls.

* Food Request System — On any food's details page, users can submit a request (location, reason, contact number). Food owners see all incoming requests in a table and can Accept (marks the food as donated) or Reject each one.

* My Food Requests — A private page where users can track every request they've made and see whether it's still pending, accepted, or rejected.

* Responsive, Themed UI — Built with Tailwind CSS and daisyUI for a clean, mobile-friendly interface with consistent branding and toast/SweetAlert feedback across every action.

* Protected Routing — react-router private routes redirect unauthenticated users to the login page before they can reach sensitive pages like Add Food, Manage My Foods, or Food Details.



🛠️ Tech Stack


1. React + React Router
 
2. Tailwind CSS + daisyUI
 
3. Firebase Authentication
 
4. MongoDB (via a separate Express/Node.js server)
 
5. imgbb API for image hosting
 
6. react-hot-toast for toast notifications
 
7. SweetAlert2 for confirmation dialogs
 
8. Axios (secure instance with interceptors) for authenticated API calls




