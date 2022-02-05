import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllArticles from "./AllArticles/AllArticles";
import Article from "./Article/Article";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllArticles/>}/>
                <Route path="article/:id" element={<Article/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
