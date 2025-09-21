const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggle-password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

const requirements = {
  lower: /[a-z]/,
  upper: /[A-Z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
  length: /.{8,}/
};

const commonPasswords = [
  "password", "password123", "12345678", "qwerty", "admin",
  "welcome", "abc123", "iloveyou", "111111", "letmein"
];

function hasRepetition(password) {
  return /(.)\1{2,}/.test(password);
}

function hasSequence(password) {
  const seq = "abcdefghijklmnopqrstuvwxyz0123456789";
  const passLower = password.toLowerCase();
  for (let i = 0; i < passLower.length - 2; i++) {
    if (seq.includes(passLower.substring(i, i + 3))) {
      return true;
    }
  }
  return false;
}

function calculateScore(password) {
  let score = 0;

  Object.keys(requirements).forEach(key => {
    const li = document.getElementById(key);
    if (requirements[key].test(password)) {
      li.classList.add("valid");
      score += 10;
    } else {
      li.classList.remove("valid");
    }
  });

  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  if (hasRepetition(password)) score -= 15;
  if (hasSequence(password)) score -= 15;

  if (commonPasswords.includes(password.toLowerCase())) score = 0;

  return Math.max(score, 0);
}

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  let score = calculateScore(password);

  const maxScore = 70;
  const strengthPercent = (score / maxScore) * 100;
  strengthBar.style.width = strengthPercent + "%";

  if (strengthPercent <= 30) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Strength: Weak";
  } else if (strengthPercent <= 60) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Strength: Medium";
  } else {
    strengthBar.style.background = "green";
    strengthText.textContent = "Strength: Strong";
  }
});

toggleBtn.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type");
  if (type === "password") {
    passwordInput.setAttribute("type", "text");
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.setAttribute("type", "password");
    toggleBtn.textContent = "Show";
  }
});
