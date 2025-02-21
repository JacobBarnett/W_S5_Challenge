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
      console.log("Fetched learners:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching learners:", error);
      return []; // Return an empty array on error
    }
  };

  const getMentors = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/mentors");
      console.log("Fetched mentors:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching mentors:", error);
      return []; // Return an empty array on error
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
    console.log(`Processing Learner: ${learner.fullName}`);
    console.log("Learner mentor IDs:", learner.mentorIds); // Log mentor IDs to see what's happening

    const mentorIds = Array.isArray(learner.mentorIds) ? learner.mentorIds : [];
    if (mentorIds.length === 0) {
      console.log(`No mentor IDs found for Learner: ${learner.fullName}`);
    }

    const mentorNames = mentorIds
      .map((mentorId) => {
        const mentor = mentors.find((m) => m.id === mentorId);
        if (mentor) {
          console.log(
            `Found Mentor: ${mentor.fullName} for Learner: ${learner.fullName}`
          );
          return mentor.fullName;
        } else {
          console.log(
            `No Mentor found for Mentor ID: ${mentorId} (Learner: ${learner.fullName})`
          );
          return null;
        }
      })
      .filter(Boolean); // Filter out null values (if no mentor was found)

    // Add default if no mentors are found
    if (mentorNames.length === 0) {
      console.log(`Assigning default mentor for Learner: ${learner.fullName}`);
      mentorNames.push("No mentor");
    }

    console.log(`Final Mentors for ${learner.fullName}:`, mentorNames);

    console.log(
      `Number of mentors for ${learner.fullName}:`,
      mentorNames.length
    ); // Log mentor count

    return {
      id: learner.id,
      fullName: learner.fullName,
      email: learner.email,
      mentors: mentorNames, // Will contain either actual mentor names or ["No mentor"]
    };
  });

  console.log("Combined Learners with Mentors:", combinedLearners);
  console.log("Combined Learners with Mentors:", combinedLearners);
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
