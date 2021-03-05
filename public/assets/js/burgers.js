// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // UPDATE
  const changeDevouredBtns = document.querySelectorAll(".change-devoured");

  // Set up the event listener for the create button
  if (changeDevouredBtns) {
    changeDevouredBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const newEats = e.target.getAttribute("data-newdevoured");

        const newDevouredstate = {
          devoured: newEats,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newDevouredstate),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devoured to: ${newEats}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  // CREATE
  const createBurgBtn = document.getElementById("create-form");

  if (createBurgBtn) {
    createBurgBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurg = {
        burger_name: document.getElementById("bu").value.trim(),
        devoured: document.getElementById("devoured").checked,
      };

      // Send POST request to create a new quote
      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurg),
      }).then(() => {
        // Empty the form
        document.getElementById("bu").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new Burger!");
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgBtns = document.querySelectorAll(".delete-burger");

  // Set up the event listeners for each delete button
  deleteBurgBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});
