// ======================================================
// CAMPUSCONNECT
// COLLEGE EVENT MANAGEMENT SYSTEM
// ======================================================


// ======================================================
// SAMPLE EVENTS
// ======================================================

let events = [

    {
        id: 1,
        title: "Tech Innovation Hackathon",
        category: "Technical",
        date: "2026-09-20",
        time: "10:00 AM - 4:00 PM",
        venue: "Innovation Lab",
        description:
            "A coding and innovation competition where students solve real-world problems.",
        seats: 100
    },

    {
        id: 2,
        title: "AI & Machine Learning Workshop",
        category: "Workshop",
        date: "2026-09-24",
        time: "10:00 AM - 1:00 PM",
        venue: "Seminar Hall",
        description:
            "Learn the basics of Artificial Intelligence and Machine Learning.",
        seats: 60
    },

    {
        id: 3,
        title: "Annual Cultural Fest",
        category: "Cultural",
        date: "2026-09-28",
        time: "9:00 AM - 6:00 PM",
        venue: "College Auditorium",
        description:
            "Celebrate talent, music, dance and creativity at the annual cultural festival.",
        seats: 500
    },

    {
        id: 4,
        title: "Inter College Cricket Tournament",
        category: "Sports",
        date: "2026-10-03",
        time: "9:00 AM - 5:00 PM",
        venue: "College Ground",
        description:
            "An exciting cricket tournament between college teams.",
        seats: 200
    },

    {
        id: 5,
        title: "Career Guidance Seminar",
        category: "Seminar",
        date: "2026-10-08",
        time: "11:00 AM - 1:00 PM",
        venue: "Main Auditorium",
        description:
            "A career guidance session covering internships, jobs and higher education.",
        seats: 150
    }

];


// ======================================================
// LOCAL STORAGE
// ======================================================

let campusUsers =
    JSON.parse(localStorage.getItem("campusUsers")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("campusCurrentUser")) || null;

let registeredEvents =
    JSON.parse(localStorage.getItem("campusRegisteredEvents")) || {};

let notifications =
    JSON.parse(localStorage.getItem("campusNotifications")) || {};

let attendance =
    JSON.parse(localStorage.getItem("campusAttendance")) || {};

let certificates =
    JSON.parse(localStorage.getItem("campusCertificates")) || {};


// ======================================================
// SAVE DATA
// ======================================================

function saveData() {

    localStorage.setItem(
        "campusUsers",
        JSON.stringify(campusUsers)
    );

    localStorage.setItem(
        "campusRegisteredEvents",
        JSON.stringify(registeredEvents)
    );

    localStorage.setItem(
        "campusNotifications",
        JSON.stringify(notifications)
    );

    localStorage.setItem(
        "campusAttendance",
        JSON.stringify(attendance)
    );

    localStorage.setItem(
        "campusCertificates",
        JSON.stringify(certificates)
    );
}


// ======================================================
// SHOW PAGE
// ======================================================

function showPage(pageId) {

    if (!currentUser &&
        pageId !== "loginPage" &&
        pageId !== "createAccountPage") {

        showLogin();
        return;
    }


    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {
        page.style.display = "none";
    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.style.display = "block";
    }


    if (pageId === "dashboardPage") {

        updateDashboard();

    }

    if (pageId === "eventsPage") {

        displayEvents(events);

    }

    if (pageId === "registeredPage") {

        displayRegisteredEvents();

    }

    if (pageId === "notificationsPage") {

        displayNotifications();

    }

    if (pageId === "profilePage") {

        displayProfile();

    }

}


// ======================================================
// LOGIN PAGE
// ======================================================

function showLogin() {

    currentUser = null;

    document.getElementById("loginPage").style.display =
        "flex";

    document.getElementById("createAccountPage").style.display =
        "none";

    document.getElementById("dashboardPage").style.display =
        "none";

    document.getElementById("eventsPage").style.display =
        "none";

    document.getElementById("registeredPage").style.display =
        "none";

    document.getElementById("notificationsPage").style.display =
        "none";

    document.getElementById("profilePage").style.display =
        "none";

    document.getElementById("navbar").style.display =
        "none";
}


// ======================================================
// CREATE ACCOUNT PAGE
// ======================================================

function showCreateAccount() {

    document.getElementById("loginPage").style.display =
        "none";

    document.getElementById("createAccountPage").style.display =
        "flex";

    document.getElementById("navbar").style.display =
        "none";

    document.getElementById("registerMessage").textContent =
        "";
}


// ======================================================
// CREATE ACCOUNT
// ======================================================

