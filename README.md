# Project 9: Around The U.S.

### Overview

In this project, you'll continue refactoring. You'll create a few more classes and couple them together. At the end of your project, you'll set up project bundling and building with Webpack. 

**Section**

Create the Section class for rendering a list of elements on a page according to the following requirements:
It has an object with two properties (items and renderer) as the first parameter of the constructor. The items property serves as an array of data, which you need to add on a page when initializing the class. The renderer property is a function responsible for creating and rendering data on a page.
The second parameter should be a CSS class selector where you'll add the card elements.
It stores a public method named renderItems() that renders all elements on the page. The renderer() function will render each element on a page.
It stores a public method named addItem() that takes a DOM element and adds it to the container.
The Section class doesn't have markup. It receives markup through the callback function and inserts it in the container.

**Popup**

Create the Popup class that opens and closes the popup window, as per the following requirements:
The constructor has a single parameter, which is the popup selector.
It stores the public methods open() and close() that will open and close the popup.
It stores a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
It stores a public method named setEventListeners() that adds a click event listener to the close icon of the popup. The modal window should also close when users click on the shaded area around the form.

**PopupWithImage**

Create the PopupWithImage class as a child class of Popup. This class has to change the parent open() method. In the open() method of the PopupWithImage class, you need to add an image to the popup and the corresponding image src attribute along with a caption for the image.

**PopupWithForm**

Create PopupWithForm as a child class of Popup. The PopupWithForm class must comply with the following requirements:
It takes two arguments: the popup selector, and a callback function which PopupWithForm calls when the form’s submit event fires.
It stores a private method named _getInputValues(), which collects data from all the input fields and returns that data as an object.
It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
It modifies the close() parent method in order to reset the form once the popup is closed.
Create an instance of the PopupWithForm class for each popup.

**UserInfo**

The UserInfo class is responsible for rendering information about the user on the page. This class should:
Take an object with the selectors of two elements into the constructor: one containing the user's name, and another containing the user's job.
Store a public method named getUserInfo(), which returns an object with information about the user. This method will be handy for cases when it's necessary to display the user data in the open form.
Store a public method named setUserInfo(), which takes new user data and adds it on the page.
Create an instance of the UserInfo class in index.js. Use its method setUserInfo() to handle the form submission inside an instance of the PopupWithForm class.

**Transform Card Class**

Connect the Card class to the popup. Make Card take the handleCardClick() function into the constructor. When the user clicks on the card, this function will open the popup with an image.

**Update the .gitignore file**

The next step is to initialize NPM and set up Webpack. This means the node_modules and dist folders will appear in the project. As noted before, we don't want Git to track these files, so before moving on to the next step, update your .gitignore file to contain the following contents:


live site -- https://jaxsonzane.github.io/se_project_aroundtheus/
