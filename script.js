// ============================================================
//                 CAMPUSCONNECT
//          COLLEGE EVENT MANAGEMENT SYSTEM
// ============================================================


// ============================================================
// DEFAULT EVENTS
// ============================================================

const defaultEvents = [

    {
        id: 1,
        title: "Tech Innovation Hackathon",
        category: "Technical",
        date: "2026-09-20",
        time: "10:00 AM - 4:00 PM",
        venue: "Innovation Lab",
        seats: 100,
        description:
            "A coding and innovation competition where students solve real-world problems."
    },

    {
        id: 2,
        title: "AI & Machine Learning Workshop",
        category: "Workshop",
        date: "2026-09-24",
        time: "10:00 AM - 1:00 PM",
        venue: "Seminar Hall",
        seats: 60,
        description:
            "Learn the fundamentals of Artificial Intelligence and Machine Learning."
    },

    {
        id: 3,
        title: "Annual Cultural Fest",
        category: "Cultural",
        date: "2026-09-28",
        time: "9:00 AM - 6:00 PM",
        venue: "College Auditorium",
        seats: 500,
        description:
            "Celebrate music, dance, art and creativity at the annual cultural festival."
    },

    {
        id: 4,
        title: "Inter College Cricket Tournament",
        category: "Sports",
        date: "2026-10-03",
        time: "9:00 AM - 5:00 PM",
        venue: "College Ground",
        seats: 200,
        description:
            "An exciting cricket tournament between college teams."
    },

    {
        id: 5,
        title: "Career Guidance Seminar",
        category: "Seminar",
        date: "2026-10-08",
        time: "11:00 AM - 1:00 PM",
        venue: "Main Auditorium",
        seats: 150,
        description:
            "A career guidance session covering internships, jobs and higher education."
    }

];


// ============================================================
// LOAD DATA
// ============================================================

let events =
    JSON.parse(localStorage.getItem("campusEvents"))
    || defaultEvents;


let users =
    JSON.parse(localStorage.getItem("campusUsers"))
    || [];


let registrations =
    JSON.parse(localStorage.getItem("campusRegistrations"))
    || {};


let attendance =
    JSON.parse(localStorage.getItem("campusAttendance"))
    || {};


let certificates =
    JSON.parse(localStorage.getItem("campusCertificates"))
    || {};


let notifications =
    JSON.parse(localStorage.getItem("campusNotifications"))
    || {};


let currentUser =
    JSON.parse(localStorage.getItem("campusCurrentUser"))
    || null;


let currentRole =
    localStorage.getItem("campusCurrentRole")
    || null;


// ============================================================
// ADMIN ACCOUNT
// ============================================================

const ADMIN_EMAIL = "admin@campusconnect.com";

const ADMIN_PASSWORD = "admin123";


// ============================================================
// SAVE EVERYTHING
// ============================================================

function saveAll() {

    localStorage.setItem(
        "campusEvents",
        JSON.stringify(events)
    );

    localStorage.setItem(
        "campusUsers",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "campusRegistrations",
        JSON.stringify(registrations)
    );

    localStorage.setItem(
        "campusAttendance",
        JSON.stringify(attendance)
    );

    localStorage.setItem(
        "campusCertificates",
        JSON.stringify(certificates)
    );

    localStorage.setItem(
        "campusNotifications",
        JSON.stringify(notifications)
    );
}


// ============================================================
// HIDE ALL PAGES
// ============================================================

function hideAllPages() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.style.display = "none";

        });

}


// ============================================================
// SHOW PAGE
// ============================================================

function showPage(pageId) {

    if (!currentUser &&
        currentRole !== "admin") {

        showLogin();

        return;
    }


    hideAllPages();


    const page =
        document.getElementById(pageId);


    if (page) {

        page.style.display = "block";

    }


    const navbar =
        document.getElementById("navbar");


    navbar.style.display = "flex";


    // Student pages

    if (currentRole === "student") {

        document.getElementById("studentNav")
            .style.display = "flex";

        document.getElementById("adminNav")
            .style.display = "none";

    }


    // Admin pages

    if (currentRole === "admin") {

        document.getElementById("studentNav")
            .style.display = "none";

        document.getElementById("adminNav")
            .style.display = "flex";

    }


    // Update pages

    if (pageId === "dashboardPage") {

        updateStudentDashboard();

    }


    if (pageId === "eventsPage") {

        displayEvents(events);

    }


    if (pageId === "myEventsPage") {

        displayMyEvents();

    }


    if (pageId === "attendancePage") {

        loadAttendanceEvents();

    }


    if (pageId === "certificatesPage") {

        displayCertificates();

    }


    if (pageId === "notificationsPage") {

        displayNotifications();

    }


    if (pageId === "profilePage") {

        displayProfile();

    }


    if (pageId === "adminDashboardPage") {

        updateAdminDashboard();

    }


    if (pageId === "adminEventsPage") {

        displayAdminEvents();

    }


    if (pageId === "adminRegistrationsPage") {

        displayRegistrations();

    }

}


