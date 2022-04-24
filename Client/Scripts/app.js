"use strict";
(function () {
    function AuthGuard() {
        let protected_routes = [
            "/contact-list",
            "/edit"
        ];
        if (protected_routes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function DisplayHome() {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => {
            location.href = "/about";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("main").append(`
        <article>
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);
    }
    function DisplayAboutPage() {
        console.log("About Us Page");
        let DocumentBody = document.body;
        let OnurParagraph = document.getElementById("Onur");
        let CooperParagraph = document.getElementById("Cooper");
        let OnurDetails = document.createElement("OnurDetails");
        let OnurDetalsContext = `<h2>Onur Ozkanca</h2>
        <p>Graduated from Durham College in 2022, Onur is an experienced programmer with a focus on delivering the best possible product to our customers.</p>`;
        let CooperDetails = document.createElement("CooperDetails");
        let CooperDetailsContext = `<h2>Cooper Stokan</h2>
        <p>Graduated from Durham College in 2022, Cooper is an experienced programmer who has a passion for cyber security.</p>`;
        OnurDetails.innerHTML = OnurDetalsContext;
        CooperDetails.innerHTML = CooperDetailsContext;
        OnurParagraph.appendChild(OnurDetails);
        CooperParagraph.appendChild(CooperDetails);
    }
    function DisplayProjectsPage() {
        console.log("Our Projects Page");
        let DocumentBody = document.body;
        let MainContent = document.getElementsByTagName("main")[0];
        document.getElementsByClassName("featurette-heading")[0].innerHTML = `This Project <span class="text-muted">Working with Javascript</span>`;
        document.getElementsByClassName("lead")[0].innerHTML = "The website you are looking at currently is one of my favourites I've worked on so far.  Working with Javascript is something I've been looking forward to doing since I started out at Durham College.  This project has made me very excited for the rest of the course.  I enjoy the intuitiveness of the language and also the real time editing that can be so easily done with lite-server.";
        document.getElementsByClassName("featurette-heading")[1].innerHTML = `My First Project <span class="text-muted">Hello World! - Using Python</span>`;
        document.getElementsByClassName("lead")[1].innerHTML = "This project will always hold a place near and dear to me, this is the first few lines of code I had ever written.  Since then I was hooked, learning about programming and continuing to do so has had a monumental shift in how I live my life.  I always like to look back at this file and be proud of how far I've come in such little time.";
        document.getElementsByClassName("featurette-heading")[2].innerHTML = `Drawing Pyramids <span class="text-muted"> Using Python</span>`;
        document.getElementsByClassName("lead")[2].innerHTML = "This project is one of my favourites because who wouldn't want to create some cool-looking pyramids. It asks the user how big they want their pyramids to be and, the pyramid you wanted is there.";
    }
    function DisplayServicesPage() {
        console.log("Our Services Page");
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateField(input_field_ID, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $("#" + input_field_ID).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/, "Please enter a valid Full Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        $("button[id='sendButton']").on("click", function () {
            location.href = "/home";
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact-List Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Add/Edit Page");
        ContactFormValidation();
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $("#logout").on("click", function () {
                sessionStorage.clear();
                $("#login").html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                location.href = "/login";
            });
        }
    }
    function DisplayLoginPage() {
        console.log("Login Page");
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
    }
    function Display404() {
    }
    function Start() {
        console.log("App Started!!");
        let page_id = $("body")[0].getAttribute("id");
        CheckLogin();
        switch (page_id) {
            case "home":
                DisplayHome();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "edit":
                DisplayEditPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "projects":
                DisplayProjectsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map