document.getElementById("todo-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const todoText = document.getElementById("todo-input").value;

  if (!todoText.trim()) {
    alert("Please enter some todos!");
    return;
  }

  // Show loading message
  document.getElementById("summary-output").innerText = "Summarizing...";

  try {
    // Replace with your backend endpoint
    const response = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: todoText }),
    });

    const data = await response.json();
    document.getElementById("summary-output").innerText = data.summary;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("summary-output").innerText = "Something went wrong. Try again later.";
  }
});