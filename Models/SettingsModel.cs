using System.Web;
using System.Configuration;

namespace MvcApplication9_santeh.Models
{
    public class SettingsModel
    {
        public string Phone;
        public string Phone2;
        public string Email;
        public string Address;

        public SettingsModel()
        {
            Phone = ConfigurationManager.AppSettings["DefaultPhone"];
            Phone2 = ConfigurationManager.AppSettings["DefaultPhone2"];
            Email = ConfigurationManager.AppSettings["DefaultEmail"];
            Address = ConfigurationManager.AppSettings["DefaultAddress"];
        }

    }

    public static class SettingsReturner
    {
        public static SettingsModel Get()
        {
            SettingsModel result = null;

            object CachedSettingsModel = HttpRuntime.Cache.Get("SettingsModel");
            if (CachedSettingsModel != null)
            {
                result = CachedSettingsModel as SettingsModel;
            }
            else
            {
                result = new SettingsModel();

                HttpRuntime.Cache.Insert("SettingsModel", result);
            }

            return result;
        }
    }
}