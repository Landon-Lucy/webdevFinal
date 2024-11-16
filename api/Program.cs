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

//Comments stuff

app.MapGet("/pages/{pageNumber}/comments", (ulong pageNumber) =>
{
    var commentsPath = Path.Combine(storageRoot, pageNumber.ToString(), "comments");
    if (!Directory.Exists(commentsPath))
        return [];

    var comments = Directory.GetFiles(commentsPath)
        .Select((file) => File.ReadAllText(file))
        .Select((rawComment) => JsonSerializer.Deserialize<Comment>(rawComment));

    return comments;
});

app.MapPost("/pages/{pageNumber}/comments", async (ulong pageNumber, Comment comment) =>
{
    var commentsPath = Path.Combine(storageRoot, pageNumber.ToString(), "comments");
    Directory.CreateDirectory(commentsPath);

    var commentFile = Path.Combine(commentsPath, $"{comment.Id}.json");
    await File.WriteAllTextAsync(commentFile, JsonSerializer.Serialize(comment));

    return comment;
});

app.MapPut("/pages/{pageNumber}/comments/{commentId}", async (ulong pageNumber, ulong commentId, Comment updatedComment) =>
{
    var commentFile = Path.Combine(storageRoot, pageNumber.ToString(), "comments", $"{commentId}.json");
    if (!File.Exists(commentFile))
        throw new Exception("Comment not found.");

    var newComment = updatedComment with { Id = commentId };
    await File.WriteAllTextAsync(commentFile, JsonSerializer.Serialize(newComment));
});

app.MapDelete("/pages/{pageNumber}/comments/{commentId}", (ulong pageNumber, ulong commentId) =>
{
    var commentFile = Path.Combine(storageRoot, pageNumber.ToString(), "comments", $"{commentId}.json");
    if (!File.Exists(commentFile))
        throw new Exception("Comment not found.");

    File.Delete(commentFile);
});

app.Run();


public record FileUploadRequestBody(
    string Base64File, string Page
);
public record Comment(ulong Id, string Author, string Text);