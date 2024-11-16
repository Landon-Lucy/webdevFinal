using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();
app.UseCors(p =>
{
    p
    .AllowAnyHeader()
    .AllowAnyOrigin()
    .AllowAnyMethod();
});

var storageRoot = "./storage";
if (!Directory.Exists(storageRoot))
{
    Directory.CreateDirectory(storageRoot);
}

app.MapGet("/", () => "Hello World");

var fileString = "";

app.MapGet("/pages", () =>
{
    var pages = Directory.GetDirectories(storageRoot)
      .Select(pageDir =>
      {
          var pageFile = Path.Combine(pageDir, "comicPage.json");
          if (!File.Exists(pageFile)) return null;


          var page = JsonSerializer.Deserialize<FileUploadRequestBody>(File.ReadAllText(pageFile));
          return page;
      })
      .Where(b => b != null);

    // Console.WriteLine(pages.Count());
    return pages;
});

app.MapGet("/page/{pageNumber}", (ulong pageNumber) =>
{
    var pageFolder = pageNumber.ToString();
    var pageFile = Path.Combine(storageRoot, pageFolder, "comicPage.json");

    if (!File.Exists(pageFile))
        throw new Exception("page not found.");

    var page = JsonSerializer.Deserialize<FileUploadRequestBody>(File.ReadAllText(pageFile));
    if (page == null)
        throw new Exception("page not found");

    return page;
});

app.MapPost("/fileUpload", async (FileUploadRequestBody comicPage) =>
{
    var pagePath = Path.Combine(storageRoot, comicPage.Page.ToString());
    Directory.CreateDirectory(pagePath);

    var pageFile = Path.Combine(pagePath, "comicPage.json");
    await File.WriteAllTextAsync(pageFile, JsonSerializer.Serialize(comicPage));
    // fileString = comicPage.Base64File;
});

app.MapGet("/file", () =>
{
    return fileString;
});

app.Run();


public record FileUploadRequestBody(
    string Base64File, string Page
);
