using System.Web;
using System.Web.Mvc;

namespace MvcApplication9_santeh
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}