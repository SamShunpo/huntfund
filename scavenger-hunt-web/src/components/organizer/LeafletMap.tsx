import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Step } from "../../types"
// Fix for default marker icon in React Leaflet
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
    steps: Step[];
    onAddStep: (lat: number, lng: number) => void;
    onSelectStep: (id: string) => void;
    selectedStepId?: string;
}

function LocationMarker({ onAddStep }: { onAddStep: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onAddStep(e.latlng.lat, e.latlng.lng)
        },
    })
    return null
}

export default function LeafletMap({ steps, onAddStep, onSelectStep, selectedStepId }: LeafletMapProps) {
    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onAddStep={onAddStep} />
            {steps.map((step, index) => (
                <Marker
                    key={step.id}
                    position={[step.latitude, step.longitude]}
                    eventHandlers={{
                        click: () => onSelectStep(step.id),
                    }}
                    opacity={selectedStepId === step.id ? 1.0 : 0.7}
                >
                    <Popup>
                        <strong>#{index + 1}: {step.title}</strong><br />
                        {step.enigma.substring(0, 30)}...
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
