// Defina as dimensões da imagem do mapa
var mapWidth = 2000;  // Substitua com a largura real da sua imagem do mapa
var mapHeight = 1500; // Substitua com a altura real da sua imagem do mapa

// Inicializando o mapa
var map = L.map('map', {
    minZoom: -2,  // Permite o zoom out inicial para mostrar todo o mapa
    maxZoom: 0,   // Desativar o zoom in
    center: [0, 0],
    zoom: 0,
    crs: L.CRS.Simple  // Usamos o CRS.Simple porque estamos trabalhando com uma imagem estática
});

// Defina os limites da imagem (canto superior esquerdo e inferior direito)
var bounds = [[0, 0], [mapHeight, mapWidth]];

// Adicionando a imagem do mapa
var image = L.imageOverlay('mapa-pstory.png', bounds).addTo(map);

// Limitar o arraste do mapa para as bordas da imagem
map.setMaxBounds(bounds);

// Adicionar ícones de Pokémon
var hunts = [
    { coords: [500, 1000], name: "Hunt Pikachu", icon: 'pikachu.png', description: "Pokémon: Pikachu, Raichu" },
    { coords: [800, 1200], name: "Hunt Charizard", icon: 'charizard.png', description: "Pokémon: Charizard, Charmander" }
];

hunts.forEach(function(hunt) {
    var icon = L.icon({
        iconUrl: hunt.icon,  // O caminho do ícone de Pokémon (precisa adicionar a imagem ao projeto)
        iconSize: [50, 50],  // Tamanho do ícone
        iconAnchor: [25, 25], // Centralizar o ícone no ponto
        popupAnchor: [0, -25] // Ajustar onde o popup aparece em relação ao ícone
    });

    // Adicionar o marcador no mapa com um popup
    var marker = L.marker(hunt.coords, { icon: icon }).addTo(map);
    
    // Exibir popup com detalhes ao passar o mouse
    marker.bindTooltip(`<b>${hunt.name}</b><br>${hunt.description}`, {
        permanent: false,
        direction: 'top'
    });
});
