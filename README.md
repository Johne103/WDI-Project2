# Project #2: A Full-stack Application:                                                         CONQUIZTADOR - Playing for Global Domination


## Introduction

THE CONQUIZTADOR TEAM: Jamie Simpsonn, Luke Hammond, Gi, John Evans.

Conquiztador: a game in which a player takes on the role of a marval superhero to defend the world against evil super villains played by an AI, intent on taking control of the world, by conquering countries and overtaking terretories. Points are accumulated by correctly answering questions about the countries the adversaries are seeking to conquer. 

# CONQUIZTADORS

Play the game [here](https://dashboard.heroku.com/apps/conquiztadors)

![WDI-Project2](./images/Conquiztador_Login_screenshot.png)




### Overview

This project is **a full-stack RESTful application** that includes a **Google Map** a **Marvel API** and an **authenticated User**.

This solution is **built using an Express application** that has a **Mongo** database using the **Mongoose ORM**.

The solution has been developed by a team of four using Git in support of version control and output coordination. 

The solution has be developed with the use of tools such as Trello to support project planning and task coordination and wireframes before the devlepment of user stories defining what users will do with the app. The outcomes and scope of requirements have been prioritised using the MoSCoW technique.


---

### Technologies Used

The app has met the following Technical Requirments:

* **Inlcudes 2 models** – one represents the user and one that represents the main resource of the app; Marvel API.
* **Iincludes authentication** -  encrypted passwords & an authorization flow has been included.
* **Includes RESTful routes** for the player resource complete RESTful routes have been implemented: GET, POST, PUT, PATCH, and DELETE
* **Includes Google Map** has been included.
* **Includes SASS** - as this is a key industry skill
* **Wireframes used** - have been designed before building the app
* **Semantically clean HTML** 
* **Includes data from an API** - has been included to make the app more dynamic. External data from restcountries.eu API has been store in the app.
* **Deployed online via Heroku** - the application has been made accessible to the public through deployment to heroku.

---

### Preparation


Use the information taught in module 2.

Second project to create an application front and backend technologies in order to develop an improved understanding of the approach required to create and deploy for general use a viable full stack apjplication.


* Conquiztadors is a **working full-stack application** game played against and AI. In order to win the player must answer as many questions correctly once they have selected a country to conquer. The AI will pick an alternate country and randomly select answers to gain points.

![WDI-Project2](./images/Conquiztador_Login_screenshot.png)
---

###The Steps taken

Initial planning using Trello, timeline, wireframes, developing game concept and gameplay rules, technology to use, code tests, functionality tests and uploading to Git.

Review of MoSCoW prrioritization and management of scope was a key aspect to achieving deliverables.


###Challenges faced

- Managing communications between team members in support of ensuring Git was correctly aligned with all updates.
- Resolving issues with quiz logic when played with AI has taken quite a bit of effort to get right. Continuous testing and regular co-ordinated git add, commits, and merges where required.
- Remembering not to work in development also proved to be a challenge. 

###Where to from here?
The game could be improved in the following ways:

* The game has not used OOP and this would be a useful next step.
* The game currently has an AI as the second player, the ability to have a second player on the same device or a different device can be explored
* Investigate ways of cleaning up the data that is used to illiminate null fields
* Include audio themes depending on the super hero picked
* In
* Investigate indroducing responsiveness to allow game to be played on smaller screen formats.



###Bugs/Issues
- Computer may at times freeze part way through the game.
- Investigate size of image files and reduce to improve responsiveness 


### Outline of Application Requirements and Prioritisation

__MUST HAVE Application Requirements:__

* Single player game. (MUST HAVE)
* On subsequent turn, player selects next country to conquer. (MUST HAVE)
* Player to conquer country and gain territory based on correct answer to at least 50 percent of questions about country. (MUST HAVE)
* For small countries 5 questions, medium 10 questions,large 40 questions to be answered rounds of 4. (MUST HAVE)
* Questions will start with facts such as flag, population range etc. and gain increasing difficulty. (MUST HAVE)
* Player will accumulate points for each correct answer. (MUST HAVE)
* Correct answer to question by player will be indicated by flag pinned within country representing player (MUST HAVE)
* Player answering all questionss correctly will take control of country and gain territory. (MUST HAVE)
* Player unable to answer all questions correctly will accumulate points but will not take control of country, but can move on to another country to try to take control by correctly answering all questions. (MUST HAVE)
* Player score and countries conquered will be displayed (MUST HAVE)

__SHOULD HAVE Application Requirements:__

* At start country to conquer is selected randomly. (SHOULD HAVE)
* Option for two player game on same device (SHOULD HAVE)

__COULD HAVE Application Requirements:__

* Colour of country respresentation on map to change colour to indicate conquered country for each player. (COULD HAVE)
* Option for two player game on seperate devices (COULD HAVE)
* Timer for answering each question. (COULD HAVE) 
* Use a marvel comics API , maybe the user could choose a superhero to play (user a) and a villain (user b) so it'd be good vs. evil world domination. (COULLD HAVE)
* Saving game states to user profiles. (COULD HAVE) 

__WON'T HAVE Application Requirements (Out of Scope):__

* Application will not support use on smartphones. (WON'T HAVE)


---

### Project Feedback + Evaluation - Key measures to be considered

* __Project Workflow__: Did you complete the user stories, wireframes, task tracking, and/or ERDs, as specified above? Did you use source control as expected for the phase of the program you’re in (detailed above)?

* __Technical Requirements__: Did you deliver a project that met all the technical requirements? Given what the class has covered so far, did you build something that was reasonably complex?

* __Creativity__: Did you added a personal spin or creative element into your project submission? Did you deliver something of value to the end user (not just a login button and an index page)?

* __Code Quality__: Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code as your instructors as we have in class?

* __Deployment and Functionality__: Is your application deployed and functional at a public URL? Is your application free of errors and incomplete functionality?

