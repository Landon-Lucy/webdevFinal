import {
  getSomethingFromAPI,
  storeFileOnApi,
  getBase64FileFromApi,
} from "./service.js";

function renderComicPageSite() {
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

  const centerContainerElement = document.createElement("article");
  centerContainerElement.id = "centerContainer";

  scrollContainerElement.appendChild(centerContainerElement);

  const leftSideElement = document.createElement("section");
  leftSideElement.id = "sideBarLeft";

  centerContainerElement.appendChild(leftSideElement);

  const leftListElement = document.createElement("ul");
  leftListElement.id = "leftLinkList";

  leftSideElement.appendChild(leftListElement);

  const leftListItem1Element = document.createElement("li");
  leftListElement.appendChild(leftListItem1Element);

  const leftListLink1Element = document.createElement("a");
  leftListLink1Element.textContent = "1";
  leftListLink1Element.href = "";
  leftListItem1Element.appendChild(leftListLink1Element);

  const leftListItem2Element = document.createElement("li");
  leftListElement.appendChild(leftListItem2Element);

  const leftListLink2Element = document.createElement("a");
  leftListLink2Element.textContent = "2";
  leftListLink2Element.href = "";
  leftListItem2Element.appendChild(leftListLink2Element);

  const leftListItem3Element = document.createElement("li");
  leftListElement.appendChild(leftListItem3Element);

  const leftListLink3Element = document.createElement("a");
  leftListLink3Element.textContent = "3";
  leftListLink3Element.href = "";
  leftListItem3Element.appendChild(leftListLink3Element);

  const leftListItem4Element = document.createElement("li");
  leftListElement.appendChild(leftListItem4Element);

  const leftListLink4Element = document.createElement("a");
  leftListLink4Element.textContent = "4";
  leftListLink4Element.href = "";
  leftListItem4Element.appendChild(leftListLink4Element);

  const comicContainerElement = document.createElement("section");
  comicContainerElement.id = "comicContainer";

  centerContainerElement.appendChild(comicContainerElement);

  const comicNavFormElement = document.createElement("form");
  comicNavFormElement.id = "comicNavigation";

  comicContainerElement.appendChild(comicNavFormElement);

  const firstPageButtonElement = document.createElement("input");
  firstPageButtonElement.type = "submit";
  firstPageButtonElement.name = "firstPage";
  firstPageButtonElement.id = "firstPage";
  firstPageButtonElement.value = "<<";

  comicNavFormElement.appendChild(firstPageButtonElement);

  const previousPageButtonElement = document.createElement("input");
  previousPageButtonElement.type = "submit";
  previousPageButtonElement.name = "previousPage";
  previousPageButtonElement.id = "previousPage";
  previousPageButtonElement.value = "<";

  comicNavFormElement.appendChild(previousPageButtonElement);

  const nextPageButtonElement = document.createElement("input");
  nextPageButtonElement.type = "submit";
  nextPageButtonElement.name = "nextPage";
  nextPageButtonElement.id = "nextPage";
  nextPageButtonElement.value = ">";

  comicNavFormElement.appendChild(nextPageButtonElement);

  const lastPageButtonElement = document.createElement("input");
  lastPageButtonElement.type = "submit";
  lastPageButtonElement.name = "lastPage";
  lastPageButtonElement.id = "lastPage";
  lastPageButtonElement.value = ">>";

  comicNavFormElement.appendChild(lastPageButtonElement);

  const comicImageElement = document.createElement("img");
  comicImageElement.src = "https://imgs.xkcd.com/comics/artifacts_2x.png";
  comicImageElement.alt = "placeholder";
  comicImageElement.id = "comicPage";

  comicContainerElement.appendChild(comicImageElement);

  const imageFormElement = SetupForm();

  comicContainerElement.appendChild(imageFormElement);

  const authorNoteElement = document.createElement("article");
  authorNoteElement.id = "authorNote";
  authorNoteElement.textContent = "Author note section";

  comicContainerElement.appendChild(authorNoteElement);

  const rightSideElement = document.createElement("section");
  rightSideElement.id = "sideBarRight";

  centerContainerElement.appendChild(rightSideElement);

  const rightListElement = document.createElement("ul");
  rightListElement.id = "rightLinkList";

  rightSideElement.appendChild(rightListElement);

  const rightListItem1Element = document.createElement("li");
  rightListElement.appendChild(rightListItem1Element);

  const rightListLink1Element = document.createElement("a");
  rightListLink1Element.textContent = "1";
  rightListLink1Element.href = "";
  rightListItem1Element.appendChild(rightListLink1Element);

  const rightListItem2Element = document.createElement("li");
  rightListElement.appendChild(rightListItem2Element);

  const rightListLink2Element = document.createElement("a");
  rightListLink2Element.textContent = "2";
  rightListLink2Element.href = "";
  rightListItem2Element.appendChild(rightListLink2Element);

  const rightListItem3Element = document.createElement("li");
  rightListElement.appendChild(rightListItem3Element);

  const rightListLink3Element = document.createElement("a");
  rightListLink3Element.textContent = "3";
  rightListLink3Element.href = "";
  rightListItem3Element.appendChild(rightListLink3Element);

  const rightListItem4Element = document.createElement("li");
  rightListElement.appendChild(rightListItem4Element);

  const rightListLink4Element = document.createElement("a");
  rightListLink4Element.textContent = "4";
  rightListLink4Element.href = "";
  rightListItem4Element.appendChild(rightListLink4Element);

  const commentContainerElement = document.createElement("article");
  commentContainerElement.id = "commentsContainer";

  scrollContainerElement.appendChild(commentContainerElement);

  const commentFormElement = document.createElement("form");
  commentFormElement.id = "commentEntryForm";

  commentContainerElement.appendChild(commentFormElement);

  const commentInputLabelElement = document.createElement("label");
  commentInputLabelElement.setAttribute("for", "commentTextInput");
  commentInputLabelElement.textContent = "Comment: ";

  commentFormElement.appendChild(commentInputLabelElement);

  const commentInputElement = document.createElement("input");
  commentInputElement.type = "text";
  commentInputElement.id = "commentTextInput";
  commentInputElement.placeholder = "Write a comment here!";

  commentFormElement.appendChild(commentInputElement);

  const commentSubmitElement = document.createElement("input");
  commentSubmitElement.type = "submit";

  commentFormElement.appendChild(commentSubmitElement);
}

const SetupForm = () => {
  const formElement = document.createElement("form");

  const fileUploadElement = document.createElement("input");
  fileUploadElement.type = "file";
  fileUploadElement.id = "fileUpload";
  formElement.appendChild(fileUploadElement);

  const fileSubmitElement = document.createElement("input");
  fileSubmitElement.type = "submit";
  formElement.appendChild(fileSubmitElement);

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileUploadElement.files[0];
    console.log(file);

    async function getBase64(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
          reject(error);
        };
      });
    }

    const base64File = await getBase64(file);
    await storeFileOnApi(base64File);

    const stringFromApi = await getBase64FileFromApi();
    const comicPageElement = document.getElementById("comicPage");
    comicPageElement.src = stringFromApi;
  });
  return formElement;
};

renderComicPageSite();

console.log(await getSomethingFromAPI());
