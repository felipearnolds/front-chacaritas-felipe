import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instrucciones from '../pages/Instrucciones';
import Home from '../pages/Home';
import Login from '../profile/Login';
import Nosotros from '../pages/Nosotros';
import Registro from '../profile/Registro';
import Bienvenida from '../pages/Bienvenida';
import CrearPartida from '../pages/CrearPartida';
import UnirmePartida from '../pages/UnirmePartida';
import Board from '../board/Board';
import TestView from '../board/TestView';
import SalaEspera from '../pages/SalaEspera';
import MiPerfil from '../profile/MiPerfil';
import JuegoActivo from '../pages/JuegoActivo';
import ProtectedRoute from '../protected/ProtectedRoute'; //hola

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/instrucciones" element={<Instrucciones />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/bienvenida" element={<Bienvenida email="mail@ejemplo.com" />} />
                <Route path="/crear-partida" element={<CrearPartida />} />
                <Route path="/sala-espera/:gameId" element={<SalaEspera />} />
                <Route path="/unirme-partida" element={<UnirmePartida />} />
                <Route path="/board" element={<Board />} />
                <Route path="/board/test" element={<TestView />} />
                <Route path="/mi-perfil" element={<MiPerfil />} />
                <Route path="/juego/:gameId" element={
                    <ProtectedRoute>
                        <JuegoActivo />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
