// --- 1. THE STORY MODE LOCK ---
        window.addEventListener('load', async () => {
            const { value: secret } = await Swal.fire({
                title: '🎄 Santa\'s Digital Vault 🎄',
                text: 'Ho ho ho! A spell has been cast on this gift. Only the one who holds the Key of the Frost may enter.',
                input: 'text',
                inputLabel: 'Whisper the secret word...',
                inputPlaceholder: 'Type the answer here',
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/626/626576.png', // Lock Icon
                imageWidth: 100,
                imageAlt: 'Christmas Lock',
                confirmButtonText: 'Unlock Magic ✨',
                confirmButtonColor: '#c0392b',
                allowOutsideClick: false,
                allowEscapeKey: false,
                customClass: {
                    popup: 'swal-popup-custom'
                },
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            });

            // LOGIC CHECK
            // IMPORTANT: Change 'snowflake' below if you change the puzzle answer
            if (secret && secret.toLowerCase().trim() === 'snowflake') {
                Swal.fire({
                    title: 'Access Granted!',
                    text: 'The vault opens with a festive creak...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Reveal the card
                    document.getElementById('cardScene').style.opacity = '1';
                });
            } else {
                Swal.fire({
                    title: 'Access Denied ❄️',
                    text: 'That is not the secret key. The elves are confused. Reload to try again!',
                    icon: 'error',
                    confirmButtonColor: '#2c3e50',
                    confirmButtonText: 'Reload Page'
                }).then(() => {
                    location.reload();
                });
            }
        });

        // --- 2. CARD FLIP LOGIC ---
        const card = document.querySelector('.card');
        card.addEventListener('click', function() {
            card.classList.toggle('is-flipped');
        });

        // --- 3. SNOWFALL EFFECT ---
        const canvas = document.getElementById('snow-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const snowflakes = [];

        function createSnowflake() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.3
            };
        }

        for (let i = 0; i < 100; i++) {
            snowflakes.push(createSnowflake());
        }

        function drawSnow() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            
            snowflakes.forEach(flake => {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                ctx.fill();
                
                flake.y += flake.speed;
                if (flake.y > canvas.height) {
                    flake.y = 0;
                    flake.x = Math.random() * canvas.width;
                }
            });
            requestAnimationFrame(drawSnow);
        }
        drawSnow();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });