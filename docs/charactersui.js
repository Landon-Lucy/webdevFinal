import {
  getCharacterDescriptions,
  getCharacters,
  postCharacter,
  postCharacterDescription,
} from "./service.js";

function renderCharacterSite() {
  const bodyElement = document.getElementById("body");
  bodyElement.replaceChildren();
  
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
  logoImageElement.src = "./LOGO__-removebg-preview.png";
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

  const dropBoxElement = document.createElement("div");
  dropBoxElement.id = "dropBoxOne";
  dropBoxElement.textContent = "Drop Characters Here"
  dropBoxElement.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });
  dropBoxElement.addEventListener("drop", (ev) => {
    ev.preventDefault();
    dropBoxElement.textContent = ev.dataTransfer.getData("text");
    updateDescriptionBox();
  });

  scrollContainerElement.appendChild(dropBoxElement);

  const descriptionBoxElement = document.createElement("div");
  descriptionBoxElement.id = "descriptionBox";

  scrollContainerElement.appendChild(descriptionBoxElement);
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
    charRowElement.draggable = "true";
    charRowElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.textContent);
    });

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

async function updateDescriptionBox() {
  const dropBoxElement = document.getElementById("dropBoxOne");
  const characterName = dropBoxElement.textContent;

  const descriptionBoxElement = document.getElementById("descriptionBox");

  const descriptionsArray = await getCharacterDescriptions();

  const correctDescriptionsEntry = descriptionsArray.find((arrayItem) => {
    if (arrayItem.charName === characterName) {
      return true;
    } else return false;
  });

  descriptionBoxElement.replaceChildren();
  descriptionBoxElement.textContent = "";

  if (correctDescriptionsEntry === undefined) {
    const descriptionFormElement = document.createElement("form");
    descriptionFormElement.id = "descriptionForm";

    descriptionBoxElement.appendChild(descriptionFormElement);

    const descriptionInputElement = document.createElement("input");
    descriptionInputElement.id = "descriptionFormInput";

    descriptionFormElement.appendChild(descriptionInputElement);

    const descriptionSubmitElement = document.createElement("input");
    descriptionSubmitElement.type = "submit";
    descriptionSubmitElement.id = "descriptionSubmitButton";
    descriptionSubmitElement.value = "Submit Description";

    descriptionFormElement.appendChild(descriptionSubmitElement);

    descriptionFormElement.addEventListener("submit", async (e) => {
      e.preventDefault();

      await postCharacterDescription(
        characterName,
        descriptionInputElement.value
      );

      descriptionBoxElement.replaceChildren();
      descriptionBoxElement.textContent = descriptionInputElement.value;
    });
  } else {
    const correctDescription = correctDescriptionsEntry.charDescription;
    descriptionBoxElement.textContent = String(correctDescription);
  }
}

renderCharacterSite();
