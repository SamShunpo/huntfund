import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"

export default function DesignShowcase() {
    return (
        <div className="min-h-screen bg-neutral-100 p-8 flex flex-col gap-12">
            <h1 className="text-3xl font-bold text-center mb-8">Dual Theme Design System</h1>

            {/* Admin Theme Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-700">Admin Theme (Dashboard)</h2>
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-lg space-y-6">
                    <div className="flex gap-4 items-center">
                        <Button variant="admin">Primary Button</Button>
                        <Button variant="admin" disabled>Disabled</Button>
                        <Input variant="admin" placeholder="Search users..." className="w-64" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card variant="admin">
                            <CardHeader>
                                <CardTitle>Total Teams</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">24</p>
                                <p className="text-sm text-slate-500">+12% from last week</p>
                            </CardContent>
                        </Card>
                        <Card variant="admin">
                            <CardHeader>
                                <CardTitle>Active Hunts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">3</p>
                                <p className="text-sm text-slate-500">All systems operational</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Game Theme Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-stone-700">Game Theme (Adventure)</h2>
                <div className="p-8 bg-stone-900 rounded-xl space-y-6 relative overflow-hidden">
                    {/* Background mimicking the theme setup somewhat for preview */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10 pointer-events-none"></div>

                    <div className="flex flex-col gap-4 items-center relative z-10">
                        <Button variant="game">Commencer l'aventure</Button>
                        <Input variant="game" placeholder="Entrez le code secret..." className="w-full max-w-md" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-6">
                        <Card variant="game">
                            <CardHeader>
                                <CardTitle>Énigme #1</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg italic">"Je suis le début de la fin et la fin des temps..."</p>
                            </CardContent>
                        </Card>
                        <Card variant="game">
                            <CardHeader>
                                <CardTitle>Statut de l'équipe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl text-amber-500 font-bold">En cours</p>
                                <p className="text-stone-400">Temps écoulé: 45m</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}
