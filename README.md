# react-blog
This CMS Blog was made with ReactJS + Redux.<br>
For the backend Node.js + express was used.<br>
MongoDB was used as database to store the posts and the users. Hosted at <a href="https://mlab.com/">mlab.</a><br>
<a href="http://mongoosejs.com/">Mongoose</a> was used for MongoDB ORM.<br>
By far the most complicated part was the authentication. For this I used <a href="https://en.wikipedia.org/wiki/JSON_Web_Token">JWT (JSON Web Token)</a> strategy, with the help of <a href="http://passportjs.org/">passport.js</a> package.<br><br>
You can check it live here: https://mesq-react-blog.herokuapp.com

### Getting Started
1 - Clone the project on your desired folder: $ git clone git@github.com:mesqfel/react-blog.git<br><br>
2 - Navigate to the folder: $ cd react-blog<br><br>
3 - Install dependencies: $ npm install<br><br>
4 - Rename the file ".envexample" to ".env"<br><br>
5 - Place your own configuration values in the new renamed ".env" file<br><br>
6 - Rename the file "configexample.js" to "config.js"<br><br>
7 - Place your secret - any random string is valid<br><br>
8 - On folder /react-blog generate the bundle.js running: $ ./node_modules/.bin/webpack webpack -p<br><br>
9 - Start mongodb running: $ mongod<br><br>
10 - On folder /react-blog run: $ node server.js<br><br>
11 - Visit http://localhost:8080<br><br>
12 - If you have any trouble, email me: fe.mesquita88@gmail.com
