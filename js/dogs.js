document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("dogsGallery");
  const dogModal = document.getElementById("dogModal");
  const modalClose = document.getElementById("modalClose");
  const dogNameEl = document.getElementById("dogName");
  const dogBioEl = document.getElementById("dogBio");
  const dogPressLinksEl = document.getElementById("dogPressLinks");

  // NEW: Read data-dogs attribute to decide how many dogs to display
  const limitAttr = gallery?.getAttribute("data-dogs");
  const limit = limitAttr ? parseInt(limitAttr, 10) : null;

  let dogsData = [];

  // 1) Fetch the CSV with the dog info
  fetch("dogs.csv")
    .then(response => response.text())
    .then(csvText => {
      dogsData = parseDogsCSV(csvText);

      // If we have a valid limit > 0, shuffle and then slice the array
      if (limit && limit > 0 && dogsData.length > limit) {
        dogsData.sort(() => Math.random() - 0.5); // Shuffle
        dogsData = dogsData.slice(0, limit);      // Take only 'limit' dogs
      }

      // Build the gallery on the page
      if (gallery && dogsData.length > 0) {
        gallery.innerHTML = ""; // Clear any existing items
        dogsData.forEach((dog, index) => {
          const item = document.createElement("div");
          item.classList.add("gallery-item", "pop-button");
          item.style.backgroundImage = `url(${dog.image})`;
          item.innerHTML = `
           
            <h3>${dog.name}</h3>
          `;
          // On click, open modal
          item.addEventListener("click", () => openDogModal(index));
          gallery.appendChild(item);
        });
      }
    })
    .catch(err => console.error("Error loading dogs.csv:", err));

  // -------------------------
  // 2) Modal Functions
  // -------------------------

  let currentDogIndex = 0; // Track the currently displayed dog

  function openDogModal(index) {
    currentDogIndex = index; // Update the current dog index
    const dog = dogsData[index];

    const dogImageEl = document.getElementById("dogImage");
    dogImageEl.src = dog.image || "images/default-dog.jpg"; // Use a default if none provided
    dogImageEl.alt = dog.name || "Dog Image";

    dogNameEl.textContent = dog.name || "";
    dogBioEl.textContent = dog.bio || "";

    // Press Links if any
    dogPressLinksEl.innerHTML = "";
    if (dog.pressLinks && dog.pressLinks.length > 0) {
      const list = document.createElement("ul");
      dog.pressLinks.forEach(link => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link}" class="pop-button" target="_blank">${dog.name}'s Story</a>`;
        list.appendChild(li);
      });
      dogPressLinksEl.appendChild(list);
    }

    dogModal.classList.add("active");
  }

  // Navigate to the previous dog
  function showPreviousDog() {
    if (currentDogIndex > 0) {
      currentDogIndex--;
      openDogModal(currentDogIndex);
    }
  }

  // Navigate to the next dog
  function showNextDog() {
    if (currentDogIndex < dogsData.length - 1) {
      currentDogIndex++;
      openDogModal(currentDogIndex);
    }
  }

  // Add event listeners for navigation buttons
  document.getElementById("prevDog").addEventListener("click", showPreviousDog);
  document.getElementById("nextDog").addEventListener("click", showNextDog);

  modalClose.addEventListener("click", () => {
    dogModal.classList.remove("active");
  });

  // Close if clicked outside modal content
  dogModal.addEventListener("click", event => {
    if (event.target === dogModal) {
      dogModal.classList.remove("active");
    }
  });

  // -------------------------
  // 3) Fetch Press Links from press-links.csv
  // -------------------------
  const pressLinksList = document.getElementById("pressLinksList");
  if (pressLinksList) {
    fetch("press-links.csv")
      .then(response => response.text())
      .then(csvText => {
        const links = parsePressLinksCSV(csvText);

        if (links.length > 0) {
          const ul = document.createElement("ul");
          links.forEach(link => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${link.url}" class="pop-button" target="_blank">${link.text}</a>`;
            ul.appendChild(li);
          });
          pressLinksList.appendChild(ul);
        } else {
          pressLinksList.textContent = "No press links available.";
        }
      })
      .catch(err => {
        console.error("Error fetching press-links.csv:", err);
        pressLinksList.textContent = "Unable to load press links.";
      });
  }
});

/**
 * Simple CSV parser for dog data:
 * Expects columns: name, bio, image, pressLinks
 * pressLinks can be semicolon-separated
 */
function parseDogsCSV(csvText) {
  const lines = csvText.split("\n").map(l => l.trim()).filter(l => l);
  // Remove header row
  lines.shift(); // assume first line is a header

  let results = [];

  lines.forEach(line => {
    const columns = parseCSVLine(line);

    const name = columns[0] || "";
    const bio = columns[1] || "";
    const image = columns[2] || "images/default-dog.jpg";
    const pressLinksRaw = columns[3] || "";

    let pressLinks = [];
    if (pressLinksRaw) {
      pressLinks = pressLinksRaw.split(";").map(link => link.trim()).filter(l => l);
    }

    results.push({
      name,
      bio,
      image,
      pressLinks
    });
  });

  return results;
}

/**
 * Simple CSV parser for press links:
 * Expects columns: url,text
 */
function parsePressLinksCSV(csvText) {
  const lines = csvText.split("\n").map(l => l.trim()).filter(l => l);
  // Remove header row
  lines.shift(); // assume first line is a header

  return lines.map(line => {
    const [url, text] = line.split(",", 2);
    return { url: url.trim(), text: text.trim() };
  });
}

/**
 * A simplified CSV line parser to handle
 * quoted vs. unquoted fields.
 */
function parseCSVLine(line) {
  let result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  // Add the last column
  if (current) {
    result.push(current.trim());
  }

  // Remove surrounding quotes, if any
  return result.map(val => {
    if (val.startsWith('"') && val.endsWith('"')) {
      return val.slice(1, -1);
    }
    return val;
  });
}