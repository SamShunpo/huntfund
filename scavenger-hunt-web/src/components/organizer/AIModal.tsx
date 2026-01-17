import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { api } from "../../services/api"
import type { Step } from "../../types"

interface AIModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (newSteps: Step[]) => void;
}

export default function AIModal({ isOpen, onClose, onGenerate }: AIModalProps) {
    const [city, setCity] = useState("")
    const [theme, setTheme] = useState("")
    const [audience, setAudience] = useState("Famille")
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const result = await api.generateHunt({ city, theme, audience })
            // Transform Mock result to internal Step format
            // API now returns { hunt_overview: {...}, steps: [...] }
            const newSteps: Step[] = result.steps.map((s: any) => ({
                id: crypto.randomUUID(),
                title: s.title,
                enigma: s.riddle_content, // Changed from s.enigma
                solution: s.solution || "",
                latitude: 0, // AI does not provide coords
                longitude: 0,
                isPausePoint: s.is_pause_point || false,
                // New fields
                locationClue: s.location_clue,
                riddleType: s.riddle_type,
                hint: s.hint
            }))
            onGenerate(newSteps)
            onClose()
        } catch (e) {
            console.error(e)
            alert("Erreur lors de la génération")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Générer avec l'IA ✨</h2>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Ville / Lieu</label>
                        <Input variant="admin" placeholder="ex: Paris, Parc de Sceaux..." value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Thème</label>
                        <Input variant="admin" placeholder="ex: Pirates, Enquête policière..." value={theme} onChange={e => setTheme(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600 block mb-1">Public</label>
                        <Input variant="admin" placeholder="ex: Enfants 10 ans" value={audience} onChange={e => setAudience(e.target.value)} />
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="admin" className="bg-slate-200 text-slate-800 hover:bg-slate-300" onClick={onClose}>Annuler</Button>
                    <Button variant="admin" onClick={handleGenerate} disabled={loading || !city || !theme}>
                        {loading ? "Génération..." : "Générer"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
