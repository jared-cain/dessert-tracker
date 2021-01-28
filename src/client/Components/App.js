import NutritionList from './NutritionList';
import AddDessert from './AddDessert';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/add">
            <AddDessert />
          </Route>
          <Route path="/">
            <NutritionList />
          </Route>
          </Switch>
    </Router>

  );
}
// {!isFetching && data && (
//   <NutritionList items={data} />
// )}

export default App;
