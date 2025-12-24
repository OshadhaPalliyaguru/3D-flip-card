// --- AUTHENTICATION STORY ---
        window.addEventListener('load', async () => {
            const steps = ['1', '2'];
            const Queue = Swal.mixin({
                progressSteps: steps,
                confirmButtonText: 'Next >',
                confirmButtonColor: '#ff4757',
                customClass: { popup: 'swal-glass' }
            });

           
            await Swal.fire({
                title: '✨ Access Restricted ✨',
                text: 'This is a secure line. Identity verification required.',
                icon: 'info',
                confirmButtonText: 'Verify Me',
                confirmButtonColor: '#004e92',
                background: '#fff',
                allowOutsideClick: false
            });

           
            const { value: code } = await Swal.fire({
                title: 'Security Question',
                input: 'text',
                inputLabel: 'What is the answer to the riddle?',
                inputPlaceholder: 'Enter the secret word...',
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/2336/2336319.png', // Snowflake icon
                imageWidth: 80,
                imageAlt: 'Snowflake',
                confirmButtonText: 'Unlock Gift 🔓',
                confirmButtonColor: '#ff4757',
                allowOutsideClick: false,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to enter the answer!'
                    }
                }
            });

            
            if (code && code.toLowerCase().trim() === 'snowflake') {
                Swal.fire({
                    title: 'Access Granted ❤️',
                    text: 'Decoding your surprise...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    document.getElementById('cardScene').style.opacity = '1';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'That is incorrect. The elves will not open the gate.',
                    confirmButtonText: 'Try Again'
                }).then(() => {
                    location.reload();
                });
            }
        });

     
        const card = document.querySelector('.card');
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });

       
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

        
        for (let i = 0; i < 150; i++) {
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