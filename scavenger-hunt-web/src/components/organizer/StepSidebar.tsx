import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Step } from "../../types"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
// import { Card, CardContent } from "../ui/Card"
import { GripVertical, Trash2 } from "lucide-react"

interface StepSidebarProps {
    steps: Step[];
    selectedStepId?: string;
    onReorder: (newSteps: Step[]) => void;
    onSelectStep: (id: string) => void;
    onUpdateStep: (id: string, updates: Partial<Step>) => void;
    onDeleteStep: (id: string) => void;
    onOpenAI: () => void;
    onExportQR: () => void;
}

function SortableItem({ step, isSelected, onClick }: { step: Step; isSelected: boolean; onClick: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} className="mb-2">
            <div
                className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
                onClick={onClick}
            >
                <div {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-600">
                    <GripVertical size={20} />
                </div>
                <div className="flex-1 font-medium truncate">
                    {step.title || "Nouvelle étape"}
                </div>
                {step.isPausePoint && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Pause</span>}
            </div>
        </div>
    )
}

export default function StepSidebar({
    steps, selectedStepId, onReorder, onSelectStep, onUpdateStep, onDeleteStep, onOpenAI, onExportQR
}: StepSidebarProps) {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = steps.findIndex((s) => s.id === active.id)
            const newIndex = steps.findIndex((s) => s.id === over?.id)
            onReorder(arrayMove(steps, oldIndex, newIndex))
        }
    }

    const selectedStep = steps.find(s => s.id === selectedStepId)

    return (
        <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200 w-96 font-sans">
            <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800">Étapes ({steps.length})</h2>
                <div className="flex gap-2">
                    <Button variant="admin" onClick={onOpenAI} className="bg-purple-600 hover:bg-purple-700">
                        ✨ IA
                    </Button>
                    <Button variant="admin" onClick={onExportQR} className="bg-slate-800">
                        QR
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={steps} strategy={verticalListSortingStrategy}>
                        {steps.map((step) => (
                            <SortableItem
                                key={step.id}
                                step={step}
                                isSelected={selectedStepId === step.id}
                                onClick={() => onSelectStep(step.id)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                {steps.length === 0 && (
                    <div className="text-center text-slate-400 mt-10">
                        <p>Cliquez sur la carte pour ajouter une étape.</p>
                    </div>
                )}
            </div>

            {selectedStep && (
                <div className="p-4 border-t border-slate-200 bg-white">
                    <h3 className="font-semibold mb-3 text-slate-700">Éditer l'étape</h3>
                    <div className="space-y-3">
                        {selectedStep.locationClue && (
                            <div className="bg-amber-50 border border-amber-200 p-2 rounded text-xs text-amber-800 mb-2">
                                <strong>📍 Indice de placement :</strong> {selectedStep.locationClue}
                            </div>
                        )}
                        {(selectedStep.latitude === 0 && selectedStep.longitude === 0) && (
                            <div className="bg-red-50 border border-red-200 p-2 rounded text-xs text-red-600 mb-2 animate-pulse">
                                ⚠️ Cliquez sur la carte pour placer ce point !
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Titre</label>
                            <Input
                                variant="admin"
                                value={selectedStep.title}
                                onChange={(e) => onUpdateStep(selectedStep.id, { title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Énigme</label>
                            <textarea
                                className="w-full min-h-[80px] p-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-950"
                                value={selectedStep.enigma}
                                onChange={(e) => onUpdateStep(selectedStep.id, { enigma: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Solution</label>
                            <Input
                                variant="admin"
                                value={selectedStep.solution}
                                onChange={(e) => onUpdateStep(selectedStep.id, { solution: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={selectedStep.isPausePoint}
                                    onChange={(e) => onUpdateStep(selectedStep.id, { isPausePoint: e.target.checked })}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                Point Buvette 🍺
                            </label>
                            <Button
                                variant="admin"
                                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 h-8 px-3"
                                onClick={() => onDeleteStep(selectedStep.id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
