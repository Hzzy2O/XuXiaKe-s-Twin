import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

interface Location {
  coords: [number, number];
  name: string;
  description: string;
}

const locations: Location[] = [
  { coords: [31.4926, 120.3119], name: "Jiangyin", description: "Xu Xiake's hometown, where he eventually passed away after returning from years of travel." },
  { coords: [31.4167, 120.2833], name: "Taihu Lake", description: "Xu Xiake's first journey, traveling from his hometown to Taihu Lake. The travel record is incomplete." },
  { coords: [36.6512, 117.1201], name: "Shandong", description: "Xu Xiake traveled to the land of Qi and Lu, visited Confucius' Cemetery, and paid homage to the Temple of Mencius, reflecting on Confucian culture." },
  { coords: [36.2707, 117.1010], name: "Mount Tai", description: "Xu Xiake climbed Mount Tai, contemplated nature and history, and expressed his grand ambitions in his writings." },
  { coords: [32.0584, 118.7965], name: "Nanjing", description: "Visited Jinling (now Nanjing), recording the bustling city and its rich cultural heritage." },
  { coords: [29.8683, 121.5440], name: "Ningbo", description: "Walked alone to Ningbo, continuing to explore famous historical sites in eastern Zhejiang." },
  { coords: [29.1518, 120.6283], name: "Mount Tiantai", description: "In the opening of his travel notes, Xu Xiake recorded the beautiful scenery of Mount Tiantai." },
  { coords: [28.3763, 121.0450], name: "Mount Yandang", description: "Xu Xiake described the steep peaks and spectacular scenery of Mount Yandang in his travel notes." },
  { coords: [29.7132, 118.3390], name: "Mount Huang", description: "Xu Xiake visited Mount Huang twice, leaving a deep impression of its unique peaks and sea of clouds." },
  { coords: [30.2741, 120.1551], name: "Hangzhou", description: "Visited West Lake, immersed in the harmony of natural beauty and historical culture." },
  { coords: [27.6224, 117.9423], name: "Mount Wuyi", description: "Explored the Nine-Bend Stream of Mount Wuyi, experiencing the majesty of the Danxia landform and the tranquility of nature." },
  { coords: [29.5517, 115.9928], name: "Mount Lu", description: "Mount Lu attracted Xu Xiake with its grand and magnificent scenery, which he recorded in his notes." },
  { coords: [28.6820, 115.8579], name: "Nanchang", description: "Passed through Nanchang in Jiangxi, recording the beautiful scenery of Poyang Lake in his travel notes." },
  { coords: [23.5013, 117.9111], name: "Jiuli Lake", description: "Visited Jiuli Lake in Fujian, witnessing the grandeur of the tidal bore on the Qiantang River." },
  { coords: [34.5195, 112.4295], name: "Mount Song", description: "Climbed Mount Song, reflecting on the culture and history of the Central Plains." },
  { coords: [34.4831, 110.0838], name: "Mount Hua", description: "Xu Xiake visited Mount Hua, recording the steep peaks and unique terrain in his travel notes." },
  { coords: [32.4050, 111.1926], name: "Mount Wudang", description: "Visited Mount Wudang, experiencing the deep roots of Taoist culture." },
  { coords: [39.9042, 116.4074], name: "Beijing", description: "Visited the capital city, exploring the political and cultural center of the Ming and Qing dynasties." },
  { coords: [38.8482, 117.3139], name: "Tianjin", description: "Traveled through Tianjin, continuing his journey in the north, experiencing the confluence of the Grand Canal and Hai River." },
  { coords: [40.0768, 117.4192], name: "Mount Pan", description: "Climbed Mount Pan in Jixian, appreciating the natural beauty of the northern mountains." },
  { coords: [39.0580, 113.7722], name: "Mount Heng", description: "Visited Mount Heng, where Xu Xiake felt the mysterious aura of this Taoist sacred mountain." },
  { coords: [39.0150, 113.7295], name: "Mount Wutai", description: "Mount Wutai is a Buddhist holy site, and Xu Xiake was deeply impressed by his journey here." },
  { coords: [24.8801, 102.8329], name: "Kunming", description: "Reached Kunming during his long journey, admiring the beauty of Dian Lake and the multi-ethnic culture." },
  { coords: [26.8768, 100.2292], name: "Lijiang", description: "Explored Lijiang, experiencing the ancient Tea Horse Road culture and unique natural landscapes." },
  { coords: [25.2343, 110.1801], name: "Guilin", description: "Xu Xiake traveled to Guilin, personally experiencing the renowned beauty of 'Guilin’s scenery is unmatched in the world'." },
  { coords: [25.7769, 114.3722], name: "Ganzhou", description: "Traveled through Ganzhou, exploring the ancient history and local customs of the Gan River basin." }
]

interface MapProps {
  onSelectLocation: (location: string) => void;
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function Map({ onSelectLocation }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([30.5928, 114.3055], 5)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)

      const travelPath = locations.map(loc => loc.coords)
      L.polyline(travelPath as L.LatLngExpression[], { color: 'red' }).addTo(mapRef.current)

      locations.forEach((loc) => {
        L.marker(loc.coords)
            .addTo(mapRef.current!)
            .bindPopup(`<b>${loc.name}</b><br>${loc.description}`)
            .on('click', () => {
            onSelectLocation(loc.name)
            })
        })
    }
  }, [onSelectLocation])

  return <div>
        <h1 className="text-xl font-bold text-center mb-8">Click on the markers in the map to learn about Xu Xiake’s experiences in the area.</h1>
        <div id="map" className="h-96 rounded-lg"></div>
    </div>
}
