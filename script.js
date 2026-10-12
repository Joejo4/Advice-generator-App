const API_URL = "https://api.adviceslip.com/advice";

const adviceIdEl = document.getElementById("advice-id");
const adviceTextEl = document.getElementById("advice-text");
const diceBtn = document.getElementById("dice-btn");

// Separate render function (uses safe textContent)
function render(slip) {
  adviceIdEl.textContent = slip.id;
  adviceTextEl.textContent = `"${slip.advice}"`;
}

// Fetching function handling loading, success, and error states
async function getAdvice() {
  // Loading state: disable button and show feedback
  diceBtn.disabled = true;
  adviceTextEl.textContent = '"Loading advice..."';

  try {
    const res = await fetch(`${API_URL}?t=${Date.now()}`);

    // Check response.ok manually since fetch doesn't throw on 404/500
    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    const data = await res.json();
    render(data.slip);
  } catch (err) {
    console.error("Error fetching advice:", err);
    adviceTextEl.textContent =
      '"An error occurred. Please check your connection and try again."';
  } finally {
    // Re-ensure the button is always re-enabled
    diceBtn.disabled = false;
  }
}

// Event listener for button click
diceBtn.addEventListener("click", getAdvice);

// Fetch advice immediately on page load
getAdvice();
