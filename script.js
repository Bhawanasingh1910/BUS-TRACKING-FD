// ===== Signup Form Handling =====
// ===== Signup Form Handling =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();
    const role = this.querySelector('input[name="role"]:checked')?.value;

    if (!name || !email || !password || !role) {
      alert("Please fill all fields!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert("User with this email already exists!");
      return;
    }

    // Save new user
    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login after signup
    sessionStorage.setItem("loggedInUser", JSON.stringify(newUser));

    // Redirect based on role
    if (role === "Commuter") {
      window.location.href = "commuter.html";
    } else if (role === "Admin") {
      window.location.href = "admindashboard.html";
    }
  });
}

// ===== Login Form Handling =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    if (user.role === "Commuter") {
      window.location.href = "commuter.html";
    } else if (user.role === "Admin") {
      window.location.href = "admindashboard.html";
    }
  });
}

// ===== Logout Button =====
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    }
  });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector("textarea").value.trim();

    if (name && email && message) {
      alert(`Thank you ${name}, your message has been sent! ✅`);
      this.reset();
    } else {
      alert("⚠️ Please fill out all fields before submitting.");
    }
  });
}

// ===== Voice Recognition =====
document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.getElementById("voice-btn");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!voiceBtn || !SpeechRecognition) return;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  voiceBtn.addEventListener("click", () => {
    recognition.start();
    alert("🎤 Listening... Speak now!");
  });

  recognition.addEventListener("result", (e) => {
    const command = e.results[0][0].transcript.toLowerCase();
    console.log("You said:", command);

    if (command.includes("track bus")) window.location.href = "dashboard.html";
    else if (command.includes("home")) window.location.href = "index.html";
    else if (command.includes("notifications")) window.location.href = "notifications.html";
    else alert("❌ Sorry, I didn't understand: " + command);
  });
});

// ===== Sidebar Toggle =====
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('#sidebar-toggle');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
}

// ===== Highlight Active Nav =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sidebar-nav a").forEach(link => {
    if (link.href === window.location.href) link.style.background = "rgba(0,0,0,0.2)";
  });
});

// ===== Charts =====
function initCharts() {
  if (document.getElementById("passengerChart")) {
    const ctx1 = document.getElementById('passengerChart').getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['6AM','9AM','12PM','3PM','6PM','9PM'],
        datasets: [{
          label: 'Passengers',
          data: [120, 300, 200, 150, 400, 180],
          borderColor: '#2a6282',
          backgroundColor: 'rgba(42,98,130,0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  if (document.getElementById("routeChart")) {
    const ctx2 = document.getElementById('routeChart').getContext('2d');
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Route 101','Route 205','Route 307','Route 410'],
        datasets: [{
          label: 'Passengers',
          data: [450, 320, 280, 500],
          backgroundColor: ['#2a6282ea','#ff8000','#4da6ff','#2dd4bf']
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}
initCharts();

// ===== Export CSV =====
document.getElementById("exportBtn")?.addEventListener("click", () => {
  const csvData = "Route,Passengers\nRoute 101,450\nRoute 205,320\nRoute 307,280\nRoute 410,500";
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analytics.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// ===== Feedback =====
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  const searchBtn = document.querySelector(".search-btn");

  submitBtn?.addEventListener("click", () => alert("Lost item report submitted successfully ✅"));
  searchBtn?.addEventListener("click", () => alert("Searching found items..."));
});

// ===== Clear Notifications =====
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clear-notifications");
  const cardsContainer = document.querySelector(".cards");
  const feedback = document.getElementById("clear-success");

  clearBtn?.addEventListener("click", () => {
    if (cardsContainer) cardsContainer.innerHTML = "";
    if (feedback) {
      feedback.textContent = "All notifications cleared!";
      setTimeout(() => feedback.textContent = "", 3000);
    }
  });
});

// ===== Mark Complaints / Emergency as Resolved =====
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".mark-resolved");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr") || btn.closest(".item");
      if (!row) return;
      
      const statusCell = row.querySelector(".status-active, .status");
      if (statusCell) {
        statusCell.textContent = "Resolved";
        statusCell.classList.remove("status-active", "pending");
        statusCell.classList.add("status-resolved", "resolved");
      }
      btn.disabled = true;
      btn.textContent = "Resolved";
      if (row.classList.contains("item")) btn.remove();
    });
  });

  // Simple complaint search
  const searchInput = document.getElementById("complaint-search");
  const searchBtn = document.getElementById("search-btn");
  const complaintList = document.getElementById("complaint-list");

  searchBtn?.addEventListener("click", () => {
    if (!searchInput || !complaintList) return;
    const term = searchInput.value.toLowerCase();
    complaintList.querySelectorAll(".item").forEach(item => {
      const text = (item.querySelector(".item-title")?.textContent + item.querySelector(".item-sub")?.textContent).toLowerCase();
      item.style.display = text.includes(term) ? "flex" : "none";
    });
  });
});

// ===== Edit / Delete Routes =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".edit-route").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      alert(`Edit functionality for Route: ${row?.cells[1]?.textContent || "Unknown"}`);
    });
  });

  document.querySelectorAll(".delete-route").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      if (row && confirm(`Are you sure you want to delete Route: ${row.cells[1]?.textContent}?`)) {
        row.remove();
      }
    });
  });
});
