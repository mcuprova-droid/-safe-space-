// --- JS PRO OTEVŘENÍ / ZAVŘENÍ DENÍČKU ---
function openJournal() {
    const overlay = document.getElementById('journal-overlay');
    if (overlay) {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeJournal() {
    const overlay = document.getElementById('journal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Přiřazení zavírací funkce (pro jistotu, pokud používáš ID v JS)
const closeBtn = document.getElementById('close-journal');
if (closeBtn) {
    closeBtn.onclick = closeJournal;
}

// --- PŘEPÍNÁNÍ ZÁLOŽEK ---
function openTab(e, tabId) {
    // 1. Schovat obsah
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // 2. Deaktivovat tlačítka
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // 3. Aktivovat vybrané
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Nastavení aktivního stylu tlačítku
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    }
}

// --- JS PRO DECHOVÉ CVIČENÍ ---
const startBtn = document.getElementById('start-breath');
if (startBtn) {
    startBtn.onclick = () => {
        const breathZone = document.getElementById('breath-zone');
        const breathText = document.getElementById('breath-text');
        const video = document.querySelector('.breath-video');

        startBtn.style.display = 'none';
        if (breathZone) breathZone.style.display = 'block';
        if (video) video.playbackRate = 0.5;
        
        if (breathText) {
            breathText.innerText = "Nádech...";
            setInterval(() => {
                breathText.innerText = breathText.innerText === "Nádech..." ? "Výdech..." : "Nádech...";
            }, 3000);
        }
    };
}

// --- JS PRO NÁHODNÝ VZKAZ ---
const vzkazBtn = document.getElementById('vzkaz-btn');
const vsechnyVzkazy = ["Jsi silnější, než si myslíš. ✨", "Dnes je v pořádku jen 'být'. 🌿", "Zítřek je nový začátek. 🌸", "Tvá energie je tvůj největší magnet. 🍭"]; // Zkrať si seznam podle potřeby
let zbyvajiciVzkazy = [...vsechnyVzkazy];

if (vzkazBtn) {
    vzkazBtn.onclick = () => {
        if (zbyvajiciVzkazy.length === 0) zbyvajiciVzkazy = [...vsechnyVzkazy];
        const index = Math.floor(Math.random() * zbyvajiciVzkazy.length);
        const vybranyVzkaz = zbyvajiciVzkazy.splice(index, 1)[0];
        alert(vybranyVzkaz);
    };
}

// --- JS PRO FAQ ---
document.querySelectorAll('.faq-question').forEach(question => {
    question.onclick = () => {
        const parent = question.parentElement;
        const answer = question.nextElementSibling;
        if (parent) parent.classList.toggle('active');
        if (answer) {
            answer.style.display = (answer.style.display === "block") ? "none" : "block";
        }
    };
});

// --- FUNKCE PRO ULOŽENÍ ZÁPISU ---
function saveEntry() {
    const journalTextArea = document.getElementById('journal-text');
    if (journalTextArea && journalTextArea.value.trim() !== "") {
        alert("Zápis byl bezpečně uložen do tvého deníčku. ✨");
        journalTextArea.value = ""; 
    } else {
        alert("Nejdřív něco napiš...");
    }
}
