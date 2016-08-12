using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcApplication9_santeh
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("ostavit-zayavku", "ostavit-zayavku", new { controller = "Home", action = "Feedback" });

            string[] pages = Directory.GetFiles(HttpContext.Current.Server.MapPath("/Views/Pages/"), "*.cshtml");
            foreach (string page in pages)
            {
                string PageName = Path.GetFileNameWithoutExtension(page);
                routes.MapRoute(
                    PageName, // Route name
                    PageName, // URL with parameters
                    new { controller = "Pages", action = "Index", param1 = Path.GetFileName(page) } // Parameter defaults
                );
            }

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}