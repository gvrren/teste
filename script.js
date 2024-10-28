function showSection(section) {
    // Oculta todas as seções
    document.querySelectorAll('.section, #map, #menu').forEach(el => el.style.display = 'none');

    // Exibe a seção selecionada
    if (section === 'map') {
        document.getElementById('map').style.display = 'block';
        document.getElementById('menu').style.display = 'block';
    } else {
        document.getElementById(section).style.display = 'block';
    }
}

// Carrega o Mapa automaticamente na primeira visita
showSection('map');

// Configuração do Mapa com Leaflet.js
var mapWidth = 2000;  // Largura da imagem do mapa
var mapHeight = 1500; // Altura da imagem do mapa

var map = L.map('map', {
    minZoom: -2,
    maxZoom: 0,
    center: [0, 0],
    zoom: 0,
    crs: L.CRS.Simple
});

var bounds = [[0, 0], [mapHeight, mapWidth]];
var image = L.imageOverlay('mapa-pstory.png', bounds).addTo(map);
map.setMaxBounds(bounds);

// Dados para Hunts, Equipe Rocket, Quests, etc.
var locations = {
    hunts: [
        { coords: [500, 1000], icon: 'icons/pokeball.png', description: "Hunt de Pokémon" }
    ],
    rocket: [
        { coords: [600, 900], icon: 'icons/rocket.png', description: "Spawn da Equipe Rocket" }
    ],
    quest: [
        { coords: [400, 1000], icon: 'icons/quest.png', description: "Local de Quest" }
    ],
    wild: [
        { coords: [750, 1200], icon: 'icons/wild.png', description: "Entrada da Wild Area" }
    ]
};

// Função para adicionar os marcadores no mapa com base nos filtros
function updateMarkers() {
    L.layerGroup().clearLayers();

    if (document.getElementById('filter-hunts').checked) {
        locations.hunts.forEach(hunt => addMarker(hunt));
    }
    if (document.getElementById('filter-rocket').checked) {
        locations.rocket.forEach(rocket => addMarker(rocket));
    }
    if (document.getElementById('filter-quest').checked) {
        locations.quest.forEach(quest => addMarker(quest));
    }
    if (document.getElementById('filter-wild').checked) {
        locations.wild.forEach(wild => addMarker(wild));
    }
}

// Função para adicionar marcadores
function addMarker(location) {
    var icon = L.icon({
        iconUrl: location.icon,
        iconSize: [30, 30]
    });
    L.marker(location.coords, { icon: icon }).addTo(map).bindPopup(location.description);
}

// Atualiza os marcadores quando o filtro muda
document.querySelectorAll('#menu input[type=checkbox]').forEach(input => {
    input.addEventListener('change', updateMarkers);
});

// Atualiza os marcadores inicialmente
updateMarkers();
