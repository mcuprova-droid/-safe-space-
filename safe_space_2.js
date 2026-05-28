// --- 1. JS PRO OTEVŘENÍ / ZAVŘENÍ DENÍČKU ---
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

// --- 2. PŘEPÍNÁNÍ ZÁLOŽEK ---
function openTab(e, tabId) {
    // Schovat obsah všech záložek
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Deaktivovat všechna tlačítka záložek
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Aktivovat vybranou záložku
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Nastavení aktivního stylu stisknutému tlačítku
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    }

    // Pokud uživatel klikne na minulé zápisky, ihned je načteme z paměti
    if (tabId === 'past-entries') {
        displayEntries();
    }
}

// --- 3. FUNKCE PRO NAČTENÍ A ZOBRAZENÍ MINULÝCH ZÁPISKŮ ---
function displayEntries() {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;

    // Bezpečné načtení zápisků z localStorage prohlížeče
    const entries = JSON.parse(localStorage.getItem('safeSpaceEntries')) || [];

    if (entries.length === 0) {
        entriesList.innerHTML = "<p>Zatím tu nejsou žádné zápisky.</p>";
        return;
    }

    // Seřazení od nejnovějšího po nejstarší a vykreslení do čistých boxů
    entriesList.innerHTML = entries.slice().reverse().map(entry => `
        <div style="background: var(--mist, #F4F5FF); padding: 20px; border-radius: 20px; margin-bottom: 15px; text-align: left; border: 1px solid rgba(0,0,0,0.02);">
            <div style="font-size: 0.85rem; color: #888; margin-bottom: 8px; font-weight: 500;">${entry.date}</div>
            <p style="white-space: pre-wrap; line-height: 1.5; color: var(--text, #2D2D2D); font-size: 1rem;">${entry.text}</p>
        </div>
    `).join('');
}

// --- 4. FUNKCE PRO UKLÁDÁNÍ DO DENÍČKU ---
function saveEntry() {
    const journalTextArea = document.getElementById('journal-text');
    
    if (journalTextArea && journalTextArea.value.trim() !== "") {
        const text = journalTextArea.value.trim();
        
        // Získání aktuálního data a času zápisu
        const now = new Date();
        const formattedDate = `${now.getDate()}. ${now.getMonth() + 1}. ${now.getFullYear()} v ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        // Vytáhnutí starých dat, přidání nového zápisu a uložení zpět
        const entries = JSON.parse(localStorage.getItem('safeSpaceEntries')) || [];
        entries.push({ text: text, date: formattedDate });
        localStorage.setItem('safeSpaceEntries', JSON.stringify(entries));

        alert("Zápis byl bezpečně uložen do tvého deníčku. ✨");
        journalTextArea.value = ""; // Vyprázdnění textové oblasti
        
        // Okamžitá aktualizace seznamu minulých zápisků
        displayEntries();
    } else {
        alert("Nejdřív něco napiš...");
    }
}

// --- 5. SPOUŠTĚNÍ LOGIKY PO NAČTENÍ STRÁNKY ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Načtení zápisků do deníčku
    displayEntries();

    // Přiřazení zavírací funkce křížku u deníčku
    const closeBtn = document.getElementById('close-journal');
    if (closeBtn) {
        closeBtn.onclick = closeJournal;
    }

    // --- JS PRO DECHOVÉ CVIČENÍ ---
    const startBtn = document.getElementById('start-breath');
    if (startBtn) {
        startBtn.onclick = () => {
            const breathZone = document.getElementById('breath-zone');
            const breathText = document.getElementById('breath-text');
            const flower = document.getElementById('breath-flower');

            // Skrýt startovní tlačítko a zobrazit dýchací zónu
            startBtn.style.display = 'none';
            if (breathZone) breathZone.style.display = 'block';

            if (flower && breathText) {
                const runBreathing = () => {
                    breathText.innerText = "Nádech...";
                    flower.classList.remove('inhale');

                    setTimeout(() => {
                        flower.classList.add('inhale');
                    }, 50);

                    setTimeout(() => {
                        breathText.innerText = "Výdech...";
                        flower.classList.remove('inhale');
                    }, 4000); 
                };

                runBreathing();
                setInterval(runBreathing, 8000);
            }
        };
    }

    // --- JS PRO NÁHODNÝ VZKAZ (Zobrazení pod tlačítkem bez alertu) ---
    const vzkazBtn = document.getElementById('vzkaz-btn');
    const vzkazText = document.getElementById('vzkaz-text');
    const vsechnyVzkazy = [
        "Jsi silnější, než si myslíš. ✨", 
        "Dnes je v pořádku jen 'být'. 🌿", 
        "Zítřek je nový začátek. 🌸", 
        "Tvá energie je tvůj největší magnet. 🍭",
        "Nadechni se. Děláš, co můžeš, a to bohatě stačí. 🤍",
        "Každý mrak nakonec přejde a slunce zase vyjde. ☀️",
        "Dovol si odpočívat. Odpočinek není odměna, ale potřeba. 🔋",
        "Tvoje hodnota nezávisí na tom, kolik jsi toho dnes stihla. 🕊️",
        "Je v pořádku nemít na všechno odpověď hned teď. 🧸",
        "Nezapomínej na to, jak dlouhou cestu už máš za sebou. 🏔️",
        "Zpomal. Svět chvíli počká. 🌊",
        "Malé kroky tě také dovedou do cíle. Hlavně na sebe nespěchej. 🐌",
        "Tvoje pocity jsou platné, ať jsou jakékoliv. Máš právo je cítit. ❤️"
    ]; 
    let zbyvajiciVzkazy = [...vsechnyVzkazy];

    if (vzkazBtn && vzkazText) {
        vzkazBtn.onclick = () => {
            vzkazText.style.opacity = 0;

            setTimeout(() => {
                if (zbyvajiciVzkazy.length === 0) zbyvajiciVzkazy = [...vsechnyVzkazy];
                
                const index = Math.floor(Math.random() * zbyvajiciVzkazy.length);
                const vybranyVzkaz = zbyvajiciVzkazy.splice(index, 1)[0];
                
                vzkazText.innerText = vybranyVzkaz;
                vzkazText.style.opacity = 1;
            }, 150);
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

    // --- JS PRO OTEVÍRÁNÍ TÍSŇOVÉHO MENU (BURGERU) ---
    const burgerTlacitko = document.querySelector('.burger-tlacitko');
    const tisnoveMenu = document.getElementById('tisnoveMenu');

    if (burgerTlacitko && tisnoveMenu) {
        burgerTlacitko.addEventListener('click', () => {
            tisnoveMenu.classList.toggle('aktivni');
        });
    }
});