// ============================================================
// LOGIN PAGE
// ============================================================

function showLogin() {

    hideAllPages();


    currentUser = null;

    currentRole = null;


    localStorage.removeItem(
        "campusCurrentUser"
    );

    localStorage.removeItem(
        "campusCurrentRole"
    );


    document.getElementById("loginPage")
        .style.display = "flex";


    document.getElementById("navbar")
        .style.display = "none";


    document.getElementById("loginMessage")
        .textContent = "";

}


// ============================================================
// CREATE ACCOUNT PAGE
// ============================================================

function showCreateAccount() {

    hideAllPages();


    document.getElementById("createAccountPage")
        .style.display = "flex";


    document.getElementById("navbar")
        .style.display = "none";


    document.getElementById("registerMessage")
        .textContent = "";

}


// ============================================================
// STUDENT LOGIN TAB
// ============================================================

function showStudentLogin() {

    document.getElementById("studentLoginTab")
        .classList.add("active");


    document.getElementById("adminLoginTab")
        .classList.remove("active");


    document.getElementById("studentLoginForm")
        .style.display = "flex";


    document.getElementById("loginIdentifier")
        .placeholder = "Enter Email or USN";


    document.getElementById("loginMessage")
        .textContent = "";

}


// ============================================================
// ADMIN LOGIN TAB
// ============================================================

function showAdminLogin() {

    document.getElementById("adminLoginTab")
        .classList.add("active");


    document.getElementById("studentLoginTab")
        .classList.remove("active");


    const form =
        document.getElementById("studentLoginForm");


    form.style.display = "flex";


    document.getElementById("loginIdentifier")
        .placeholder = "Admin Email";


    document.getElementById("loginMessage")
        .textContent =
        "Admin login: admin@campusconnect.com";

}


// ============================================================
// CREATE ACCOUNT
// ============================================================

function createAccount(event) {

    event.preventDefault();


    const name =
        document.getElementById("registerName")
        .value.trim();


    const usn =
        document.getElementById("registerUSN")
        .value.trim()
        .toUpperCase();


    const email =
        document.getElementById("registerEmail")
        .value.trim()
        .toLowerCase();


    const password =
        document.getElementById("registerPassword")
        .value;


    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;


    const message =
        document.getElementById("registerMessage");


    // Empty fields

    if (
        !name ||
        !usn ||
        !email ||
        !password ||
        !confirmPassword
    ) {

        message.textContent =
            "Please fill in all fields.";

        return;

    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        message.textContent =
            "Please enter a valid email.";

        return;

    }


    // Password length

    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;

    }


    // Password matching

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;

    }


    // Duplicate account

    const existing =
        users.find(user =>
            user.email === email ||
            user.usn === usn
        );


    if (existing) {

        message.textContent =
            "Email or USN is already registered.";

        return;

    }


    // Create student

    const newUser = {

        id: Date.now(),

        name: name,

        usn: usn,

        email: email,

        password: password

    };


    users.push(newUser);


    registrations[newUser.id] = [];

    attendance[newUser.id] = [];

    certificates[newUser.id] = [];

    notifications[newUser.id] = [];


    saveAll();


    alert(
        "Account created successfully! Please login."
    );


    document
        .getElementById("createAccountForm")
        .reset();


    showLogin();

}


// ============================================================
// LOGIN
// ============================================================

