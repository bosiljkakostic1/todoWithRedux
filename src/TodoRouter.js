import { Switch, Route, Redirect } from "react-router-dom";
import { All } from "./All";
import { Completed }  from "./Completed";
import { TodoNavigation } from "TodoNavigation";

class TodoRouter extends Component {
    render() {
        <Switch>
            <Route path="/todo" exact  component={All} />
            <Route path="/completed" render={() => <Completed completed="true"/>}  />
            <Route path="/uncompleted" render={() => <Completed completed="false"/>}  />
            <Redirect to="/todo" />
        </Switch>
    }
}