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
  }
  
  renderCharacterSite();
  