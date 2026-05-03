/**
 * PetVet Pharma - Particle Background Effect
 * Canvas-based animated particle network
 */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 100 };

        // 配置参数
        this.config = {
            particleCount: this.getParticleCount(),
            particleColor: '#00D4AA',
            lineColor: 'rgba(0, 212, 170, 0.15)',
            particleRadius: 2,
            lineDistance: 120,
            speed: 0.3
        };

        this.init();
        this.animate();
        this.handleResize();
        this.handleMouse();
    }

    getParticleCount() {
        // 根据屏幕大小调整粒子数量，移动端减少
        const width = window.innerWidth;
        if (width < 768) return 50;
        if (width < 1024) return 80;
        return 120;
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新并绘制粒子
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // 绘制连接线
        this.drawLines();

        requestAnimationFrame(() => this.animate());
    }

    drawLines() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.lineDistance) {
                    // 根据距离调整线条透明度
                    const opacity = 1 - distance / this.config.lineDistance;
                    this.ctx.strokeStyle = `rgba(0, 212, 170, ${opacity * 0.15})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
            this.config.particleCount = this.getParticleCount();
            this.createParticles();
        });
    }

    handleMouse() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

class Particle {
    constructor(network) {
        this.network = network;
        this.canvas = network.canvas;
        this.ctx = network.ctx;
        this.config = network.config;

        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * this.config.speed;
        this.vy = (Math.random() - 0.5) * this.config.speed;
        this.radius = this.config.particleRadius;
    }

    update() {
        // 边界检测
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        // 鼠标交互 - 粒子远离鼠标
        if (this.network.mouse.x !== null) {
            const dx = this.x - this.network.mouse.x;
            const dy = this.y - this.network.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.network.mouse.radius) {
                const force = (this.network.mouse.radius - distance) / this.network.mouse.radius;
                this.vx += dx * force * 0.02;
                this.vy += dy * force * 0.02;
            }
        }

        // 限制速度
        const maxSpeed = this.config.speed * 2;
        if (Math.abs(this.vx) > maxSpeed) this.vx *= 0.9;
        if (Math.abs(this.vy) > maxSpeed) this.vy *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.config.particleColor;
        this.ctx.fill();

        // 添加发光效果
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.config.particleColor;
    }
}

// 初始化粒子网络
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork('particles-canvas');
});