function createAccount(event) {

    event.preventDefault();


    const name =
        document.getElementById("registerName")
        .value
        .trim();

    const usn =
        document.getElementById("registerUSN")
        .value
        .trim()
        .toUpperCase();

    const email =
        document.getElementById("registerEmail")
        .value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("registerPassword")
        .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;

    const message =
        document.getElementById("registerMessage");


    // Check empty fields

    if (
        !name ||
        !usn ||
        !email ||
        !password ||
        !confirmPassword
    ) {

        message.textContent =
            "Please fill in all the fields.";

        return;
    }


    // Validate email

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        message.textContent =
            "Please enter a valid email address.";

        return;
    }


    // Password length

    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    // Confirm password

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    // Check duplicate account

    const existingUser =
        campusUsers.find(user =>
            user.email === email ||
            user.usn === usn
        );


    if (existingUser) {

        message.textContent =
            "An account with this Email or USN already exists.";

        return;
    }


    // Create account

    const newUser = {

        id: Date.now(),

        name: name,

        usn: usn,

        email: email,

        password: password

    };


    campusUsers.push(newUser);


    saveData();


    alert(
        "Account created successfully! Please login."
    );


    document
        .getElementById("createAccountForm")
        .reset();


    showLogin();
}


// ======================================================
// LOGIN USER
// ======================================================

function loginUser(event) {

    event.preventDefault();


    const identifier =
        document.getElementById("loginIdentifier")
        .value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword")
        .value;

    const message =
        document.getElementById("loginMessage");


    // VERY IMPORTANT
    // Do not continue if fields are empty

    if (!identifier || !password) {

        message.textContent =
            "Please enter your Email/USN and Password.";

        return;
    }


    // Find user

    const user =
        campusUsers.find(user =>

            user.email === identifier ||

            user.usn.toLowerCase() === identifier

        );


    // Account doesn't exist

    if (!user) {

        message.textContent =
            "Account not found. Please create an account first.";

        return;
    }


    // Check password

    if (user.password !== password) {

        message.textContent =
            "Incorrect password. Please try again.";

        return;
    }


    // Login successful

    currentUser = user;


    localStorage.setItem(
        "campusCurrentUser",
        JSON.stringify(currentUser)
    );


    // Initialize user data

    if (!registeredEvents[currentUser.id]) {

        registeredEvents[currentUser.id] = [];

    }


    if (!notifications[currentUser.id]) {

        notifications[currentUser.id] = [];

    }


    if (!attendance[currentUser.id]) {

        attendance[currentUser.id] = [];

    }


    if (!certificates[currentUser.id]) {

        certificates[currentUser.id] = [];

    }


    saveData();


    document
        .getElementById("loginForm")
        .reset();


    message.textContent = "";


    // Show dashboard

    showPage("dashboardPage");
}


// ======================================================
// LOGOUT
// ======================================================

function logoutUser() {

    localStorage.removeItem(
        "campusCurrentUser"
    );

    currentUser = null;

    showLogin();
}


// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard() {

    if (!currentUser) return;


    document.getElementById(
        "dashboardName"
    ).textContent = currentUser.name;


    document.getElementById(
        "totalEvents"
    ).textContent = events.length;


    const myEvents =
        registeredEvents[currentUser.id] || [];


    document.getElementById(
        "registeredEvents"
    ).textContent = myEvents.length;


    const myAttendance =
        attendance[currentUser.id] || [];


    document.getElementById(
        "attendedEvents"
    ).textContent =
        myAttendance.length;


    const myCertificates =
        certificates[currentUser.id] || [];


    document.getElementById(
        "certificateCount"
    ).textContent =
        myCertificates.length;


    // Show first 3 events

    const upcomingEvents =
        events.slice(0, 3);


    displayDashboardEvents(
        upcomingEvents
    );


    updateNotificationCount();
}


// ======================================================
// DASHBOARD EVENTS
// ======================================================

function displayDashboardEvents(eventList) {

    const container =
        document.getElementById(
            "dashboardEvents"
        );


    container.innerHTML = "";


    eventList.forEach(event => {

        container.innerHTML +=
            createEventCard(event);

    });
}


// ======================================================
// DISPLAY EVENTS
// ======================================================

function displayEvents(eventList = events) {

    const container =
        document.getElementById(
            "eventsContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    if (eventList.length === 0) {

        container.innerHTML =
            "<p>No events found.</p>";

        return;
    }


    eventList.forEach(event => {

        container.innerHTML +=
            createEventCard(event);

    });
}


// ======================================================
// CREATE EVENT CARD
// ======================================================

