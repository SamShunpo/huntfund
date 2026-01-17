import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HuntEditor from "../pages/organizer/HuntEditor"
import GameLobby from "../pages/player/GameLobby"
import GameView from "../pages/player/GameView"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to admin for now, or a landing page */}
                <Route path="/" element={<Navigate to="/admin" replace />} />

                {/* Organizer Routes */}
                <Route path="/admin" element={<HuntEditor />} />

                {/* Player Routes */}
                <Route path="/game" element={<GameLobby />} />
                <Route path="/game/play" element={<GameView />} />
            </Routes>
        </BrowserRouter>
    )
}
