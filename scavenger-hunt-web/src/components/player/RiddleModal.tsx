import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import type { Step } from "../../types"

interface RiddleModalProps {
    readonly isOpen: boolean;
    readonly step: Step;
    readonly onClose: () => void;
    readonly onSolve: () => void;
}

export default function RiddleModal({ isOpen, step, onClose, onSolve }: RiddleModalProps) {
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState("")

    if (!isOpen) return null

    const handleSubmit = () => {
        if (step.riddleType === 'info') {
            onSolve()
            return
        }

        if (step.riddleType === 'photo') {
            // Mock photo validation
            if (answer) { // assuming answer holds valid file/url mock
                onSolve()
            } else {
                // For MVP allow empty photo or just mock it
                onSolve()
            }
            return
        }

        // Text validation (Simple exact match for MVP, should be fuzzy)
        if (answer.toLowerCase().trim() === step.solution.toLowerCase().trim()) {
            onSolve()
        } else {
            setError("Ce n'est pas la bonne réponse. Cherchez encore !")
        }
    }

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-4 border-2 border-amber-500">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-amber-900 mb-2">{step.title}</h2>
                    <div className="bg-amber-50 p-4 rounded-lg text-amber-900 font-serif italic border border-amber-100 mb-4">
                        "{step.enigma}"
                    </div>
                </div>

                {step.riddleType === 'text' && (
                    <div>
                        <Input
                            variant="game"
                            placeholder="Votre réponse..."
                            value={answer}
                            onChange={e => {
                                setAnswer(e.target.value)
                                setError("")
                            }}
                        />
                    </div>
                )}

                {step.riddleType === 'photo' && (
                    <div className="text-center">
                        <label className="block w-full p-4 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors">
                            <span className="text-amber-800 font-medium">📸 Prendre une photo</span>
                            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={() => setAnswer("mock_photo.jpg")} />
                        </label>
                        {answer && <p className="text-xs text-green-600 mt-2">Photo enregistrée !</p>}
                    </div>
                )}

                {step.riddleType === 'info' && (
                    <p className="text-center text-slate-600">Lisez attentivement le message ci-dessus.</p>
                )}

                {error && <p className="text-red-500 text-sm text-center font-bold animate-bounce">{error}</p>}

                <div className="flex gap-2 pt-2">
                    <Button variant="game" className="flex-1 bg-slate-200 text-slate-800" onClick={onClose}>
                        Retour
                    </Button>
                    <Button variant="game" className="flex-1 bg-green-600 text-white" onClick={handleSubmit}>
                        {step.riddleType === 'info' ? "J'ai compris" : "Valider"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
