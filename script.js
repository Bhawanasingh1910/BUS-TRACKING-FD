// Button functionality
const trackBtn = document.getElementById("trackBtn");

trackBtn.addEventListener("click", () => {
  alert("Redirecting to bus tracking dashboard...");
  window.location.href = "tracking.html"; // Example page
});



// Login form submit
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const role = this.querySelector('input[name="role"]:checked').value;

    if (email && password) {
      alert(`Logged in as ${email} (${role})`);
      // Redirect based on role
      if (role === "Commuter") {
        window.location.href = "commuter-dashboard.html";
      } else if (role === "Admin") {
        window.location.href = "admindashboard.html";
      }
    } else {
      alert("Please fill all fields");
    }
  });
}



// Signup form submit
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const role = this.querySelector('input[name="role"]:checked').value;

    if (name && email && password) {
      alert(`Signed up as ${name} (${role})`);
      // Redirect based on role
      if (role === "Commuter") {
        window.location.href = "commuter-dashboard.html";
      } else if (role === "Admin") {
        window.location.href = "admindashboard.html";
      }
    } else {
      alert("Please fill all fields");
    }
  });
}




// ============ Contact Form Handling ============
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    if (name && email && message) {
      alert(`Thank you ${name}, your message has been sent! ✅`);
      this.reset();
    } else {
      alert("⚠️ Please fill out all fields before submitting.");
    }
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.getElementById("voice-btn");

  // Voice Recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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

    if (command.includes("track bus")) {
      window.location.href = "dashboard.html";
    } else if (command.includes("home")) {
      window.location.href = "index.html";
    } else if (command.includes("notifications")) {
      window.location.href = "notifications.html";
    } else {
      alert("❌ Sorry, I didn’t understand: " + command);
    }
  });
});



// Sidebar toggle for mobile
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('#sidebar-toggle');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Logout confirmation
const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "indexlanding.html"; // redirect to login page
    }
  });
}



// Highlight active nav
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar-nav a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.style.background = "rgba(0,0,0,0.2)";
    }
  });
});

// Charts
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

// Export data as CSV
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




// Feedback page interactions

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  const searchBtn = document.querySelector(".search-btn");

  submitBtn.addEventListener("click", () => {
    alert("Lost item report submitted successfully ✅");
  });

  searchBtn.addEventListener("click", () => {
    alert("Searching found items...");
  });
});

