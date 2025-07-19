document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            description: "This tool helps you find the location ID for the Idealista Scraper. Select a country and type to filter locations, or search by name/ID prefix.",
            access: "Access the scraper:",
            createdBy: "Created by ProChat",
            countryLabel: "Country",
            selectCountry: "Select a country",
            typeLabel: "Type",
            selectType: "Select a type",
            searchNameLabel: "Search by name",
            searchIdLabel: "Search by ID prefix",
            resultsTitle: "Results",
            nameHeader: "Name",
            typeHeader: "Type",
            idHeader: "ID",
            actionHeader: "Action",
            noResults: "No locations found. Please adjust your filters or search criteria.",
            copy: "Copy",
            resultsCount: (count) => `${count} locations found`,
            copiedMessage: "ID copied to clipboard!"
        },
        es: {
            description: "Esta herramienta te ayuda a encontrar el ID de ubicación para el Idealista Scraper. Selecciona un país y tipo para filtrar ubicaciones, o busca por nombre/prefijo de ID.",
            access: "Accede al scraper:",
            createdBy: "Creado por ProChat",
            countryLabel: "País",
            selectCountry: "Selecciona un país",
            typeLabel: "Tipo",
            selectType: "Selecciona un tipo",
            searchNameLabel: "Buscar por nombre",
            searchIdLabel: "Buscar por prefijo de ID",
            resultsTitle: "Resultados",
            nameHeader: "Nombre",
            typeHeader: "Tipo",
            idHeader: "ID",
            actionHeader: "Acción",
            noResults: "No se encontraron ubicaciones. Ajusta tus filtros o criterios de búsqueda.",
            copy: "Copiar",
            resultsCount: (count) => `${count} ubicaciones encontradas`,
            copiedMessage: "¡ID copiado al portapapeles!"
        },
        it: {
            description: "Questo strumento ti aiuta a trovare l'ID della posizione per Idealista Scraper. Seleziona un paese e un tipo per filtrare le posizioni o cerca per nome/prefisso ID.",
            access: "Accedi allo scraper:",
            createdBy: "Creato da ProChat",
            countryLabel: "Paese",
            selectCountry: "Seleziona un paese",
            typeLabel: "Tipo",
            selectType: "Seleziona un tipo",
            searchNameLabel: "Cerca per nome",
            searchIdLabel: "Cerca per prefisso ID",
            resultsTitle: "Risultati",
            nameHeader: "Nome",
            typeHeader: "Tipo",
            idHeader: "ID",
            actionHeader: "Azione",
            noResults: "Nessuna posizione trovata. Modifica i filtri o i criteri di ricerca.",
            copy: "Copia",
            resultsCount: (count) => `${count} posizioni trovate`,
            copiedMessage: "ID copiato negli appunti!"
        },
        pt: {
            description: "Esta ferramenta ajuda você a encontrar o ID de localização para o Idealista Scraper. Selecione um país e tipo para filtrar locais ou pesquise por nome/prefixo de ID.",
            access: "Acesse o scraper:",
            createdBy: "Criado por ProChat",
            countryLabel: "País",
            selectCountry: "Selecione um país",
            typeLabel: "Tipo",
            selectType: "Selecione um tipo",
            searchNameLabel: "Pesquisar por nome",
            searchIdLabel: "Pesquisar por prefixo de ID",
            resultsTitle: "Resultados",
            nameHeader: "Nome",
            typeHeader: "Tipo",
            idHeader: "ID",
            actionHeader: "Ação",
            noResults: "Nenhum local encontrado. Ajuste seus filtros ou critérios de pesquisa.",
            copy: "Copiar",
            resultsCount: (count) => `${count} locais encontrados`,
            copiedMessage: "ID copiado para a área de transferência!"
        }
    };

    let currentLanguage = 'en';
    let locationData = {
        es: [],
        it: [],
        pt: []
    };

    const elements = {
        descriptionText: document.getElementById('description-text'),
        accessText: document.getElementById('access-text'),
        createdByText: document.getElementById('created-by-text'),
        countryLabel: document.getElementById('country-label'),
        selectCountryText: document.getElementById('select-country-text'),
        typeLabel: document.getElementById('type-label'),
        selectTypeText: document.getElementById('select-type-text'),
        searchNameLabel: document.getElementById('search-name-label'),
        searchIdLabel: document.getElementById('search-id-label'),
        resultsTitle: document.getElementById('results-title'),
        nameHeader: document.getElementById('name-header'),
        typeHeader: document.getElementById('type-header'),
        idHeader: document.getElementById('id-header'),
        actionHeader: document.getElementById('action-header'),
        noResultsText: document.getElementById('no-results-text'),
        resultsCount: document.getElementById('results-count'),
        copiedMessage: document.getElementById('copied-message'),
        countrySelect: document.getElementById('country'),
        typeSelect: document.getElementById('type'),
        searchName: document.getElementById('search-name'),
        searchId: document.getElementById('search-id'),
        resultsList: document.getElementById('results-list'),
        langButtons: {
            en: document.getElementById('lang-en'),
            es: document.getElementById('lang-es'),
            it: document.getElementById('lang-it'),
            pt: document.getElementById('lang-pt')
        }
    };

    async function loadData() {
        try {
            const [esData, itData, ptData] = await Promise.all([
                fetch('https://igolaizola.github.io/idealista-scraper/data/es.json').then(res => res.json()),
                fetch('https://igolaizola.github.io/idealista-scraper/data/it.json').then(res => res.json()),
                fetch('https://igolaizola.github.io/idealista-scraper/data/pt.json').then(res => res.json())
            ]);
            
            locationData.es = esData;
            locationData.it = itData;
            locationData.pt = ptData;
            
            elements.countrySelect.value = 'es';
            updateResults();
        } catch (error) {
            console.error('Error loading data:', error);
            elements.resultsList.innerHTML = `<div class="no-results" style="color: red;">Error loading location data. Please try again later.</div>`;
        }
    }

    function updateLanguage(lang) {
        currentLanguage = lang;
        const t = translations[lang];

        elements.descriptionText.textContent = t.description;
        elements.accessText.innerHTML = t.access;
        elements.createdByText.innerHTML = t.createdBy;
        elements.countryLabel.textContent = t.countryLabel;
        elements.selectCountryText.textContent = t.selectCountry;
        elements.typeLabel.textContent = t.typeLabel;
        elements.selectTypeText.textContent = t.selectType;
        elements.searchNameLabel.textContent = t.searchNameLabel;
        elements.searchIdLabel.textContent = t.searchIdLabel;
        elements.resultsTitle.textContent = t.resultsTitle;
        elements.nameHeader.textContent = t.nameHeader;
        elements.typeHeader.textContent = t.typeHeader;
        elements.idHeader.textContent = t.idHeader;
        elements.actionHeader.textContent = t.actionHeader;
        elements.noResultsText.textContent = t.noResults;
        elements.copiedMessage.textContent = t.copiedMessage;

        Object.keys(elements.langButtons).forEach(key => {
            elements.langButtons[key].classList.toggle('active', key === lang);
        });

        updateResults();
    }

    function filterLocations() {
        const country = elements.countrySelect.value;
        const type = elements.typeSelect.value;
        const nameSearch = elements.searchName.value.toLowerCase();
        const idSearch = elements.searchId.value.toLowerCase();
        
        if (!country) return [];
        
        let filtered = locationData[country];
        
        if (type) {
            filtered = filtered.filter(loc => loc.type === type);
        }
        
        if (nameSearch) {
            filtered = filtered.filter(loc => 
                loc.name.toLowerCase().includes(nameSearch)
            );
        }
        
        if (idSearch) {
            filtered = filtered.filter(loc => 
                loc.id.toLowerCase().startsWith(idSearch)
            );
        }
        
        return filtered;
    }

    function updateResults() {
        const filtered = filterLocations();
        const t = translations[currentLanguage];
        
        elements.resultsList.innerHTML = '';

        if (filtered.length === 0) {
            elements.resultsList.innerHTML = `<div class="no-results">${t.noResults}</div>`;
            elements.resultsCount.textContent = t.resultsCount(0);
            return;
        }
        
        filtered.forEach(location => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.dataset.id = location.id;
            item.innerHTML = `
                <div class="col-name">${location.name}</div>
                <div class="col-type">${location.type}</div>
                <div class="col-id">${location.id}</div>
                <div class="col-action">
                    <button class="copy-btn">${t.copy}</button>
                </div>
            `;
            elements.resultsList.appendChild(item);
        });
        
        elements.resultsCount.textContent = t.resultsCount(filtered.length);

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.closest('.result-item').dataset.id;
                copyToClipboard(id);
            });
        });

        document.querySelectorAll('.result-item').forEach(row => {
            row.addEventListener('click', () => {
                const id = row.dataset.id;
                copyToClipboard(id);
            });
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            elements.copiedMessage.classList.add('show');
            setTimeout(() => {
                elements.copiedMessage.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text:', err);
        });
    }

    function init() {
        loadData();
        updateLanguage('en');

        Object.keys(elements.langButtons).forEach(key => {
            elements.langButtons[key].addEventListener('click', () => updateLanguage(key));
        });

        elements.countrySelect.addEventListener('change', updateResults);
        elements.typeSelect.addEventListener('change', updateResults);
        elements.searchName.addEventListener('input', updateResults);
        elements.searchId.addEventListener('input', updateResults);
    }

    init();
});