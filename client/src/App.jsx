import  {Routes , Route} from "react-router-dom";
import { ExpenseForm } from "./Components/ExpenseForm";
import { ExpenseList } from "./Components/ExpenseList";
import { Navbar } from "./Components/SubComponents/Navbar";
const App = () => {

  return (
    <div className="min-h-screen bg-navy">
        <Navbar />
        <main className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-10">
    <Routes>
      <Route path="/" element ={<ExpenseList/>} />
      <Route path = "/add" element = {<ExpenseForm/>}/>
    </Routes>
      </main>
    </div>
  );
};

export default App;
