using Microsoft.EntityFrameworkCore;

//Identificador para conocer mi CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cadena de conexión 
var conString = builder.Configuration.GetConnectionString("MRodriguezProgramacionNCapas") ??
     throw new InvalidOperationException("Connection string 'MrodriguezProgramacionNcapasContext'" +
    " not found.");
builder.Services.AddDbContext<DL.MrodriguezProgramacionNcapasContext>(options =>
    options.UseSqlServer(conString));

//Permite que el BL mande a llamar mi cadena de conexión.
builder.Services.AddScoped<BL.Usuario>();

//Cors: mecanismo crítico de seguridad en los navegadores de internet o browsers que establece restricciones
//sobre cómo un documento o página web alojada en un origen (o dominio) puede interactuar con otro origen.

//Configuracion CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(
                              //Dominio desde el que se harán las peticiones, no el dominio de las APIs.
                              "https://localhost:4200")
                          //.WithMethods("PUT", "DELETE", "GET");
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

//Construye la aplicación
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//Usar CORS
app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