function createEventCard(event) {

    const myEvents =
        currentUser
            ? registeredEvents[currentUser.id] || []
            : [];


    const isRegistered =
        myEvents.includes(event.id);


    return `

        <div class="event-card">

            <span class="event-category">
                ${event.category}
            </span>

            <h3>
                ${event.title}
            </h3>

            <div class="event-info">

                📅 ${event.date}

                <br>

                ⏰ ${event.time}

                <br>

                📍 ${event.venue}

                <br>

                👥 ${event.seats} seats

            </div>


            <div class="event-actions">

                <button
                    class="view-btn"
                    onclick="openEventDetails(${event.id})">

                    View Details

                </button>


                <button
                    class="register-btn"
                    onclick="registerForEvent(${event.id})"
                    ${isRegistered ? "disabled" : ""}>

                    ${isRegistered
                        ? "Registered ✓"
                        : "Register"}

                </button>

            </div>

        </div>

    `;
}


// ======================================================
// SEARCH EVENTS
// ======================================================

function searchEvents() {

    const search =
        document.getElementById(
            "eventSearch"
        ).value.toLowerCase();


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const filtered =
        events.filter(event => {

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(search) ||

                event.description
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                event.category === category;


            return matchesSearch &&
                   matchesCategory;

        });


    displayEvents(filtered);
}


// ======================================================
// CATEGORY FILTER
// ======================================================

function filterCategory() {

    searchEvents();
}


// ======================================================
// EVENT DETAILS
// ======================================================

function openEventDetails(eventId) {

    const event =
        events.find(
            event => event.id === eventId
        );


    if (!event) return;


    const myEvents =
        registeredEvents[currentUser.id] || [];


    const isRegistered =
        myEvents.includes(event.id);


    document.getElementById(
        "eventDetails"
    ).innerHTML = `

        <span class="event-category">
            ${event.category}
        </span>

        <h2>${event.title}</h2>

        <br>

        <p>
            <strong>📅 Date:</strong>
            ${event.date}
        </p>

        <p>
            <strong>⏰ Time:</strong>
            ${event.time}
        </p>

        <p>
            <strong>📍 Venue:</strong>
            ${event.venue}
        </p>

        <p>
            <strong>👥 Available Seats:</strong>
            ${event.seats}
        </p>

        <br>

        <p>
            ${event.description}
        </p>

        <br>

        <button
            class="primary-btn"
            onclick="registerForEvent(${event.id})"
            ${isRegistered ? "disabled" : ""}>

            ${isRegistered
                ? "Already Registered ✓"
                : "Register for Event"}

        </button>

    `;


    document.getElementById(
        "eventModal"
    ).style.display = "flex";
}


// ======================================================
// CLOSE MODAL
// ======================================================

function closeModal() {

    document.getElementById(
        "eventModal"
    ).style.display = "none";
}


// ======================================================
// REGISTER FOR EVENT
// ======================================================

function registerForEvent(eventId) {

    if (!currentUser) {

        showLogin();

        return;
    }


    const event =
        events.find(
            event => event.id === eventId
        );


    if (!event) return;


    if (!registeredEvents[currentUser.id]) {

        registeredEvents[currentUser.id] = [];

    }


    const myEvents =
        registeredEvents[currentUser.id];


    // Already registered

    if (myEvents.includes(eventId)) {

        alert(
            "You are already registered for this event."
        );

        return;
    }


    // Check schedule clash

    if (checkScheduleClash(event)) {

        const confirmRegistration =
            confirm(
                "You already have another event on the same date. Do you still want to register?"
            );


        if (!confirmRegistration) {

            return;

        }

    }


    // Register

    myEvents.push(eventId);


    // Notification

    if (!notifications[currentUser.id]) {

        notifications[currentUser.id] = [];

    }


    notifications[currentUser.id].unshift({

        id: Date.now(),

        text:
            `You successfully registered for "${event.title}".`,

        time:
            new Date().toLocaleString()

    });


    saveData();


    alert(
        `Successfully registered for "${event.title}"!`
    );


    closeModal();


    displayEvents(events);

    updateDashboard();

    displayRegisteredEvents();

    displayNotifications();
}


// ======================================================
// SCHEDULE CLASH
// ======================================================

function checkScheduleClash(newEvent) {

    const myEvents =
        registeredEvents[currentUser.id] || [];


    return myEvents.some(eventId => {

        const registeredEvent =
            events.find(
                event => event.id === eventId
            );


        return registeredEvent &&
               registeredEvent.date === newEvent.date;

    });

}


// ======================================================
// MY REGISTERED EVENTS
// ======================================================

