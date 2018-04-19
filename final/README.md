Installation:
==============

 First we need to make the MySQL server run.

 In your shell:

    * mysql -u root -proot
    * use psh_raw
    * source database/database.mysql
    * source database/datas.sql

Optionnal, but you'll be able to see all the requests that I have done:

    * source database/request.sql`

Then you can quit MySQL:

     * quit

List of modules used:

* angular
* angular-route
* jquery
* bootstrap
* node
* express
* body-parser
* mysql
* cors

Then you have to run the server:
    node app/server.js

It should be fine but if there are any probleme, run:
    ./install.sh

Once the server run, open index.html in a server (Personnaly I used atom-live-server package)


Usage:
=======

 The main page send a `$http.post` request to the node server. Node, thanks to a query, send database informations back and angulat post it on the main page.

 If you select a UserID and a month, then you'll be able to see when these users entered or quit the office.

The **Resume** button will sum up all the moves from all workers. Then the analyze button, with a month selected, will show you how many hours this worker was here.

 I learned AngularJS thanks to Youtube videos, and during the tutorial, I've learnts how to add something. That's why there is an **Add row** column. But I didn't finished it: nothing is sent to the database.

 It should be really easy to implement (complete the function in **app.js** and create the request in **server.js**). But due to a cruel lack of time (exams revisons and a big project that I was supposed to deliver) I couldn't implement it.

 I hope that's good enough for a test.

 Kind regards,
 Tony Delarue.
r
