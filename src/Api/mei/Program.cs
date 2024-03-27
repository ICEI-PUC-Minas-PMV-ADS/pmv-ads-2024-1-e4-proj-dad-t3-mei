
using mei.Models;
using mei.Services;
using System.Text.Json.Serialization;


namespace mei
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<DatabaseSettings>(
                builder.Configuration.GetSection("MeiDatabase"));
            builder.Services.AddSingleton<CategoriasService>();
            builder.Services.AddSingleton<ClientesService>();
            builder.Services.AddSingleton<DespesasService>();
            builder.Services.AddSingleton<FaturamentosService>();
            builder.Services.AddSingleton<MeisService>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:5173").AllowAnyHeader()
                                                  .AllowAnyMethod(); ;
                                  });
            });

            builder.Services.AddControllers()
                .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            // PUC-MG Converter o enum em string na API na API
            builder.Services.AddControllers().AddJsonOptions(x =>
            {
                x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