function login(event) {

    event.preventDefault();


    const identifier =
        document.getElementById(
            "loginIdentifier"
        )
        .value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    // EMPTY LOGIN

    if (!identifier || !password) {

        message.textContent =
            "Please enter your Email/USN and Password.";

        return;

    }


    // ADMIN LOGIN

    if (
        identifier === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        currentRole = "admin";

        currentUser = {
            name: "Administrator",
            email: ADMIN_EMAIL
        };


        localStorage.setItem(
            "campusCurrentRole",
            "admin"
        );


        localStorage.setItem(
            "campusCurrentUser",
            JSON.stringify(currentUser)
        );


        document
            .getElementById("studentLoginForm")
            .reset();


        showPage("adminDashboardPage");


        return;

    }


    // STUDENT LOGIN

    const user =
        users.find(user =>

            user.email === identifier ||

            user.usn.toLowerCase() === identifier

        );


    if (!user) {

        message.textContent =
            "Account not found. Please create an account.";

        return;

    }


    if (user.password !== password) {

        message.textContent =
            "Incorrect password.";

        return;

    }


    currentUser = user;

    currentRole = "student";


    localStorage.setItem(
        "campusCurrentUser",
        JSON.stringify(currentUser)
    );


    localStorage.setItem(
        "campusCurrentRole",
        "student"
    );


    if (!registrations[user.id]) {

        registrations[user.id] = [];

    }


    if (!attendance[user.id]) {

        attendance[user.id] = [];

    }


    if (!certificates[user.id]) {

        certificates[user.id] = [];

    }


    if (!notifications[user.id]) {

        notifications[user.id] = [];

    }


    saveAll();


    document
        .getElementById("studentLoginForm")
        .reset();


    showPage("dashboardPage");

}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    localStorage.removeItem(
        "campusCurrentUser"
    );

    localStorage.removeItem(
        "campusCurrentRole"
    );


    currentUser = null;

    currentRole = null;


    showLogin();

}


// ============================================================
// STUDENT DASHBOARD
// ============================================================

function updateStudentDashboard() {

    if (!currentUser) return;


    document.getElementById(
        "dashboardName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "totalEvents"
    ).textContent =
        events.length;


    const myRegistrations =
        registrations[currentUser.id] || [];


    const myAttendance =
        attendance[currentUser.id] || [];


    const myCertificates =
        certificates[currentUser.id] || [];


    document.getElementById(
        "myEventCount"
    ).textContent =
        myRegistrations.length;


    document.getElementById(
        "attendanceCount"
    ).textContent =
        myAttendance.length;


    document.getElementById(
        "certificateCount"
    ).textContent =
        myCertificates.length;


    displayDashboardEvents();

    updateNotificationCount();

}


// ============================================================
// DASHBOARD EVENTS
// ============================================================

function displayDashboardEvents() {

    const container =
        document.getElementById(
            "dashboardEvents"
        );


    container.innerHTML = "";


    events.slice(0, 3).forEach(event => {

        container.innerHTML +=
            createEventCard(event);

    });

}


// ============================================================
// EVENT CARD
// ============================================================

