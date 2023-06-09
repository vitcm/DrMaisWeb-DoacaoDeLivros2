import { Route, Routes } from "react-router-dom";
import { Dashboard2 } from "../screens2/Dashboard2";
import { Detalhes } from "../screens2/Detalhes";
import { Cadastro } from "../screens2/Cadastro";

export function RoutesNav() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard2 />} />
      <Route path="/Dashboard/" element={<Dashboard2 />} />
      <Route path="/Detalhes/:id?/" element={<Detalhes />} />
      <Route path="/Editar/:id?/" element={<Cadastro />} />
      <Route path="/Cadastro/:id?/" element={<Cadastro />} />
    </Routes>
  );
}
