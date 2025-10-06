# Email Tracker

Email Tracker is a simple tool to check if an email has been opened.  
The idea is straightforward: every time you create a *tracker*, a unique tracking pixel is generated that you can embed in your email.  
When the recipient opens the email, that pixel is loaded from the server and the event gets recorded.

👉 [Try the live app](https://email-tracker.catalin-trandafir.com/)

---

## What’s it for?

With this project you can:

- Generate individual trackers for your emails.
- Know whether an email has been opened or not.
- See how many times it was opened and when.
- Manage and delete trackers when you no longer need them.

---

## How it works (in a nutshell)

1. Create a tracker from the web interface.  
2. Copy the generated pixel and embed it in the email you want to track.  
3. When the recipient opens the email, the server logs the open event.  
4. In the dashboard you can see stats like creation date, expiration, number of opens, first and last open, etc.  

---

## Project structure

- **`email-tracker/`** → Main backend code (Node.js with Express).  
- **`redis/`** → Database setup for storing tracker data.  
- **`docker-compose.yml`** → Spins up the app and Redis with Docker.  
- **`build.sh`** → Script to build the project.
- Repository config files like `.gitignore` and `.gitattributes`.  

---
