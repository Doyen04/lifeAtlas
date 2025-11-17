import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMemo } from 'react'
import type { JSX } from 'react'

// Create custom icon with inline SVG to avoid image loading issues
function createCustomIcon(color: string) {
    return L.divIcon({
        html: `
            <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    width: 8px;
                    height: 8px;
                    background-color: white;
                    border-radius: 50%;
                "></div>
            </div>
        `,
        className: 'custom-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
    })
}

// Define biodiversity hotspots across the globe
interface Hotspot {
    name: string
    region: string
    lat: number
    lng: number
    imageCount: number
    species: string[]
    color: string
}

const BIODIVERSITY_HOTSPOTS: Hotspot[] = [
    {
        name: 'Congo Basin',
        region: 'Africa',
        lat: 2.0,
        lng: 24.0,
        imageCount: 12450,
        species: ['Forest Elephant', 'Lowland Gorilla', 'Forest Buffalo'],
        color: '#dc2626',
    },
    {
        name: 'Serengeti',
        region: 'Africa',
        lat: -2.5,
        lng: 35.0,
        imageCount: 18920,
        species: ['African Lion', 'Wildebeest', 'Zebra'],
        color: '#ea580c',
    },
    {
        name: 'Amazon Rainforest',
        region: 'South America',
        lat: -3.0,
        lng: -60.0,
        imageCount: 24680,
        species: ['Jaguar', 'Macaw', 'Anaconda'],
        color: '#16a34a',
    },
    {
        name: 'Borneo',
        region: 'Asia',
        lat: 1.5,
        lng: 113.0,
        imageCount: 16230,
        species: ['Orangutan', 'Proboscis Monkey', 'Rafflesia'],
        color: '#059669',
    },
    {
        name: 'Madagascar',
        region: 'Africa',
        lat: -19.0,
        lng: 47.0,
        imageCount: 9850,
        species: ['Lemur', 'Chameleon', 'Fossa'],
        color: '#d97706',
    },
    {
        name: 'Great Barrier Reef',
        region: 'Oceania',
        lat: -18.3,
        lng: 147.7,
        imageCount: 14560,
        species: ['Clownfish', 'Sea Turtle', 'Coral Polyp'],
        color: '#0891b2',
    },
    {
        name: 'Arctic Tundra',
        region: 'Arctic',
        lat: 70.0,
        lng: 25.0,
        imageCount: 8340,
        species: ['Polar Bear', 'Arctic Fox', 'Musk Ox'],
        color: '#2563eb',
    },
    {
        name: 'Himalayan Mountains',
        region: 'Asia',
        lat: 28.0,
        lng: 87.0,
        imageCount: 11250,
        species: ['Snow Leopard', 'Red Panda', 'Himalayan Tahr'],
        color: '#7c3aed',
    },
]

export function GlobalMap(): JSX.Element {
    // Create custom icons for each hotspot color
    const customIcons = useMemo(() => {
        const icons: Record<string, L.DivIcon> = {}
        BIODIVERSITY_HOTSPOTS.forEach((hotspot) => {
            icons[hotspot.name] = createCustomIcon(hotspot.color)
        })
        return icons
    }, [])

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
            <MapContainer
                center={[20, 0] as LatLngExpression}
                zoom={2}
                className="w-full h-full"
                style={{ minHeight: '600px' }}
                scrollWheelZoom={true}
            >
                {/* OpenStreetMap tiles */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                    maxZoom={19}
                />

                {/* Render biodiversity hotspots */}
                {BIODIVERSITY_HOTSPOTS.map((hotspot) => (
                    <div key={hotspot.name}>
                        {/* Animated circle marker showing hotspot area */}
                        <CircleMarker
                            center={[hotspot.lat, hotspot.lng] as LatLngExpression}
                            radius={Math.sqrt(hotspot.imageCount / 100)}
                            pathOptions={{
                                fillColor: hotspot.color,
                                fillOpacity: 0.6,
                                stroke: true,
                                color: hotspot.color,
                                weight: 2,
                                opacity: 0.8,
                            }}
                        >
                            <Popup>
                                <div className="w-48">
                                    <h3 className="font-bold text-gray-900 mb-1">{hotspot.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{hotspot.region}</p>
                                    <div className="mb-2 pb-2 border-b border-gray-200">
                                        <p className="text-xs text-gray-700">
                                            <span className="font-semibold">{hotspot.imageCount.toLocaleString()}</span> images
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700 mb-1">Species:</p>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {hotspot.species.map((sp) => (
                                                <li key={sp} className="flex items-center">
                                                    <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: hotspot.color }}></span>
                                                    {sp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>

                        {/* Marker for exact location */}
                        <Marker position={[hotspot.lat, hotspot.lng] as LatLngExpression} icon={customIcons[hotspot.name]}>
                            <Popup>{hotspot.name}</Popup>
                        </Marker>
                    </div>
                ))}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-400 max-w-xs">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Biodiversity Hotspots</h4>
                <div className="space-y-2">
                    {BIODIVERSITY_HOTSPOTS.slice(0, 4).map((hotspot) => (
                        <div key={hotspot.name} className="flex items-center gap-2 text-xs">
                            <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: hotspot.color }}
                            ></div>
                            <span className="text-gray-700">{hotspot.name}</span>
                        </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                        Circle size represents image count
                    </p>
                </div>
            </div>
        </div>
    )
}
