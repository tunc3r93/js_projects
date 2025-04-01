using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace new_egg_timer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureServices((context, services) =>
                    {
                        services.AddControllers();  

                        services.AddCors(options =>
                        {
                            options.AddDefaultPolicy(builder =>
                            {
                                builder.WithOrigins("https://localhost:3000") 
                                       .AllowAnyHeader()
                                       .AllowAnyMethod();
                            });
                        });
                    });

                    webBuilder.Configure((context, app) =>
                    {
                        var env = context.HostingEnvironment;

                        if (env.IsDevelopment())
                        {
                            app.UseDeveloperExceptionPage(); 
                        }
                        else
                        {
                            app.UseExceptionHandler("/Home/Error"); 
                            app.UseHsts();
                        }

                        app.UseHttpsRedirection();

                        app.UseStaticFiles(); 

                        app.UseRouting();

                        app.UseCors();

                        app.UseEndpoints(endpoints =>
                        {
                            endpoints.MapControllers(); 
                        });
                    });
                });
    }
}
