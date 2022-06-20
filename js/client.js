const socket = io("http://localhost:8000");

// Getting DOM Elements
const sendMsgForm = document.getElementById("sendMsgForm");
const messageInput = document.getElementById("msgInput");
const messageContainer = document.querySelector(".container");

// Notifcation(Ting.mp3) Audio
var audio = new Audio("Ting.mp3");

// Creating append() Function To Append Messages in Container
const append = (message, position) => {
  // Creating a div To Show Message
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  // Adding Class To The div
  messageElement.classList.add("message");
  // Adding Postion Class To The div
  messageElement.classList.add(position);
  // Appending Message into The Container
  messageContainer.append(messageElement);

  // Playing Notification Sound if Position is Left
  if (position == "left") {
    audio.play();
  }
};

// Getting Name From The User
const name = prompt("Enter Your Name To Join");
socket.emit("newUserJoined", name);

// Creating userJoined Event
socket.on("userJoined", (name) => {
  append(`${name} Joined The Chat...`, "left");
});

// Creating recieve Event
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

// Creating left Event
socket.on("left", (name) => {
  append(`${name} Left The Chat`, "left");
});

// Manipulating The sendMsgForm
sendMsgForm.addEventListener("submit", (e) => {
  // Stop Page Refresh on Submit
  e.preventDefault();
  // Getting Message Value
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  // Creating send Event
  socket.emit("send", message);
  // "" Input Field Value After Message Sent
  messageInput.value = "";
});
