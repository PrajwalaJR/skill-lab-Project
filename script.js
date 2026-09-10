/* ============================================================
   CAMPUSCONNECT - COLLEGE EVENT MANAGEMENT SYSTEM
   JavaScript Functionality
   ============================================================ */

/* ============================================================
   1. SAMPLE EVENT DATA
   ============================================================ */

const events = [
    {
        id: 1,
        title: "National HackTech 2025",
        category: "Technical",
        date: "2025-10-24",
        time: "09:00 AM",
        endTime: "04:00 PM",
        venue: "Newton Hall",
        organizer: "Computer Science Department",
        seats: 100,
        registered: 68,
        price: "Free",
        description:
            "A technical hackathon where students solve real-world problems using technology.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
    },

    {
        id: 2,
        title: "VibeCraft Design Sprint",
        category: "Technical",
        date: "2025-10-27",
        time: "10:00 AM",
        endTime: "02:00 PM",
        venue: "Innovation Lab",
        organizer: "Design Club",
        seats: 80,
        registered: 54,
        price: "Free",
        description:
            "A creative UI/UX and design competition for students.",
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d"
    },

    {
        id: 3,
        title: "Zenith Inter-College Fest",
        category: "Sports",
        date: "2025-10-28",
        time: "09:00 AM",
        endTime: "05:00 PM",
        venue: "College Ground",
        organizer: "Sports Club",
        seats: 150,
        registered: 92,
        price: "Free",
        description:
            "An inter-college sports and cultural festival.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
    },

    {
        id: 4,
        title: "AI & Generative Tools Masterclass",
        category: "Technical",
        date: "2025-11-05",
        time: "10:00 AM",
        endTime: "01:00 PM",
        venue: "Seminar Hall",
        organizer: "AI Club",
        seats: 120,
        registered: 76,
        price: "Free",
        description:
            "Learn about Artificial Intelligence and modern generative AI tools.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    },

    {
        id: 5,
        title: "Symphony Night",
        category: "Cultural",
        date: "2025-11-08",
        time: "06:00 PM",
        endTime: "09:00 PM",
        venue: "Open Air Auditorium",
        organizer: "Cultural Club",
        seats: 200,
        registered: 125,
        price: "Free",
        description:
            "A cultural evening featuring music, performances and entertainment.",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
    }
];


/* ============================================================
   2. APPLICATION STATE
   ============================================================ */

let currentUser =
    JSON.parse(localStorage.getItem("campusCurrentUser")) || null;

let registeredEvents =
    JSON.parse(localStorage.getItem("campusRegisteredEvents")) || [];

let notifications =
    JSON.parse(localStorage.getItem("campusNotifications")) || [];

let attendance =
    JSON.parse(localStorage.getItem("campusAttendance")) || [];

let certificates =
    JSON.parse(localStorage.getItem("campusCertificates")) || [];


/* ============================================================
   3. SAVE DATA
   ============================================================ */

function saveData() {

    localStorage.setItem(
        "campusCurrentUser",
        JSON.stringify(currentUser)
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


/* ============================================================
   4. PAGE NAVIGATION
   ============================================================ */

function showPage(pageId) {

    const pages = document.querySelectorAll(
        ".page, .app-page, section[data-page]"
    );

    pages.forEach(page => {
        page.style.display = "none";
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.style.display = "block";
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    updateNavigation();
}


function updateNavigation() {

    const userElements =
        document.querySelectorAll("[data-user-name]");

    userElements.forEach(element => {

        if (currentUser) {
            element.textContent = currentUser.name;
        } else {
            element.textContent = "Student";
        }
    });
}


/* ============================================================
   5. LOGIN / SIGN UP
   ============================================================ */

function loginUser(event) {

    if (event) {
        event.preventDefault();
    }

    const name =
        document.getElementById("name")?.value.trim();

    const usn =
        document.getElementById("usn")?.value.trim();

    const email =
        document.getElementById("email")?.value.trim();

    if (!name || !usn || !email) {

        alert("Please enter Name, USN and Email.");

        return;
    }

    if (!email.includes("@")) {

        alert("Please enter a valid email address.");

        return;
    }

    currentUser = {
        name: name,
        usn: usn,
        email: email,
        branch: "Computer Science & Engineering",
        joined: new Date().toLocaleDateString()
    };

    saveData();

    addNotification(
        "Welcome to CampusConnect!",
        "Your student account has been successfully created."
    );

    alert("Login successful!");

    showPage("dashboardPage");

    updateNavigation();
}


/* ============================================================
   6. LOGOUT
   ============================================================ */

function logoutUser() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    currentUser = null;

    localStorage.removeItem("campusCurrentUser");

    showPage("loginPage");
}


/* ============================================================
   7. DISPLAY EVENTS
   ============================================================ */

function displayEvents(eventList = events) {

    const container =
        document.getElementById("eventsContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (eventList.length === 0) {

        container.innerHTML = `
            <div class="no-events">
                <h3>No events found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }

    eventList.forEach(event => {

        const alreadyRegistered =
            registeredEvents.includes(event.id);

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `

            <img
                src="${event.image}"
                alt="${event.title}"
                class="event-image"
            >

            <div class="event-content">

                <span class="event-category">
                    ${event.category}
                </span>

                <h3>${event.title}</h3>

                <p>${event.description}</p>

                <div class="event-info">
                    📅 ${formatDate(event.date)}
                </div>

                <div class="event-info">
                    🕐 ${event.time}
                </div>

                <div class="event-info">
                    📍 ${event.venue}
                </div>

                <div class="event-info">
                    👥 ${event.registered}/${event.seats} seats
                </div>

                <button
                    class="event-button"
                    onclick="openEventDetails(${event.id})"
                >
                    View Details
                </button>

                ${
                    alreadyRegistered
                    ?
                    `<button
                        class="registered-button"
                        disabled
                    >
                        ✓ Registered
                    </button>`
                    :
                    `<button
                        class="register-button"
                        onclick="registerForEvent(${event.id})"
                    >
                        Register
                    </button>`
                }

            </div>
        `;

        container.appendChild(card);
    });
}


/* ============================================================
   8. EVENT SEARCH
   ============================================================ */

function searchEvents() {

    const searchInput =
        document.getElementById("eventSearch");

    if (!searchInput) {
        return;
    }

    const keyword =
        searchInput.value.toLowerCase().trim();

    const filteredEvents =
        events.filter(event =>

            event.title.toLowerCase().includes(keyword) ||

            event.category.toLowerCase().includes(keyword) ||

            event.venue.toLowerCase().includes(keyword) ||

            event.organizer.toLowerCase().includes(keyword)

        );

    displayEvents(filteredEvents);
}


/* ============================================================
   9. CATEGORY FILTER
   ============================================================ */

function filterCategory(category) {

    if (category === "All") {

        displayEvents(events);

        return;
    }

    const filtered =
        events.filter(event =>
            event.category === category
        );

    displayEvents(filtered);
}


/* ============================================================
   10. EVENT DETAILS
   ============================================================ */

function openEventDetails(eventId) {

    const event =
        events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    const detailsContainer =
        document.getElementById("eventDetails");

    if (!detailsContainer) {

        alert(
            `${event.title}\n\n` +
            `Date: ${formatDate(event.date)}\n` +
            `Time: ${event.time}\n` +
            `Venue: ${event.venue}\n` +
            `Organizer: ${event.organizer}\n\n` +
            `${event.description}`
        );

        return;
    }

    detailsContainer.innerHTML = `

        <img
            src="${event.image}"
            alt="${event.title}"
        >

        <h2>${event.title}</h2>

        <p>${event.description}</p>

        <p>📅 ${formatDate(event.date)}</p>

        <p>🕐 ${event.time}</p>

        <p>📍 ${event.venue}</p>

        <p>👥 ${event.registered}/${event.seats} registered</p>

        <p>🏫 ${event.organizer}</p>

        <button
            onclick="registerForEvent(${event.id})"
        >
            Register Now
        </button>
    `;

    showPage("eventDetailsPage");
}


/* ============================================================
   11. REGISTER FOR EVENT
   ============================================================ */

function registerForEvent(eventId) {

    if (!currentUser) {

        alert("Please login first.");

        showPage("loginPage");

        return;
    }

    const event =
        events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    if (registeredEvents.includes(eventId)) {

        alert("You are already registered for this event.");

        return;
    }

    if (event.registered >= event.seats) {

        alert("Sorry! This event is full.");

        return;
    }

    /* Check schedule clash */

    const clash =
        checkScheduleClash(event);

    if (clash) {

        const continueRegistration =
            confirm(
                `Schedule clash detected!\n\n` +
                `You are already registered for "${clash.title}".\n\n` +
                `Do you still want to register?`
            );

        if (!continueRegistration) {
            return;
        }
    }

    registeredEvents.push(eventId);

    event.registered++;

    saveData();

    addNotification(
        "Registration Confirmed",
        `You are registered for ${event.title}.`
    );

    alert(
        `Successfully registered for ${event.title}!`
    );

    displayEvents();

    updateDashboard();
}


/* ============================================================
   12. SCHEDULE CLASH DETECTION
   ============================================================ */

function checkScheduleClash(newEvent) {

    const registered =
        events.filter(event =>
            registeredEvents.includes(event.id)
        );

    return registered.find(event =>

        event.date === newEvent.date

    );
}


/* ============================================================
   13. MY REGISTERED EVENTS
   ============================================================ */

function displayRegisteredEvents() {

    const container =
        document.getElementById(
            "registeredEventsContainer"
        );

    if (!container) {
        return;
    }

    const myEvents =
        events.filter(event =>
            registeredEvents.includes(event.id)
        );

    container.innerHTML = "";

    if (myEvents.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No registered events</h3>
                <p>Explore events and register for one.</p>
            </div>
        `;

        return;
    }

    myEvents.forEach(event => {

        const card =
            document.createElement("div");

        card.className = "registered-event-card";

        card.innerHTML = `

            <h3>${event.title}</h3>

            <p>📅 ${formatDate(event.date)}</p>

            <p>🕐 ${event.time}</p>

            <p>📍 ${event.venue}</p>

            <button
                onclick="markAttendance(${event.id})"
            >
                Mark Attendance
            </button>

        `;

        container.appendChild(card);
    });
}


/* ============================================================
   14. QR ATTENDANCE SIMULATION
   ============================================================ */

function markAttendance(eventId) {

    const event =
        events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    if (!registeredEvents.includes(eventId)) {

        alert(
            "You must register for this event first."
        );

        return;
    }

    if (attendance.includes(eventId)) {

        alert(
            "Attendance already marked for this event."
        );

        return;
    }

    attendance.push(eventId);

    saveData();

    addNotification(
        "Attendance Confirmed",
        `Your attendance for ${event.title} has been recorded.`
    );

    alert(
        `✓ Attendance confirmed for ${event.title}`
    );
}


/* ============================================================
   15. QR SCANNER SIMULATION
   ============================================================ */

function scanQR() {

    const qrMessage =
        document.getElementById("qrMessage");

    if (qrMessage) {

        qrMessage.innerHTML = `
            <div class="qr-success">
                ✓ QR Code Detected
                <br>
                Attendance marked successfully!
            </div>
        `;
    }

    if (registeredEvents.length > 0) {

        const eventId =
            registeredEvents[0];

        if (!attendance.includes(eventId)) {

            attendance.push(eventId);

            saveData();
        }
    }

    addNotification(
        "Attendance Confirmed",
        "Your QR attendance has been successfully recorded."
    );
}


/* ============================================================
   16. NOTIFICATIONS
   ============================================================ */

function addNotification(title, message) {

    notifications.unshift({

        id: Date.now(),

        title: title,

        message: message,

        time: new Date().toLocaleString(),

        read: false
    });

    saveData();

    displayNotifications();
}


function displayNotifications() {

    const container =
        document.getElementById(
            "notificationsContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (notifications.length === 0) {

        container.innerHTML = `
            <p>No new notifications.</p>
        `;

        return;
    }

    notifications.forEach(notification => {

        const item =
            document.createElement("div");

        item.className =
            notification.read
            ? "notification read"
            : "notification unread";

        item.innerHTML = `

            <div>

                <h4>${notification.title}</h4>

                <p>${notification.message}</p>

                <small>
                    ${notification.time}
                </small>

            </div>

            <button
                onclick="markNotificationRead(${notification.id})"
            >
                ✓
            </button>
        `;

        container.appendChild(item);
    });
}


function markNotificationRead(notificationId) {

    const notification =
        notifications.find(
            item => item.id === notificationId
        );

    if (!notification) {
        return;
    }

    notification.read = true;

    saveData();

    displayNotifications();
}


function markAllNotificationsRead() {

    notifications.forEach(
        notification =>
            notification.read = true
    );

    saveData();

    displayNotifications();
}


/* ============================================================
   17. NOTIFICATION COUNT
   ============================================================ */

function updateNotificationCount() {

    const unreadCount =
        notifications.filter(
            notification => !notification.read
        ).length;

    const badges =
        document.querySelectorAll(
            ".notification-count"
        );

    badges.forEach(badge => {

        badge.textContent = unreadCount;

        badge.style.display =
            unreadCount > 0
            ? "inline-block"
            : "none";
    });
}


/* ============================================================
   18. PROFILE
   ============================================================ */

function displayProfile() {

    if (!currentUser) {
        return;
    }

    const nameElements =
        document.querySelectorAll(
            "[data-profile-name]"
        );

    nameElements.forEach(element => {
        element.textContent =
            currentUser.name;
    });

    const emailElements =
        document.querySelectorAll(
            "[data-profile-email]"
        );

    emailElements.forEach(element => {
        element.textContent =
            currentUser.email;
    });

    const usnElements =
        document.querySelectorAll(
            "[data-profile-usn]"
        );

    usnElements.forEach(element => {
        element.textContent =
            currentUser.usn;
    });

    const branchElements =
        document.querySelectorAll(
            "[data-profile-branch]"
        );

    branchElements.forEach(element => {
        element.textContent =
            currentUser.branch;
    });
}


/* ============================================================
   19. CERTIFICATE GENERATION
   ============================================================ */

function generateCertificate(eventId) {

    const event =
        events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    if (!attendance.includes(eventId)) {

        alert(
            "Certificate will be available after attendance is verified."
        );

        return;
    }

    if (!certificates.includes(eventId)) {

        certificates.push(eventId);

        saveData();
    }

    alert(
        `Certificate generated for ${event.title}!`
    );

    displayCertificates();
}


/* ============================================================
   20. DISPLAY CERTIFICATES
   ============================================================ */

function displayCertificates() {

    const container =
        document.getElementById(
            "certificatesContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (certificates.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No certificates yet</h3>
                <p>Attend events to receive certificates.</p>
            </div>
        `;

        return;
    }

    certificates.forEach(eventId => {

        const event =
            events.find(item => item.id === eventId);

        if (!event) {
            return;
        }

        const card =
            document.createElement("div");

        card.className = "certificate-card";

        card.innerHTML = `

            <h3>${event.title}</h3>

            <p>
                Certificate of Participation
            </p>

            <p>
                ${currentUser?.name || "Student"}
            </p>

            <button
                onclick="downloadCertificate(${event.id})"
            >
                Download Certificate
            </button>

        `;

        container.appendChild(card);
    });
}


/* ============================================================
   21. CERTIFICATE DOWNLOAD
   ============================================================ */

function downloadCertificate(eventId) {

    const event =
        events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    const certificateText = `

CAMPUSCONNECT
COLLEGE EVENT MANAGEMENT SYSTEM

CERTIFICATE OF PARTICIPATION

This certificate is proudly presented to

${currentUser?.name || "Student"}

for successfully participating in

${event.title}

${formatDate(event.date)}

Venue: ${event.venue}

--------------------------------

CampusConnect
College Event Management System

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
}


/* ============================================================
   22. DASHBOARD STATISTICS
   ============================================================ */

function updateDashboard() {

    const registeredCount =
        document.getElementById(
            "registeredCount"
        );

    if (registeredCount) {

        registeredCount.textContent =
            registeredEvents.length;
    }


    const attendedCount =
        document.getElementById(
            "attendanceCount"
        );

    if (attendedCount) {

        attendedCount.textContent =
            attendance.length;
    }


    const certificateCount =
        document.getElementById(
            "certificateCount"
        );

    if (certificateCount) {

        certificateCount.textContent =
            certificates.length;
    }


    const eventCount =
        document.getElementById(
            "eventCount"
        );

    if (eventCount) {

        eventCount.textContent =
            events.length;
    }
}


/* ============================================================
   23. EVENT REMINDER
   ============================================================ */

function createEventReminder(eventId) {

    const event =
        events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    addNotification(
        "Event Reminder",
        `${event.title} is scheduled for ${formatDate(event.date)} at ${event.time}.`
    );

    alert(
        `Reminder set for ${event.title}`
    );
}


/* ============================================================
   24. BOOKMARK EVENT
   ============================================================ */

let bookmarkedEvents =
    JSON.parse(
        localStorage.getItem("campusBookmarkedEvents")
    ) || [];


function toggleBookmark(eventId) {

    const index =
        bookmarkedEvents.indexOf(eventId);

    if (index === -1) {

        bookmarkedEvents.push(eventId);

        alert("Event bookmarked!");

    } else {

        bookmarkedEvents.splice(index, 1);

        alert("Event removed from bookmarks.");
    }

    localStorage.setItem(
        "campusBookmarkedEvents",
        JSON.stringify(bookmarkedEvents)
    );
}


/* ============================================================
   25. FORMAT DATE
   ============================================================ */

function formatDate(dateString) {

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* ============================================================
   26. PROFILE EDIT
   ============================================================ */

function editProfile() {

    if (!currentUser) {
        return;
    }

    const newName =
        prompt(
            "Enter your name:",
            currentUser.name
        );

    if (!newName) {
        return;
    }

    currentUser.name =
        newName.trim();

    saveData();

    displayProfile();

    updateNavigation();

    alert("Profile updated successfully!");
}


/* ============================================================
   27. NOTIFICATION SETTINGS
   ============================================================ */

let notificationSettings =
    JSON.parse(
        localStorage.getItem(
            "campusNotificationSettings"
        )
    ) || {

        eventReminders: true,

        registrationUpdates: true,

        certificates: true
    };


function toggleNotificationSetting(setting) {

    notificationSettings[setting] =
        !notificationSettings[setting];

    localStorage.setItem(
        "campusNotificationSettings",
        JSON.stringify(notificationSettings)
    );

    alert(
        `${setting} notifications ${
            notificationSettings[setting]
            ? "enabled"
            : "disabled"
        }.`
    );
}


/* ============================================================
   28. MOBILE MENU
   ============================================================ */

function toggleMobileMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("active");
}


/* ============================================================
   29. CLOSE MODALS
   ============================================================ */

function closeModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.style.display = "none";
}


/* ============================================================
   30. OPEN MODAL
   ============================================================ */

function openModal(modalId) {

    const modal =
        document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.style.display = "flex";
}


/* ============================================================
   31. ADMIN - ADD EVENT
   ============================================================ */

function addEvent(event) {

    if (event) {
        event.preventDefault();
    }

    const title =
        document.getElementById("newEventTitle")?.value.trim();

    const category =
        document.getElementById("newEventCategory")?.value;

    const date =
        document.getElementById("newEventDate")?.value;

    const time =
        document.getElementById("newEventTime")?.value;

    const venue =
        document.getElementById("newEventVenue")?.value.trim();

    const seats =
        Number(
            document.getElementById("newEventSeats")?.value
        );

    if (
        !title ||
        !category ||
        !date ||
        !time ||
        !venue ||
        !seats
    ) {

        alert(
            "Please fill all event details."
        );

        return;
    }

    const newEvent = {

        id:
            events.length > 0
            ? Math.max(
                ...events.map(event => event.id)
            ) + 1
            : 1,

        title: title,

        category: category,

        date: date,

        time: time,

        endTime: time,

        venue: venue,

        organizer: "College Administration",

        seats: seats,

        registered: 0,

        price: "Free",

        description:
            "New college event.",

        image:
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
    };

    events.push(newEvent);

    saveData();

    displayEvents();

    alert(
        `${title} has been added successfully!`
    );

    addNotification(
        "New Event Added",
        `${title} is now available for registration.`
    );
}


/* ============================================================
   32. ADMIN - DELETE EVENT
   ============================================================ */

function deleteEvent(eventId) {

    const index =
        events.findIndex(
            event => event.id === eventId
        );

    if (index === -1) {
        return;
    }

    const event =
        events[index];

    const confirmDelete =
        confirm(
            `Delete "${event.title}"?`
        );

    if (!confirmDelete) {
        return;
    }

    events.splice(index, 1);

    registeredEvents =
        registeredEvents.filter(
            id => id !== eventId
        );

    attendance =
        attendance.filter(
            id => id !== eventId
        );

    certificates =
        certificates.filter(
            id => id !== eventId
        );

    saveData();

    displayEvents();

    updateDashboard();

    alert(
        "Event deleted successfully."
    );
}


/* ============================================================
   33. SORT EVENTS
   ============================================================ */

function sortEvents(option) {

    let sortedEvents =
        [...events];

    if (option === "date") {

        sortedEvents.sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );
    }

    if (option === "name") {

        sortedEvents.sort(
            (a, b) =>
                a.title.localeCompare(
                    b.title
                )
        );
    }

    if (option === "popular") {

        sortedEvents.sort(
            (a, b) =>
                b.registered -
                a.registered
        );
    }

    displayEvents(sortedEvents);
}


/* ============================================================
   34. USER PROFILE INITIALS
   ============================================================ */

function getInitials(name) {

    if (!name) {
        return "S";
    }

    return name
        .split(" ")
        .map(word =>
            word.charAt(0)
        )
        .join("")
        .substring(0, 2)
        .toUpperCase();
}


function updateUserAvatar() {

    if (!currentUser) {
        return;
    }

    const avatars =
        document.querySelectorAll(
            "[data-user-avatar]"
        );

    avatars.forEach(avatar => {

        avatar.textContent =
            getInitials(
                currentUser.name
            );
    });
}


/* ============================================================
   35. CLASH DETECTION DISPLAY
   ============================================================ */

function showScheduleClashes() {

    const clashes = [];

    const myEvents =
        events.filter(event =>
            registeredEvents.includes(event.id)
        );

    for (let i = 0; i < myEvents.length; i++) {

        for (
            let j = i + 1;
            j < myEvents.length;
            j++
        ) {

            if (
                myEvents[i].date ===
                myEvents[j].date
            ) {

                clashes.push({
                    first: myEvents[i],
                    second: myEvents[j]
                });
            }
        }
    }

    if (clashes.length === 0) {

        alert(
            "✓ No schedule clashes detected."
        );

        return;
    }

    let message =
        "⚠ Schedule Clash Detected:\n\n";

    clashes.forEach(clash => {

        message +=
            `${clash.first.title}\n` +
            `and\n` +
            `${clash.second.title}\n\n`;
    });

    alert(message);
}


/* ============================================================
   36. CLEAR ALL DATA
   ============================================================ */

function resetApplication() {

    const confirmation =
        confirm(
            "This will delete all demo data. Continue?"
        );

    if (!confirmation) {
        return;
    }

    localStorage.clear();

    location.reload();
}


/* ============================================================
   37. INITIALIZE APPLICATION
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "CampusConnect loaded successfully."
        );

        updateNavigation();

        updateUserAvatar();

        displayEvents();

        displayRegisteredEvents();

        displayNotifications();

        displayCertificates();

        displayProfile();

        updateDashboard();

        updateNotificationCount();

        /* Search */

        const searchInput =
            document.getElementById(
                "eventSearch"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchEvents
            );
        }


        /* Login */

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


        /* Event filter buttons */

        const categoryButtons =
            document.querySelectorAll(
                "[data-category]"
            );

        categoryButtons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    filterCategory(
                        this.dataset.category
                    );
                }
            );
        });


        /* Logout buttons */

        const logoutButtons =
            document.querySelectorAll(
                "[data-logout]"
            );

        logoutButtons.forEach(button => {

            button.addEventListener(
                "click",
                logoutUser
            );
        });


        /* Navigation buttons */

        const navigationButtons =
            document.querySelectorAll(
                "[data-page-link]"
            );

        navigationButtons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    showPage(
                        this.dataset.pageLink
                    );
                }
            );
        });


        /* Notification count */

        updateNotificationCount();
    }
);


