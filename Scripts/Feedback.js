$(document).ready(function () {
    $(".CallbackFormSubmit, .FeedbackFormSubmit").click(function () {

        isError = false;

        thisButton = $(this);

        if (thisButton.attr("disabled") == "disabled") {
            alert("Уже отправлено");
            return false;
        }

        clientNameField = thisButton.parents("form").find("[name=clientName]");
        if (clientNameField.length > 0) {
            clientNameField.removeClass("error");
            nameChars = " -ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";
            nameString = clientNameField.val();
            if (nameString.length < 3) {
                clientNameField.addClass("error");
                isError = true;
            }
            else {
                i = 0;
                while (ch = nameString.substr(i, 1)) {
                    if (nameChars.indexOf(ch) == -1) {
                        clientNameField.addClass("error");
                        isError = true;
                        break;
                    }
                    i++;
                }
            }
        }

        emailString = "";
        clientEmailField = thisButton.parents("form").find("[name=clientEmail]");
        if (clientEmailField.length > 0) {
            clientEmailField.removeClass("error");
            emailChars = "_-.@~qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
            emailString = clientEmailField.val();
            if (emailString.length < 6) {
                clientEmailField.addClass("error");
                isError = true;
            }
            else {
                i = 0;
                HasAt = false;
                while (ch = emailString.substr(i, 1)) {
                    if (emailChars.indexOf(ch) == -1) {
                        isError = true;
                        break;
                    }
                    if (ch == "@") {
                        HasAt = true;
                    }
                    i++;
                }
                if (!HasAt) {
                    isError = true;
                }
            }
        }

        messageString = "";
        clientMessageField = thisButton.parents("form").find("[name=clientMessage]");
        if (clientMessageField.length > 0) {
            clientMessageField.removeClass("error");
            messageString = clientMessageField.val();
            if (messageString.length < 3)
            {
                clientMessageField.addClass("error");
                isError = true;
            }
        }

        isSinglePhone = false;
        clientPhoneField = thisButton.parents("form").find("[name=clientSinglePhone]");
        if (clientPhoneField.length > 0) {
            isSinglePhone = true;
            nameString = "Перезвоните мне";
            messageString = "Перезвоните мне";
            clientPhoneField.removeClass("error");
            phoneChars = " +-()1234567890";
            contactString = clientPhoneField.val();
            if (contactString.length < 5) {
                clientPhoneField.addClass("error");
                isError = true;
            }
            else {
                i = 0;
                while (ch = contactString.substr(i, 1)) {
                    if (phoneChars.indexOf(ch) == -1) {
                        clientPhoneField.addClass("error");
                        isError = true;
                        break;
                    }
                    i++;
                }
            }
        }

        isContactsError = false;
        clientPhoneField = thisButton.parents("form").find("[name=clientPhone]");
        if (clientPhoneField.length > 0) {
            clientPhoneField.removeClass("error");
            phoneChars = " +-()1234567890";
            contactString = clientPhoneField.val();
            if (contactString.length < 5) {
                isContactsError = true;
            }
            else {
                i = 0;
                while (ch = contactString.substr(i, 1)) {
                    if (phoneChars.indexOf(ch) == -1) {
                        isContactsError = true;
                        break;
                    }
                    i++;
                }
            }

            if (isContactsError) {
                emailChars = "_-.@~qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
                i = 0;
                HasAt = false;
                while (ch = contactString.substr(i, 1)) {
                    if (emailChars.indexOf(ch) == -1) {
                        isError = true;
                        clientPhoneField.addClass("error");
                        break;
                    }
                    if (ch == "@") {
                        HasAt = true;
                    }
                    i++;
                }
                if (!HasAt) {
                    isError = true;
                    clientPhoneField.addClass("error");
                }
            }
        }

        if (!isError) {

            if (isSinglePhone) {$("#perezvonite_nam_close").click();}

            thisButton.attr("disabled", "disabled");

            var form_data = new FormData(thisButton.parents("form")[0]);

            form_data.append("inputformattedstring", emailString + " " + contactString + " (" + nameString + ") " + messageString);

            $.ajax({
                url: "/Home/Feedback",
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    alert(data.Message);
                }
            });


            $.fancybox.close();
        }

        return false;

    });

    $(".AddFile").click(function () {
        if ($(".filesdiv").find("input[type=file]").length > 2) {
            alert("Максимум 3 файла");
            return false;
        }
        file_index++;
        var newfile = $(".templatefile").clone().removeClass("templatefile").show();
        newfile.find("input[type=file]").attr("name", "file" + file_index);
        newfile.find("input[type=text]").click(function () {
            var fileinput = $(this).parent().find("input[type=file]");
            fileinput.change(function () {
                newfile.find("input[type=text]").val($(this).val().split(/(\\|\/)/g).pop())
            })
            fileinput.click();
        });
        newfile.appendTo($(this).parents("form").find(".filesdiv"));
        return false;
    })

    $(document).on("click", ".RemoveFile", function () {
        $(this).parent().remove();
        return false;
    })
});

var file_index = 0;
            
