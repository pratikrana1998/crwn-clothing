**[crwn-clothing](https://github.com/pratikrana1998/crwn-clothing)** is an E-commerce react app developed using [create-react-app](https://github.com/facebook/create-react-app).

The app has been divided into various pages(sections) and each page consists of different components.The pages include:

-homepage

-shop

-collection

-checkout

It has navigation and routing that takes us to different pages of categories of items and from these items you can add them to the cart.From the cart you can checkout by paying for the items using our integrated Stripe API(test version) which handles payments.Firebase integration has been set up to handle authentication(with Google) and storage.It also has a email signin/sign-up feature.

Redux has been implemented for state management.The 'reselect' library has been used for memoization of the selectors.The 'redux-persist' libraby has been used to create the persisted version of the store to leverage the local storage for the cart reducer.The PersistGate helps to rehydrate the state when the app refreshes.

Redux-Sagas has been implemented in order to handle the asynchronous actions in the redux implemetation.

Backend server has been set up using express library and middlewares like cors, compression and express-sslify for enforcing HTTPS connection.The 'axios' library has been used on the frontend in order to send GET and POST request to the server.

**Performance optimisations**

React.memo has been used to memoize the cartItems so that they render only when a new item is added.

App has been made PWA compliant by adding serviceworker, https and updating manifest.

Enzyme and snapshot testing has been performed for the app.

You can view the app through the link:
https://github.com/facebook/create-react-app

or 

You can run the app locally by cloning the repo an running the command:

  ### npm run dev
  
  Runs the app in the development mode.<br />
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
