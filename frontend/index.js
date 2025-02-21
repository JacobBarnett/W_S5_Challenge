async function sprintChallenge5() {
  // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // 🧠 Use Axios to GET learners and mentors.
  const getLearners = async () => {
    const response = await axios.get("http://localhost:3003/api/learners");
    return response.data;
  };

  const getMentors = async () => {
    const response = await axios.get("http://localhost:3003/api/mentors");
    return response.data;
  };

  // 🧠 Ensure learners and mentors are fetched correctly
  const fetchData = async () => {
    try {
      // Wait for both API calls to resolve
      const mentors = await getMentors();
      const learners = await getLearners();

      if (!Array.isArray(learners) || !Array.isArray(mentors)) {
        throw new Error("The API response did not return valid data.");
      }

      // Process the learners data
      const processedLearners = learners.map((learner) => {
        const mentorIds = learner.mentorIds || []; // Default to empty array if undefined
        const mentorNames = mentorIds
          .map((mentorId) => {
            const mentor = mentors.find((m) => m.id === mentorId);
            return mentor ? mentor.fullName : null;
          })
          .filter((name) => name !== null); // Filter out null values

        return {
          id: learner.id,
          fullName: learner.fullName,
          email: learner.email,
          mentors: mentorNames,
        };
      });

      console.log("Processed Learners:", processedLearners); // Log to see the result

      // You can now use `processedLearners` further (e.g., render to DOM or return it)
      return processedLearners;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  test("learners have mentors correctly mapped", async () => {
    // Wait for processed learners to be returned from fetchData
    const processedLearners = await fetchData();

    const expectedLearners = [
      {
        id: 6,
        fullName: "Bob Johnson",
        email: "bob.johnson@example.com",
        mentors: ["Bill Gates", "Grace Hopper"],
      },
      // Add other expected learners here as needed
    ];

    // Use toEqual to compare the actual data and expected data
    expect(processedLearners).toEqual(expectedLearners);
  });

  // Call fetchData to ensure that learners and mentors are correctly defined
  fetchData();

  // If you need to call `fetchData` in a test case, you can do something like this:
  // fetchData().then(processedLearners => { ... });
  // Or if it's an async test, use `await` in the test case itself

  // 👇 ==================== TASK 3 ==================== 👇

  const cardsContainer = document.querySelector(".cards");
  const info = document.querySelector(".info");
  info.textContent = "No learner is selected";

  const learners = await fetchData();

  // Loop over each learner object
  for (let learner of learners) {
    const card = document.createElement("div"); // Create a card div for each learner
    card.classList.add("card"); // Add 'card' class to the div

    const heading = document.createElement("h3"); // Create the h3 for the learner's full name
    heading.classList.add("learner-name"); // Add class for styling
    heading.textContent = learner.fullName; // Set the textContent to the learner's full name

    const email = document.createElement("div"); // Create a div for the learner's email
    email.classList.add("learner-email"); // Add class for styling
    email.textContent = learner.email; // Set the textContent to the learner's email

    const mentorsHeading = document.createElement("h4"); // Create an h4 for mentors list heading
    mentorsHeading.classList.add("mentors-heading"); // Add class for styling
    mentorsHeading.textContent = "Mentors"; // Set the text content to "Mentors"

    const mentorsList = document.createElement("ul"); // Create a list to hold mentor names
    mentorsList.classList.add("mentors-list"); // Add class for styling

    // Loop over each mentor name and create a list item for each
    for (let mentor of learner.mentors) {
      const mentorItem = document.createElement("li"); // Create a list item for each mentor
      mentorItem.classList.add("mentor-item"); // Add class for styling
      mentorItem.textContent = mentor; // Set the text content to the mentor's name
      mentorsList.appendChild(mentorItem); // Append each mentor item to the mentor list
    }

    // Append all elements to the card div
    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);

    // Append the card to the container
    cardsContainer.appendChild(card);

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
