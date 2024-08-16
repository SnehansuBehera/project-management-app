import Header from "./components/Header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Project from "./pages/Project.jsx";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: "https://project-management-app-backend-ls5q.onrender.com/graphql",
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="https://project-management-app-30di.onrender.com/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router >
      </ApolloProvider>

    </>
  );
}

export default App;
