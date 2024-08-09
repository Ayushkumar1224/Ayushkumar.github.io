// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const showHideButton = document.querySelector(".show-hide");
  const commentWrapper = document.querySelector(".comment-wrapper");

  // Function to toggle the visibility of the comments section
  function toggleComments() {
    const isHidden = commentWrapper.style.display === "none";

    // Toggle the display
    commentWrapper.style.display = isHidden ? "block" : "none";

    // Update button text and aria-expanded attribute
    showHideButton.textContent = isHidden ? "Hide comments" : "Show comments";
    showHideButton.setAttribute("aria-expanded", isHidden ? "true" : "false");
  }

  // Initially hide the comments section
  commentWrapper.style.display = "none";
  showHideButton.setAttribute("aria-expanded", "false");

  // Event listener for click event on the button
  showHideButton.addEventListener("click", toggleComments);

  // Make the button keyboard accessible
  showHideButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent default space/enter behavior
      toggleComments();
    }
  });
});
