import { getCharacters, postCharacter } from "./service.js";

function renderCharacterSite() {
  const bodyElement = document.getElementById("body");

  const mainContainerElement = document.createElement("section");
  mainContainerElement.id = "fullPageContainer";
  bodyElement.appendChild(mainContainerElement);

  const navbarContainerElement = document.createElement("header");
  navbarContainerElement.id = "navbar";

  mainContainerElement.appendChild(navbarContainerElement);

  const logoContainerElement = document.createElement("article");
  logoContainerElement.id = "logoBar";

  navbarContainerElement.appendChild(logoContainerElement);

  const logoImageElement = document.createElement("img");
  logoImageElement.id = "logo";
  logoImageElement.src = "./logoplaceholder.png";
  logoImageElement.alt = "Site Logo";

  logoContainerElement.appendChild(logoImageElement);

  const navbarListElement = document.createElement("ul");
  navbarListElement.id = "navLinkList";
  navbarContainerElement.appendChild(navbarListElement);

  const archiveListItemElement = document.createElement("li");
  navbarListElement.appendChild(archiveListItemElement);

  const archiveLinkElement = document.createElement("a");
  archiveLinkElement.textContent = "Archive";
  archiveLinkElement.href = "./archive.html";
  archiveListItemElement.appendChild(archiveLinkElement);

  const authorListItemElement = document.createElement("li");
  navbarListElement.appendChild(authorListItemElement);

  const authorLinkElement = document.createElement("a");
  authorLinkElement.textContent = "About the Author";
  authorLinkElement.href = "./author.html";
  authorListItemElement.appendChild(authorLinkElement);

  const characterListItemElement = document.createElement("li");
  navbarListElement.appendChild(characterListItemElement);

  const characterLinkElement = document.createElement("a");
  characterLinkElement.textContent = "Characters";
  characterLinkElement.href = "./characters.html";
  characterListItemElement.appendChild(characterLinkElement);

  const comicListItemElement = document.createElement("li");
  navbarListElement.appendChild(comicListItemElement);

  const comicLinkElement = document.createElement("a");
  comicLinkElement.textContent = "Read the Comic";
  comicLinkElement.href = "./index.html";
  comicListItemElement.appendChild(comicLinkElement);

  const scrollContainerElement = document.createElement("div");
  scrollContainerElement.id = "scrollableContainer";
  mainContainerElement.appendChild(scrollContainerElement);

  renderCharacterTable();
}

async function renderCharacterTable() {
  const scrollContainerElement = document.getElementById("scrollableContainer");

  const charTableElement = document.createElement("table");
  charTableElement.id = "charTable";

  scrollContainerElement.appendChild(charTableElement);

  const tableHeaderRowElement = document.createElement("tr");
  tableHeaderRowElement.id = "charTableHeader";

  charTableElement.appendChild(tableHeaderRowElement);

  const tableHeaderEntryElement = document.createElement("th");
  tableHeaderEntryElement.id = "tableHeaderEntry";
  tableHeaderEntryElement.textContent = "Characters:";

  tableHeaderRowElement.appendChild(tableHeaderEntryElement);

  const charArray = await getCharacters();

  charArray.forEach((character) => {
    const charRowElement = document.createElement("tr");
    charRowElement.classList.add("charRow");

    charTableElement.appendChild(charRowElement);

    const charEntryElement = document.createElement("td");
    charEntryElement.classList.add("charEntry");
    charEntryElement.textContent = character;

    charRowElement.appendChild(charEntryElement);
  });

  const tableFormRowElement = document.createElement("tr");
  tableFormRowElement.id = "charTableFormRow";

  charTableElement.appendChild(tableFormRowElement);

  const tableFormEntryElement = document.createElement("td");
  tableFormRowElement.appendChild(tableFormEntryElement);

  const addCharacterFormElement = document.createElement("form");
  addCharacterFormElement.id = "addCharForm";

  tableFormEntryElement.appendChild(addCharacterFormElement);

  const addCharInputElement = document.createElement("input");
  addCharInputElement.id = "addCharInput";

  addCharacterFormElement.appendChild(addCharInputElement);

  const addCharSubmitElement = document.createElement("input");
  addCharSubmitElement.type = "submit";
  addCharSubmitElement.id = "addCharSubmit";
  addCharSubmitElement.value = "Add Character";

  addCharacterFormElement.appendChild(addCharSubmitElement);

  addCharacterFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    await postCharacter(addCharInputElement.value.trim());

    addCharInputElement.value = "";

    scrollContainerElement.replaceChildren();
    renderCharacterSite();
  });
}

renderCharacterSite();