/* ============================================================
   38. AUTO EVENT REMINDER CHECK
   ============================================================ */

function checkEventReminders() {

    if (!currentUser) {
        return;
    }

    const today =
        new Date();

    events.forEach(event => {

        if (
            !registeredEvents.includes(
                event.id
            )
        ) {
            return;
        }

        const eventDate =
            new Date(event.date);

        const difference =
            Math.ceil(
                (
                    eventDate -
                    today
                ) /
                (1000 * 60 * 60 * 24)
            );

        if (difference === 1) {

            addNotification(
                "Event Tomorrow",
                `${event.title} is scheduled tomorrow at ${event.time}.`
            );
        }
    });
}


/* ============================================================
   39. RUN REMINDER CHECK
   ============================================================ */

setTimeout(
    checkEventReminders,
    2000
);


/* ============================================================
   40. MAKE FUNCTIONS AVAILABLE TO HTML
   ============================================================ */

window.loginUser =
    loginUser;

window.logoutUser =
    logoutUser;

window.showPage =
    showPage;

window.searchEvents =
    searchEvents;

window.filterCategory =
    filterCategory;

window.openEventDetails =
    openEventDetails;

window.registerForEvent =
    registerForEvent;

window.displayRegisteredEvents =
    displayRegisteredEvents;

window.markAttendance =
    markAttendance;

window.scanQR =
    scanQR;

window.displayNotifications =
    displayNotifications;

window.markNotificationRead =
    markNotificationRead;

window.markAllNotificationsRead =
    markAllNotificationsRead;

window.displayProfile =
    displayProfile;

window.editProfile =
    editProfile;

window.generateCertificate =
    generateCertificate;

window.downloadCertificate =
    downloadCertificate;

window.createEventReminder =
    createEventReminder;

window.toggleBookmark =
    toggleBookmark;

window.toggleNotificationSetting =
    toggleNotificationSetting;

window.toggleMobileMenu =
    toggleMobileMenu;

window.closeModal =
    closeModal;

window.openModal =
    openModal;

window.addEvent =
    addEvent;

window.deleteEvent =
    deleteEvent;

window.sortEvents =
    sortEvents;

window.showScheduleClashes =
    showScheduleClashes;

window.resetApplication =
    resetApplication;