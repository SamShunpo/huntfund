import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Map, Camera } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import { useGeolocation, calculateDistance } from "../../services/gameLogic"
import RiddleModal from "../../components/player/RiddleModal"
import type { Step } from "../../types"

// Fix Marker
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Mock Data (In real app, fetch from Supabase based on team ID)
const MOCK_STEPS: Step[] = [
    { id: "1", title: "Départ", enigma: "Rendez-vous à la fontaine.", solution: "ok", latitude: 48.8566, longitude: 2.3522, isPausePoint: false, riddleType: "info" },
    { id: "2", title: "L'impasse", enigma: "Quel est le numéro de la maison bleue ?", solution: "42", latitude: 48.8570, longitude: 2.3530, isPausePoint: false, riddleType: "text" }
]

function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lng], map.getZoom());
    }, [lat, lng, map]);
    return null;
}

export default function GameView() {
    const navigate = useNavigate()
    const { location } = useGeolocation() // Real GPS
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [isRiddleOpen, setIsRiddleOpen] = useState(false)

    // Dev Mode: Manual "GPS" for testing on desktop
    const [devPos, setDevPos] = useState({ lat: 48.8560, lng: 2.3520 })
    const userPos = location || devPos

    const currentStep = MOCK_STEPS[currentStepIndex]
    const distance = currentStep ? calculateDistance(userPos.lat, userPos.lng, currentStep.latitude, currentStep.longitude) : 0
    const isNear = distance < 30 // 30 meters geofence

    const handleSolve = () => {
        if (currentStepIndex < MOCK_STEPS.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1)
            setIsRiddleOpen(false)
            alert("Bravo ! Étape suivante débloquée 🚀")
        } else {
            alert("VICTOIRE ! Vous avez terminé la chasse ! 🏆")
            navigate("/game")
        }
    }



    // Dummy component to handle map clicks for Dev Teleport
    function MapEvents() {
        const map = useMap();
        useEffect(() => {
            map.on('click', (e) => {
                setDevPos({ lat: e.latlng.lat, lng: e.latlng.lng })
            });
            return () => { map.off('click'); }
        }, [map]);
        return null;
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-slate-100 relative overflow-hidden">
            {/* HUD Header */}
            <div className="absolute top-0 left-0 right-0 z-[1000] p-4 flex justify-between items-start pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-md px-3 py-1 pointer-events-auto">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Chrono</span>
                    <span className="text-xl font-mono font-bold text-slate-800">45:00</span>
                </div>
                <div className="bg-amber-100/90 backdrop-blur-md rounded-lg shadow-md px-3 py-1 border border-amber-200 pointer-events-auto">
                    <span className="text-xs font-bold text-amber-800 uppercase block">Équipe</span>
                    <span className="font-serif font-bold text-amber-900">Beta Testers</span>
                </div>
            </div>

            {/* Main Map */}
            <div className="flex-1 w-full relative z-0">
                <MapContainer
                    center={[48.8566, 2.3522]}
                    zoom={16}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Player Marker */}
                    <Marker position={[userPos.lat, userPos.lng]}>
                        <Popup>Vous êtes ici 🔵</Popup>
                    </Marker>

                    {/* Target Marker (Only show current target) */}
                    {currentStep && (
                        <Marker position={[currentStep.latitude, currentStep.longitude]} opacity={0.8}>
                            <Popup>Cible: {currentStep.title}</Popup>
                        </Marker>
                    )}

                    <MapRecenter lat={userPos.lat} lng={userPos.lng} />
                    <MapEvents />
                </MapContainer>
            </div>

            {/* HUD Footer */}
            <div className="absolute bottom-0 left-0 right-0 z-[1000] p-4 bg-white/90 backdrop-blur shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-2xl">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Prochaine étape</p>
                        <h3 className="text-lg font-bold text-slate-800">{currentStep?.title || "Fini !"}</h3>
                        <p className={`text-sm font-medium ${isNear ? 'text-green-600 animate-pulse' : 'text-blue-600'}`}>
                            📍 {Math.round(distance)}m {isNear ? "(Zone atteinte !)" : ""}
                        </p>
                    </div>
                    <Button
                        variant="game"
                        disabled={!isNear}
                        onClick={() => setIsRiddleOpen(true)}
                        className={`h-14 w-14 rounded-full p-0 flex items-center justify-center shadow-lg text-white transition-all transform active:scale-95 ${isNear ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-300'}`}
                    >
                        {/* Dynamic Icon based on type */}
                        {currentStep?.riddleType === 'photo' ? <Camera size={28} /> : <Map size={28} />}
                    </Button>
                </div>
            </div>

            {/* Exit Debug Button */}
            <div className="absolute top-20 right-4 z-[1000]">
                <Button variant="admin" className="bg-red-500/50 hover:bg-red-500 text-white text-xs h-8 px-2" onClick={() => navigate("/game")}>
                    Quit
                </Button>
            </div>

            {/* Riddle Modal */}
            {currentStep && (
                <RiddleModal
                    isOpen={isRiddleOpen}
                    step={currentStep}
                    onClose={() => setIsRiddleOpen(false)}
                    onSolve={handleSolve}
                />
            )}
        </div>
    )
}
