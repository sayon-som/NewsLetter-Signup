
        const mailchimp = require("@mailchimp/mailchimp_marketing");
        //Requiring express and body parser and initializing the constant "app"
        const express = require("express");
        const bodyParser = require("body-parser");
        const app = express();
        //Using bod-parser
        app.use(bodyParser.urlencoded({extended:true}));
        //The public folder which holds the CSS
        app.use(express.static(__dirname));
        //Listening on port 3000 and if it goes well then logging a message saying that the server is running
        
        //failure route
        
        //Sending the signup.html file to the browser as soon as a request is made on localhost:3000
        app.get("/", function (req, res) {
        res.sendFile(__dirname + "/sign-up.html");
        });
        //Setting up MailChimp
        mailchimp.setConfig({
        //*****************************ENTER YOUR API KEY HERE******************************
        apiKey: "bdc912d38706a3f6a44e53a49b643c8e-us6",
        //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
        server: "us6"
        });
        //As soon as the sign in button is pressed execute this
        app.post("/", function (req,res) {
        //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
        const firstName = req.body.first_name;
        const secondName = req.body.last_name;
        const email = req.body.email_info;
        //*****************************ENTER YOU LIST ID HERE******************************
        const listId = "f79b47278d";
        //Creating an object with the users data
        const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
        };
        //Uploading the data to the server
        async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
        }
        });
        //If all goes well logging the contact's id
        res.sendFile(__dirname + "/success.html");
        }


      
        // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LESSON*************************
        // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
        run().catch(e => {res.sendFile(__dirname + "/fail.html")
    });
        

        });
        app.post("/fail",function(req,res){
            res.redirect("/");
        });
        app.listen(process.env.PORT || 3000,function(){
            console.log("The server is listening");
        });
