# distributed-queue-system

Group 2's "Software Engineering Project" project -- in collaboration with Microsoft!

## Information

This project requires us to create a distributed queue API and a web app to interface it with.

We are using React.js for the frontend and Express.js for the backend.

## Startup instructions

At the moment starting this is a bit complicated. But worry not! Here's a walkthrough of the steps needed:

### I. Launching Azure

This whole project uses Azure, which can be a bit of a pain in the neck to use. In order for this project to run, you need to:

**1. Open Azure at https://portal.azure.com/.**
**2. Under Resources, open sweng-group-2-database, then open Query Editor.**
**3. Enter username `sweng2` and password `//sweng1234` and try to log in. It will display an error message. To get past it click the link that says "Allowlist IP...", then click log in again. If that doesn't work too, reload and log in again.**

Now we can move on to launching the backend

### II. Launching Backend

This project actually runs on four servers. So, you are going to need, first and fourmost, to **open four new Terminal windows**.

First off, we should do the following:

**1. Open one of those windows.**
**2. Navigate to the directory where you have this repository cloned.**
**3. Run `npm install`.**
**4. Then, navigate to the `backend` directory.**
**5. Run `npm install` again, there.**

Then, let us launch index.js, the server that operates most of the backend. To do that:

**1. Stay in the window from last time.**
**2. Type in `node index.js`**

After that, we can do server.js, which runs the signup system. For that:
**1. Open an empty window.**
**2. Navigate to the directory where you have this repository cloned.**
**3. Then, navigate to the `backend` directory.**
**4. Type in `node server.js`.**
**4. Should there be any issues running this, try:**
npm uninstall bcrypt
npm install bcryptjs
npm install bcrypt

Then we can do serverlog.js, which operates the login system. For that:
**1. Repeat steps 1-3 from last time.**
**2. Type in `node serverlog.js`.**

Finally we can run the server that runs the broker:
**1. Open an empty window.**
**2. Navigate to the directory where you have this repository cloned.**
**3. Then, navigate to the `tempb` directory.**
**4. Type in `node server.js`.**
**5. If you experience any issues, try navigating back to the main directory and then returning to the `tempb` directory.**

After that there's just one more step left:
Get the browser extension **Moesif Origin and CORS Changer**.

Backend is ready! Now launch frontend.

### III. Launching Frontend

The steps here are much simpler.

**1. Open an empty window.**
**2. Navigate to the directory where you have this repository cloned.**
**3. Import the modules needed to run this program: `npm install react-icons`, `npm install react-router-dom` and `npm install styled-components`.**
**4. Run the application itself: `npm start`. It will automatically open the site at [http://localhost:3000](http://localhost:3000).**

Now it works! If it does not, contact someone from the team.
