document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-button');
    const music = document.getElementById('bg-music');
    const vinyl = document.getElementById('vinyl-record');
    const progress = document.getElementById('music-progress');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    // 1. MP3 Player Control
    window.toggleMusic = () => {
        if (music.paused) {
            music.play().catch(e => console.log("Blocked", e));
            vinyl.classList.add('animate-vinyl');
            vinyl.classList.remove('paused');
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            music.pause();
            vinyl.classList.add('paused');
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    };

    music.ontimeupdate = () => {
        if (music.duration) {
            const percentage = (music.currentTime / music.duration) * 100;
            progress.style.width = percentage + '%';
        }
    };

    // 2. View Switching Logic
    window.nextView = (id) => {
        const current = document.querySelector('section:not(.hidden)');
        if (current) {
            current.classList.add('fade-out');
            setTimeout(() => {
                current.classList.add('hidden');
                current.classList.remove('fade-out');
                const next = document.getElementById(id);
                next.classList.remove('hidden');
            }, 500);
        }
    };

    window.startInvitation = () => {
        window.toggleMusic();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        nextView('view-survey');
    };

    // 3. Receipt Processing
  window.finalizeDate = () => {
    const form = document.getElementById('date-form');
    const formData = new FormData(form);
    
    const summary = [
        ['Social Battery', formData.get('q1')],
        ['Vibe/Aesthetic', formData.get('q2')],
        ['Comm Level', formData.get('q3')], // Non-stop yapping vs Deep talks
        ['Soundtrack', formData.get('q4')],
        ['Hard Launch?', formData.get('q5')], // Main feed vs Gatekeeping
        ['The Plan', formData.get('q6')],
        ['Cuisine', formData.get('q7')],
        ['Mandatory Drink', formData.get('q8')],
        ['ETA Home', formData.get('q9')],
        ['Deadline Type', formData.get('q9_type')], // Handle the busy student deadline
        ['Transport', formData.get('q10')],
        ['Green Flag Gift', formData.get('q11')],
        ['Love Language', formData.get('q12')],
        ['Safe Space', formData.get('q13') || 'Standard Walk-side'],
        ['Post-Date', formData.get('q14')],
        ['Final Status', 'Valentines Locked In ❤️']
    ];


        document.getElementById('r-ref').innerText = Math.random().toString(36).substr(2, 8).toUpperCase();
        document.getElementById('r-date').innerText = new Date().toLocaleString();
        
        const itemsDiv = document.getElementById('r-items');
        itemsDiv.innerHTML = summary.map(item => `
            <div class="flex justify-between items-start gap-4 py-1">
                <span class="opacity-50 uppercase text-[8px] font-bold shrink-0">${item[0]}</span>
                <span class="text-right font-black tracking-tighter">${item[1]}</span>
            </div>
        `).join('');

        nextView('view-receipt');

        setTimeout(() => {
            document.getElementById('receipt-paper').classList.add('printing');
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.8 } });
        }, 600);
    };

    // 4. Kinetic No Button
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });

    window.downloadReceipt = () => {
        const receipt = document.getElementById('receipt-paper');
        html2canvas(receipt, { scale: 3 }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Pass_Mojado.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };
});