function displayRegisteredEvents() {

    const container =
        document.getElementById(
            "registeredEventsContainer"
        );


    if (!container) return;


    const myEvents =
        registeredEvents[currentUser.id] || [];


    container.innerHTML = "";


    if (myEvents.length === 0) {

        container.innerHTML = `

            <div class="event-card">

                <h3>No registered events yet.</h3>

                <p>
                    Go to the Events page and register
                    for an event.
                </p>

            </div>

        `;

        return;
    }


    myEvents.forEach(eventId => {

        const event =
            events.find(
                event => event.id === eventId
            );


        if (!event) return;


        container.innerHTML += `

            <div class="event-card">

                <span class="event-category">
                    ${event.category}
                </span>

                <h3>
                    ${event.title}
                </h3>

                <div class="event-info">

                    📅 ${event.date}

                    <br>

                    ⏰ ${event.time}

                    <br>

                    📍 ${event.venue}

                </div>


                <button
                    class="primary-btn"
                    onclick="markAttendance(${event.id})">

                    🎫 Mark Attendance

                </button>


                <br><br>


                <button
                    class="secondary-btn"
                    onclick="generateCertificate(${event.id})">

                    📜 Generate Certificate

                </button>

            </div>

        `;

    });

}


// ======================================================
// ATTENDANCE
// ======================================================

function markAttendance(eventId) {

    const event =
        events.find(
            event => event.id === eventId
        );


    if (!event) return;


    if (!attendance[currentUser.id]) {

        attendance[currentUser.id] = [];

    }


    if (
        attendance[currentUser.id]
        .includes(eventId)
    ) {

        alert(
            "Attendance already marked."
        );

        return;
    }


    attendance[currentUser.id].push(eventId);


    notifications[currentUser.id].unshift({

        id: Date.now(),

        text:
            `Attendance marked for "${event.title}".`,

        time:
            new Date().toLocaleString()

    });


    saveData();


    alert(
        "Attendance marked successfully! ✓"
    );


    updateDashboard();

    displayRegisteredEvents();

}


// ======================================================
// CERTIFICATE
// ======================================================

function generateCertificate(eventId) {

    const event =
        events.find(
            event => event.id === eventId
        );


    if (!event) return;


    const attended =
        attendance[currentUser.id] || [];


    if (!attended.includes(eventId)) {

        alert(
            "Please mark attendance before generating the certificate."
        );

        return;
    }


    if (!certificates[currentUser.id]) {

        certificates[currentUser.id] = [];

    }


    if (
        !certificates[currentUser.id]
            .includes(eventId)
    ) {

        certificates[currentUser.id]
            .push(eventId);

    }


    saveData();


    const certificateText = `

========================================

             CERTIFICATE

========================================


This is to certify that


${currentUser.name}

USN: ${currentUser.usn}


has successfully participated in


${event.title}


held on ${event.date}


Venue: ${event.venue}


Congratulations!


CampusConnect
College Event Management System


========================================
`;


    const blob =
        new Blob(
            [certificateText],
            { type: "text/plain" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        `${event.title}-Certificate.txt`;


    link.click();


    URL.revokeObjectURL(url);


    updateDashboard();
}


// ======================================================
// NOTIFICATIONS
// ======================================================

function displayNotifications() {

    const container =
        document.getElementById(
            "notificationsContainer"
        );


    const userNotifications =
        notifications[currentUser.id] || [];


    container.innerHTML = "";


    if (userNotifications.length === 0) {

        container.innerHTML = `

            <div class="notification-card">

                <p>
                    No notifications yet.
                </p>

            </div>

        `;

        return;
    }


    userNotifications.forEach(notification => {

        container.innerHTML += `

            <div class="notification-card">

                <p>
                    🔔 ${notification.text}
                </p>

                <span class="notification-time">
                    ${notification.time}
                </span>

            </div>

        `;

    });


    updateNotificationCount();
}


// ======================================================
// NOTIFICATION COUNT
// ======================================================

function updateNotificationCount() {

    if (!currentUser) return;


    const count =
        (notifications[currentUser.id] || [])
        .length;


    document.getElementById(
        "notificationCount"
    ).textContent = count;
}


// ======================================================
// PROFILE
// ======================================================

function displayProfile() {

    if (!currentUser) return;


    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileUSN"
    ).textContent =
        currentUser.usn;


    document.getElementById(
        "profileEmail"
    ).textContent =
        currentUser.email;
}


// ======================================================
// INITIALIZATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // Login form

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                loginUser
            );

        }


        // Create account form

        const createAccountForm =
            document.getElementById(
                "createAccountForm"
            );


        if (createAccountForm) {

            createAccountForm.addEventListener(
                "submit",
                createAccount
            );

        }


        // If already logged in

        const savedUser =
            JSON.parse(
                localStorage.getItem(
                    "campusCurrentUser"
                )
            );


        if (savedUser) {

            currentUser = savedUser;

            document.getElementById(
                "navbar"
            ).style.display = "flex";


            showPage(
                "dashboardPage"
            );

        } else {

            showLogin();

        }

    }
);
