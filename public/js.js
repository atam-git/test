document.getElementById("colorBtn").addEventListener("click", function () {
  // Generate random RGB values
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Set the background color
  document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
});
