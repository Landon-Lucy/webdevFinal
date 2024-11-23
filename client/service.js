const baseUrl = "http://localhost:5297/";

export const getSomethingFromAPI = async () => {
  const response = await fetch(baseUrl);
  const text = await response.text();
  return text;
};

export async function getPages() {
  const pages = await fetch(baseUrl + "pages");
  const pagesData = await pages.json();
  return pagesData;
}

export async function getPagebyPageNumber(pageNumber) {
  const page = await fetch(baseUrl + "page/" + String(pageNumber));
  const pageData = await page.json();
  return pageData.base64File;
}

export const storeFileOnApi = async (fileAsString, pageNumber) => {
  const body = {
    base64File: fileAsString,
    page: pageNumber,
  };
  await fetch(baseUrl + "fileUpload", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getBase64FileFromApi = async () => {
  const url = baseUrl + "file";

  const response = await fetch(url);

  return await response.text();
};

//Comments

export async function postComment(
  authorString,
  contentString,
  pageNumber,
  idString
) {
  await fetch(baseUrl + "pages/" + pageNumber + "/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      author: authorString,
      text: contentString,
      id: idString,
    }),
  });
}

export async function getComments(pageNumber) {
  const comments = await fetch(baseUrl + "pages/" + pageNumber + "/comments");
  const commentsData = await comments.json();
  return commentsData;
}

export async function deleteComment(pageNumber, commentId) {
  const comments = await fetch(
    baseUrl + "pages/" + pageNumber + "/comments/" + commentId,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: commentId,
      }),
    }
  );
}

export async function addRating(pageNumber, username, rating) {
  await fetch(baseUrl + "pages/" + pageNumber + "/rating", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      stars: rating,
    }),
  });
}

export async function getRatings(pageNumber)
{
  const ratings = await fetch(baseUrl + "pages/" + pageNumber + "/rating");
  const ratingsData = await ratings.json();
  return ratingsData;
}

// export async function editComment(
//   authorString,
//   contentString,
//   pageNumber,
//   commentId
// ) {
//   await fetch(baseUrl + pageNumber + `/comments/` + commentId, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       author: authorString,
//       text: contentString,
//       id: commentId,
//     }),
//   });
// }