function createEventCard(event) {

    const myEvents =
        registrations[currentUser.id] || [];


    const registered =
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
                    onclick="viewEvent(${event.id})">

                    View

                </button>


                <button
                    class="register-btn"
                    onclick="registerEvent(${event.id})"
                    ${registered ? "disabled" : ""}>

                    ${registered
                        ? "Registered ✓"
                        : "Register"}

                </button>

            </div>

        </div>

    `;

}


// ============================================================
// DISPLAY EVENTS
// ============================================================

function displayEvents(eventList) {

    const container =
        document.getElementById(
            "eventsContainer"
        );


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


// ============================================================
// SEARCH + FILTER
// ============================================================

function filterEvents() {

    const search =
        document.getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();


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


// ============================================================
// VIEW EVENT
// ============================================================

function viewEvent(eventId) {

    const event =
        events.find(
            e => e.id === eventId
        );


    if (!event) return;


    const registered =
        (registrations[currentUser.id] || [])
        .includes(event.id);


    document.getElementById(
        "eventDetails"
    ).innerHTML = `

        <span class="event-category">
            ${event.category}
        </span>

        <h2>${event.title}</h2>

        <br>

        <p>
            📅 <strong>Date:</strong>
            ${event.date}
        </p>

        <p>
            ⏰ <strong>Time:</strong>
            ${event.time}
        </p>

        <p>
            📍 <strong>Venue:</strong>
            ${event.venue}
        </p>

        <p>
            👥 <strong>Seats:</strong>
            ${event.seats}
        </p>

        <br>

        <p>
            ${event.description}
        </p>

        <br>

        <button
            class="primary-btn"
            onclick="registerEvent(${event.id})"
            ${registered ? "disabled" : ""}>

            ${registered
                ? "Already Registered ✓"
                : "Register"}

        </button>

    `;


    document.getElementById(
        "eventModal"
    ).style.display = "flex";

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

    document.getElementById(
        "eventModal"
    ).style.display = "none";

}


// ============================================================
// REGISTER EVENT
// ============================================================

function registerEvent(eventId) {

    const event =
        events.find(
            e => e.id === eventId
        );


    if (!event) return;


    if (!registrations[currentUser.id]) {

        registrations[currentUser.id] = [];

    }


    if (
        registrations[currentUser.id]
            .includes(eventId)
    ) {

        alert(
            "You are already registered."
        );

        return;

    }


    // Schedule clash

    const clash =
        registrations[currentUser.id]
            .some(id => {

                const oldEvent =
                    events.find(
                        e => e.id === id
                    );

                return oldEvent &&
                       oldEvent.date === event.date;

            });


    if (clash) {

        const proceed =
            confirm(
                "You already have another event on this date. Continue registration?"
            );


        if (!proceed) return;

    }


    registrations[currentUser.id]
        .push(eventId);


    // Notification

    if (!notifications[currentUser.id]) {

        notifications[currentUser.id] = [];

    }


    notifications[currentUser.id]
        .unshift({

            id: Date.now(),

            text:
                `You registered for "${event.title}".`,

            time:
                new Date().toLocaleString()

        });


    saveAll();


    alert(
        "Registration successful! ✓"
    );


    closeModal();


    displayEvents(events);

    displayMyEvents();

    updateStudentDashboard();

}


// ============================================================
// MY EVENTS
// ============================================================

function displayMyEvents() {

    const container =
        document.getElementById(
            "myEventsContainer"
        );


    container.innerHTML = "";


    const myEvents =
        registrations[currentUser.id] || [];


    if (myEvents.length === 0) {

        container.innerHTML = `

            <div class="event-card">

                <h3>
                    No registered events.
                </h3>

                <p>
                    Register for an event to see it here.
                </p>

            </div>

        `;

        return;

    }


    myEvents.forEach(id => {

        const event =
            events.find(
                e => e.id === id
            );


        if (!event) return;


        const attended =
            (attendance[currentUser.id] || [])
            .includes(event.id);


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


                ${
                    attended

                    ?

                    `

                    <button
                        class="primary-btn"
                        onclick="generateCertificate(${event.id})">

                        🏆 Get Certificate

                    </button>

                    `

                    :

                    `

                    <button
                        class="primary-btn"
                        onclick="openAttendance(${event.id})">

                        📷 Scan QR Attendance

                    </button>

                    `

                }

            </div>

        `;

    });

}


// ============================================================
// OPEN ATTENDANCE
// ============================================================

function openAttendance(eventId) {

    showPage("attendancePage");


    setTimeout(() => {

        document.getElementById(
            "attendanceEventSelect"
        ).value = eventId;

    }, 50);

}


// ============================================================
// LOAD ATTENDANCE EVENTS
// ============================================================

function loadAttendanceEvents() {

    const select =
        document.getElementById(
            "attendanceEventSelect"
        );


    select.innerHTML =
        `<option value="">
            Select Event
        </option>`;


    const myEvents =
        registrations[currentUser.id] || [];


    myEvents.forEach(id => {

        const event =
            events.find(
                e => e.id === id
            );


        if (!event) return;


        const option =
            document.createElement("option");


        option.value = event.id;

        option.textContent =
            event.title;


        select.appendChild(option);

    });

}


// ============================================================
// QR ATTENDANCE SCANNER
// ============================================================

