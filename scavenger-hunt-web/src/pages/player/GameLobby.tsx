import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";

export default function GameLobby() {
    const [accessCode, setAccessCode] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        // In real app: validate code via API
        if (accessCode.trim().length > 0) {
            navigate("/game/play");
        }
    };

    return (
        <div
            className="h-screen w-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')", backgroundColor: "#fdf6e3" }}
        >
            <Card variant="game" className="w-full max-w-sm shadow-xl border-amber-900/20">
                <CardContent className="p-6 space-y-6 text-center">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-amber-900 mb-2">Bienvenue Aventuriers</h1>
                        <p className="text-amber-800/80 text-sm">Entrez votre code d'accès pour rejoindre la chasse.</p>
                    </div>

                    <Input
                        variant="game"
                        placeholder="Code d'équipe (ex: PIRATE-1)"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="text-center text-lg tracking-widest uppercase font-mono"
                    />

                    <Button variant="game" className="w-full text-lg" onClick={handleJoin}>
                        Rejoindre l'aventure 🏴‍☠️
                    </Button>

                    <div className="text-xs text-amber-800/50 mt-4">
                        Scavenger Hunt v0.1
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
