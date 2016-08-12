using MvcApplication9_santeh.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication9_santeh.Controllers
{
    public class PagesController : Controller
    {
        //
        // GET: /Pages/

        private DataModel dataModel;
    
        protected DataModel Dm { get { return dataModel ?? (dataModel = new DataModel()); } }

        public ActionResult Index(string param1)
        {
            if (param1.ToLower() == "calc.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("4");
            }
            else if (param1.ToLower() == "calc2.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("141");
            }
            else if (param1.ToLower() == "montazh-otopleniya.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("8");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "montazh-kanalizacii.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("21");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "montazh-sistemy-vodoprovoda.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("30");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "montazh-otopleniya-pola.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("36");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "raschet-stoimosti-otopleniya.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("43");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "proektirovanie.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("45");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "besprovodnoye-upravleniye-otopleniyem.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("49");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "montazh-kanalizatsii-v-dome.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("57");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "raschet-stoimosti-kanalizatsii.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("62");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "montazh-vodoprovoda-v-dome.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("64");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "raschet-stoimosti-vodosnabzheniya.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("66");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "kopka-kolodsev.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("70");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "burenie-skvagin.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("73");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "trubi-mednie.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("76");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "polipropilen.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("79");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "shitii-polietilen.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("82");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "viezd-na-ocmotr.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("86");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "kommercheskoe-predlogenie.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("89");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "dogovor.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("95");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "komplektasia-dostavka.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("98");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "montag.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("101");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "nashi-garantii.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("104");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "o_nas.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("130");
                ViewData["HasRight"] = true;
            }
            else if (param1.ToLower() == "address.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("137");
                ViewData["HasRight"] = true;
            }

            string ViewFileName = "~/Views/Pages/" + param1;

            if (Request.IsAjaxRequest())
            {
                return PartialView(ViewFileName);
            }
            else
            {
                return View(ViewFileName);
            }
        }
    }
}