function scanAttendance() {

    const select =
        document.getElementById(
            "attendanceEventSelect"
        );


    const eventId =
        Number(select.value);


    const message =
        document.getElementById(
            "scannerMessage"
        );


    if (!eventId) {

        message.textContent =
            "Please select an event.";

        return;

    }


    const event =
        events.find(
            e => e.id === eventId
        );


    if (!event) return;


    if (!attendance[currentUser.id]) {

        attendance[currentUser.id] = [];

    }


    if (
        attendance[currentUser.id]
            .includes(eventId)
    ) {

        message.textContent =
            "Attendance is already marked.";

        return;

    }


    /*
        DEMO QR SCANNER

        For this frontend prototype,
        clicking SCAN simulates a
        successful QR scan.

        Later this can be replaced
        with a real QR scanning
        library/backend.
    */


    attendance[currentUser.id]
        .push(eventId);


    notifications[currentUser.id]
        .unshift({

            id: Date.now(),

            text:
                `Attendance marked for "${event.title}".`,

            time:
                new Date().toLocaleString()

        });


    saveAll();


    message.textContent =
        "QR scanned successfully! Attendance marked ✓";


    alert(
        `Attendance marked for ${event.title}!`
    );


    updateStudentDashboard();

    displayMyEvents();

}


// ============================================================
// CERTIFICATES
// ============================================================

function displayCertificates() {

    const container =
        document.getElementById(
            "certificatesContainer"
        );


    container.innerHTML = "";


    const myCertificates =
        certificates[currentUser.id] || [];


    const myAttendance =
        attendance[currentUser.id] || [];


    // Create certificates for attended events

    myAttendance.forEach(eventId => {

        if (
            !myCertificates.includes(eventId)
        ) {

            myCertificates.push(eventId);

        }

    });


    saveAll();


    if (myCertificates.length === 0) {

        container.innerHTML = `

            <div class="certificate-card">

                <h3>
                    No Certificates Yet
                </h3>

                <p>
                    Attend an event to receive your certificate.
                </p>

            </div>

        `;

        return;

    }


    myCertificates.forEach(eventId => {

        const event =
            events.find(
                e => e.id === eventId
            );


        if (!event) return;


        container.innerHTML += `

            <div class="certificate-card">

                <div style="font-size:40px;">
                    🏆
                </div>

                <h3>
                    Certificate of Participation
                </h3>

                <p>
                    ${currentUser.name}
                </p>

                <p>
                    ${event.title}
                </p>

                <br>

                <button
                    class="primary-btn"
                    onclick="generateCertificate(${event.id})">

                    Download Certificate

                </button>

            </div>

        `;

    });

}


// ============================================================
// GENERATE CERTIFICATE
// ============================================================

function generateCertificate(eventId) {

    const event =
        events.find(
            e => e.id === eventId
        );


    if (!event) return;


    const attended =
        (attendance[currentUser.id] || [])
        .includes(eventId);


    if (!attended) {

        alert(
            "Attendance is required before getting the certificate."
        );

        return;

    }


    const certificate = `

==================================================

             CERTIFICATE OF PARTICIPATION

==================================================


This certificate is proudly presented to


                 ${currentUser.name}


USN: ${currentUser.usn}


for successfully participating in


              ${event.title}


Category: ${event.category}

Date: ${event.date}

Venue: ${event.venue}


Congratulations!


                 CampusConnect
        College Event Management System


==================================================
`;


    const blob =
        new Blob(
            [certificate],
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

}


// ============================================================
// NOTIFICATIONS
// ============================================================

function displayNotifications() {

    const container =
        document.getElementById(
            "notificationsContainer"
        );


    container.innerHTML = "";


    const userNotifications =
        notifications[currentUser.id] || [];


    if (userNotifications.length === 0) {

        container.innerHTML = `

            <div class="notification-card">

                No notifications yet.

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

}


// ============================================================
// NOTIFICATION COUNT
// ============================================================

function updateNotificationCount() {

    if (!currentUser) return;


    const count =
        (notifications[currentUser.id] || [])
        .length;


    document.getElementById(
        "notificationCount"
    ).textContent = count;

}


// ============================================================
// PROFILE
// ============================================================

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


// ============================================================
// ADMIN DASHBOARD
// ============================================================

function updateAdminDashboard() {

    document.getElementById(
        "adminTotalEvents"
    ).textContent =
        events.length;


    document.getElementById(
        "adminTotalStudents"
    ).textContent =
        users.length;


    let totalRegistrations = 0;


    Object.values(registrations)
        .forEach(list => {

            totalRegistrations +=
                list.length;

        });


    document.getElementById(
        "adminRegistrations"
    ).textContent =
        totalRegistrations;

}


// ============================================================
// ADMIN EVENTS
// ============================================================

function displayAdminEvents() {

    const container =
        document.getElementById(
            "adminEventsContainer"
        );


    container.innerHTML = "";


    events.forEach(event => {

        const registrationCount =
            Object.values(registrations)
                .filter(list =>
                    list.includes(event.id)
                )
                .length;


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

                    <br>

                    👥 Capacity: ${event.seats}

                    <br>

                    📝 Registrations:
                    ${registrationCount}

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteEvent(${event.id})">

                    🗑️ DELETE EVENT

                </button>

            </div>

        `;

    });

}


