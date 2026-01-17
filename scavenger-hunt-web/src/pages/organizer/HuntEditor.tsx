import { useState } from "react"
import LeafletMap from "../../components/organizer/LeafletMap"
import StepSidebar from "../../components/organizer/StepSidebar"
import AIModal from "../../components/organizer/AIModal"
import { exportQRCodePDF } from "../../components/organizer/QRCodeExport"
import type { Step } from "../../types"

export default function HuntEditor() {
    const [steps, setSteps] = useState<Step[]>([])
    const [selectedStepId, setSelectedStepId] = useState<string | undefined>()
    const [isAIModalOpen, setIsAIModalOpen] = useState(false)

    const handleMapClick = (lat: number, lng: number) => {
        if (selectedStepId) {
            // Update existing step location if it's currently unplaced (0,0) or user just wants to move it
            // Logic: if selected, move it.
            setSteps(steps.map(s => s.id === selectedStepId ? { ...s, latitude: lat, longitude: lng } : s))
        } else {
            // Create new step
            const newStep: Step = {
                id: crypto.randomUUID(),
                title: `Étape ${steps.length + 1}`,
                enigma: "",
                solution: "",
                latitude: lat,
                longitude: lng,
                isPausePoint: false
            }
            setSteps([...steps, newStep])
            setSelectedStepId(newStep.id)
        }
    }

    const handleUpdateStep = (id: string, updates: Partial<Step>) => {
        setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s))
    }

    const handleDeleteStep = (id: string) => {
        setSteps(steps.filter(s => s.id !== id))
        if (selectedStepId === id) setSelectedStepId(undefined)
    }

    const handleGenerateAI = (generatedSteps: Step[]) => {
        setSteps([...steps, ...generatedSteps])
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="flex-1 relative">
                <LeafletMap
                    steps={steps}
                    onAddStep={handleMapClick}
                    onSelectStep={setSelectedStepId}
                    selectedStepId={selectedStepId}
                />
            </div>
            <StepSidebar
                steps={steps}
                selectedStepId={selectedStepId}
                onReorder={setSteps}
                onSelectStep={setSelectedStepId}
                onUpdateStep={handleUpdateStep}
                onDeleteStep={handleDeleteStep}
                onOpenAI={() => setIsAIModalOpen(true)}
                onExportQR={() => exportQRCodePDF("Ma Super Chasse")}
            />

            <AIModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onGenerate={handleGenerateAI}
            />
        </div>
    )
}
