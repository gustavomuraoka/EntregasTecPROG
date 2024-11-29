import { BrowserRouter, Route, Routes } from "react-router-dom";
import Produtos from "../pages/produtos";
import Main from "../pages/main";
import Forncedores from "../pages/fornecedores";
import Clientes from "../pages/clientes";
import Servicos from "../pages/servicos";
import Pets from "../pages/pets";
import Estatisticas from "../pages/estatisticas";

function MainRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/Produtos" element={<Produtos />}/>
                <Route path="/Clientes" element={<Clientes />}/>
                <Route path="/Servicos" element={<Servicos />}/>
                <Route path="/Pets" element={<Pets />}/>
                <Route path="/Estatisticas" element={<Estatisticas />}/>
            </Routes> 
        </BrowserRouter>
    )
}

export default MainRoutes