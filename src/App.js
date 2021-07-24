import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//pages & layout
import SiteHeader from "./components/SiteHeader";
import FellowList from "./pages/FellowList";
import FellowDetails from "./pages/FellowDetails";
import Discipline from "./pages/Discipline";
import ErrorPage from "./pages/ErrorPage";

//apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Switch>
            <Route exact path="/">
              <FellowList />
            </Route>
            <Route path="/fellow/:id">
              <FellowDetails />
            </Route>
            <Route path="/discipline/:id">
              <Discipline />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
