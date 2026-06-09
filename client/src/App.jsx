import  {Routes , Route} from "react-router-dom";
import ExpenseForm from "./Components/ExpenseForm";
import { ExpenseList } from "./Components/ExpenseList";
const App = () => {

  return (
    <Routes>
      <Route path="/" element ={<ExpenseList/>} />
      <Route path = "/add" element = {<ExpenseForm/>}/>
    </Routes>
  )
}

export default App;
