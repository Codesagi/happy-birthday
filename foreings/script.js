let currentStep = 0;

const seal = document.getElementById('seal');
const flap = document.getElementById('flap');
const letter = document.getElementById('letter');

let isDragging = false;
let startY = 0;

// Step 1: Break seal and open flap
seal.addEventListener('click', () => {
    if (currentStep === 0) {
        seal.classList.add('broken');
        setTimeout(() => {
            seal.style.display = 'none';
            flap.classList.add('open');

            // Bring full letter in front
            letter.style.zIndex = 30;

            currentStep = 1;
        }, 500);
    }
});

// Step 2: Pull out letter
letter.addEventListener('mousedown', startDrag);
letter.addEventListener('touchstart', startDrag);

function startDrag(e) {
    if (currentStep !== 1) return;
    
    isDragging = true;
    startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!isDragging) return;
    
    const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    const deltaY = startY - currentY;
    
    if (deltaY > 100) {
        letter.classList.add('pulled-out');
        isDragging = false;
        currentStep = 2;
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
}