// ============================================================
// ADD EVENT
// ============================================================

function addEvent(event) {

    event.preventDefault();


    const title =
        document.getElementById(
            "eventName"
        ).value.trim();


    const category =
        document.getElementById(
            "eventCategory"
        ).value;


    const date =
        document.getElementById(
            "eventDate"
        ).value;


    const time =
        document.getElementById(
            "eventTime"
        ).value.trim();


    const venue =
        document.getElementById(
            "eventVenue"
        ).value.trim();


    const seats =
        Number(
            document.getElementById(
                "eventSeats"
            ).value
        );


    const description =
        document.getElementById(
            "eventDescription"
        ).value.trim();


    const newEvent = {

        id: Date.now(),

        title: title,

        category: category,

        date: date,

        time: time,

        venue: venue,

        seats: seats,

        description: description

    };


    events.push(newEvent);


    saveAll();


    alert(
        "Event added successfully! ✓"
    );


    document
        .getElementById("addEventForm")
        .reset();


    showPage("adminEventsPage");

}


// ============================================================
// DELETE EVENT
// ============================================================

function deleteEvent(eventId) {

    const event =
        events.find(
            e => e.id === eventId
        );


    if (!event) return;


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${event.title}"?`
        );


    if (!confirmDelete) return;


    events =
        events.filter(
            e => e.id !== eventId
        );


    // Remove event from registrations

    Object.keys(registrations)
        .forEach(userId => {

            registrations[userId] =
                registrations[userId]
                .filter(
                    id => id !== eventId
                );

        });


    // Remove attendance

    Object.keys(attendance)
        .forEach(userId => {

            attendance[userId] =
                attendance[userId]
                .filter(
                    id => id !== eventId
                );

        });


    // Remove certificates

    Object.keys(certificates)
        .forEach(userId => {

            certificates[userId] =
                certificates[userId]
                .filter(
                    id => id !== eventId
                );

        });


    saveAll();


    alert(
        "Event deleted successfully."
    );


    displayAdminEvents();

}


// ============================================================
// ADMIN REGISTRATIONS
// ============================================================

function displayRegistrations() {

    const container =
        document.getElementById(
            "registrationsContainer"
        );


    container.innerHTML = "";


    events.forEach(event => {


        const registeredStudents = [];


        users.forEach(user => {

            const userRegistrations =
                registrations[user.id] || [];


            if (
                userRegistrations
                    .includes(event.id)
            ) {

                registeredStudents.push(user);

            }

        });


        container.innerHTML += `

            <div class="registration-card">

                <h2>
                    ${event.title}
                </h2>

                <p>
                    📅 ${event.date}
                </p>

                <p>
                    👥
                    ${registeredStudents.length}
                    students registered
                </p>


                <br>


                ${
                    registeredStudents.length === 0

                    ?

                    "<p>No registrations yet.</p>"

                    :

                    registeredStudents
                    .map(student => `

                        <div class="student-registration">

                            👤
                            <strong>
                                ${student.name}
                            </strong>

                            <br>

                            USN:
                            ${student.usn}

                            <br>

                            Email:
                            ${student.email}

                        </div>

                    `)
                    .join("")

                }

            </div>

        `;

    });

}


// ============================================================
// FORM EVENTS
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // Student login

        document
            .getElementById(
                "studentLoginForm"
            )
            .addEventListener(
                "submit",
                login
            );


        // Create account

        document
            .getElementById(
                "createAccountForm"
            )
            .addEventListener(
                "submit",
                createAccount
            );


        // Admin add event

        document
            .getElementById(
                "addEventForm"
            )
            .addEventListener(
                "submit",
                addEvent
            );


        // Existing login

        if (
            currentUser &&
            currentRole
        ) {

            if (
                currentRole === "admin"
            ) {

                showPage(
                    "adminDashboardPage"
                );

            } else {

                showPage(
                    "dashboardPage"
                );

            }

        } else {

            showLogin();

        }

    }
);
