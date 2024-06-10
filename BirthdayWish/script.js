const surprise = document.getElementById("surprise");
const options = {
  colors: [
    "#FFC67D",
    "#8F0A1A",
    "#FF69B4",
    "#33CC33",
    "#66CCCC",
    "#FF99CC",
    "#CCCCFF",
  ],
};

surprise.addEventListener("mouseenter", () => {
  confetti(options);
});
surprise.addEventListener("touchstart", () => {
  confetti(options);
});
