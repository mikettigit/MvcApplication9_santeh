using MvcApplication9_santeh.Helpers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Collections.ObjectModel;

namespace MvcApplication9_santeh.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            ViewData["MainPage"] = true;
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult Feedback()
        {
            return View();
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Feedback(FormCollection collection)
        {

            JsonMessage jm = new JsonMessage();

            try
            {
                string InputFormattedString = collection["inputformattedstring"];
                string subject = "Сообщение c сайта";

                if (Convert.ToBoolean(ConfigurationManager.AppSettings["UseAgavaMail"]))
                {
                    MailMessage mailObj = new MailMessage();
                    mailObj.From = new MailAddress(ConfigurationManager.AppSettings["messageFrom"]);
                    mailObj.To.Add(ConfigurationManager.AppSettings["messageTo"]);
                    mailObj.Subject = subject;
                    mailObj.Body = InputFormattedString;

                    Collection<Attachment> attachments = new Collection<Attachment>();
                    foreach (string OneFile in Request.Files)
                    {
                        HttpPostedFileBase hpf = Request.Files[OneFile] as HttpPostedFileBase;
                        if (hpf.ContentLength > 0)
                        {
                            Attachment attachment = new Attachment(hpf.InputStream, hpf.FileName);
                            attachments.Add(attachment);
                        }
                    }

                    foreach (var attachment in attachments)
                    {
                        mailObj.Attachments.Add(attachment);
                    }

                    SmtpClient SMTPServer = new SmtpClient("localhost");
                    SMTPServer.Send(mailObj);
                }
                else
                {
                    System.Web.Mail.MailMessage mail = new System.Web.Mail.MailMessage();

                    string SMTP_SERVER = "http://schemas.microsoft.com/cdo/configuration/smtpserver";
                    string SMTP_SERVER_PORT = "http://schemas.microsoft.com/cdo/configuration/smtpserverport";
                    string SEND_USING = "http://schemas.microsoft.com/cdo/configuration/sendusing";
                    string SMTP_USE_SSL = "http://schemas.microsoft.com/cdo/configuration/smtpusessl";
                    string SMTP_AUTHENTICATE = "http://schemas.microsoft.com/cdo/configuration/smtpauthenticate";
                    string SEND_USERNAME = "http://schemas.microsoft.com/cdo/configuration/sendusername";
                    string SEND_PASSWORD = "http://schemas.microsoft.com/cdo/configuration/sendpassword";

                    mail.Fields[SMTP_SERVER] = ConfigurationManager.AppSettings["SMTP"];
                    mail.Fields[SMTP_SERVER_PORT] = 465;
                    mail.Fields[SEND_USING] = 2;
                    mail.Fields[SMTP_USE_SSL] = true;
                    mail.Fields[SMTP_AUTHENTICATE] = 1;
                    mail.Fields[SEND_USERNAME] = ConfigurationManager.AppSettings["SMTP_login"];
                    mail.Fields[SEND_PASSWORD] = ConfigurationManager.AppSettings["SMTP_password"];

                    mail.From = ConfigurationManager.AppSettings["messageFrom"];
                    mail.To = ConfigurationManager.AppSettings["messageTo"];
                    mail.Subject = subject;
                    mail.BodyFormat = System.Web.Mail.MailFormat.Text;
                    mail.Body += InputFormattedString;

                    System.Web.Mail.SmtpMail.SmtpServer = ConfigurationManager.AppSettings["SMTP"] + ":465";
                    System.Web.Mail.SmtpMail.Send(mail);
                }

                jm.Result = true;
                jm.Message = "Cообщение отправлено, благодарим за сотрудничество...";
            }
            catch (Exception e)
            {
                jm.Result = true;
                jm.Message = "Во время отправки произошла ошибка - " + e.ToString();
            }

            return Json(jm);
        }
    }
}
