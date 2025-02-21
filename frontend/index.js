async function sprintChallenge5() {
  // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  const getLearners = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/learners");
      // Ensure that response.data is an array, if not, return an empty array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching learners:", error);
      return []; // Return an empty array if there's an error
    }
  };

  const getMentors = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/mentors");
      // Ensure that response.data is an array, if not, return an empty array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching mentors:", error);
      return []; // Return an empty array if there's an error
    }
  };

  // We need to await both getLearners and getMentors and assign the results to variables
  const mentors = await getMentors(); // Fix this: fetching mentors data
  const learners = await getLearners(); // Fix this: fetching learners data

  // Check if both learners and mentors are valid arrays
  if (!Array.isArray(learners) || !Array.isArray(mentors)) {
    console.error("Data fetched is not in the expected format.");
    return; // Exit early if either is not an array
  }

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // At this point, the learner objects only have the mentors' IDs.
  // We need to replace the mentor IDs with the mentor names.

  const combinedLearners = learners.map((learner) => {
    // Make sure mentorIds exists and is an array
    const mentorIds = Array.isArray(learner.mentorIds) ? learner.mentorIds : [];

    const mentorNames = mentorIds
      .map((mentorId) => {
        const mentor = mentors.find((m) => m.id === mentorId);
        return mentor ? mentor.fullName : null;
      })
      .filter(Boolean); // Filter out any null values (in case some mentorIds are invalid)

    return {
      id: learner.id,
      fullName: learner.fullName,
      email: learner.email,
      mentors: mentorNames,
    };
  });

  console.log('Mentor names for learner', learner.fullName, mentorNames);


  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector(".cards");
  const info = document.querySelector(".info");
  info.textContent = "No learner is selected";

  // 👇 ==================== TASK 3 START ==================== 👇

  // Loop through the combined learners and create the DOM elements
  for (let learner of combinedLearners) {
    const card = document.createElement("div");
    card.classList.add("card");

    const heading = document.createElement("h3");
    heading.classList.add("learner-name");
    heading.textContent = learner.fullName;

    const email = document.createElement("div");
    email.classList.add("learner-email");
    email.textContent = learner.email;

    const mentorsHeading = document.createElement("h4");
    mentorsHeading.classList.add("mentors-heading");
    mentorsHeading.textContent = "Mentors";

    const mentorsList = document.createElement("ul");
    mentorsList.classList.add("mentors-list");

    mentorsList.style.display = "none";

    // Loop through the mentors and create <li> elements for each mentor
    learner.mentors.forEach((mentor) => {
      const mentorItem = document.createElement("li");
      mentorItem.classList.add("mentor-item");
      mentorItem.textContent = mentor;
      mentorsList.appendChild(mentorItem);
    });

    // Append the elements to the card div
    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);

    card.addEventListener("click", (evt) => {
      const mentorsHeading = card.querySelector("h4");
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains("selected");
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll(".card").forEach((crd) => {
        crd.classList.remove("selected");
        crd.querySelector("h3").textContent = crd.dataset.fullName;
      });
      info.textContent = "No learner is selected";
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add("selected");
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add("selected");
        if (mentorsHeading.classList.contains("open")) {
          mentorsHeading.classList.replace("open", "closed");
        } else {
          mentorsHeading.classList.replace("closed", "open");
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      }
    });
  }

  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
