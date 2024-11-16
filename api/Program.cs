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

app.MapGet("/", () => "Hello World");

var fileString = "";

app.MapPost("/fileUpload", (FileUploadRequestBody body) =>
{
    // Console.WriteLine("In file Upload");
    // Console.WriteLine(body.Base64File);
    fileString = body.Base64File;
});

app.MapGet("/file", () =>
{
    return fileString;
});

app.Run();


public record FileUploadRequestBody(
    string Base64File, string Name
);
