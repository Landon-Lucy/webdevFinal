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
