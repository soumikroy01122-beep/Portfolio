const roles = [
  "AI & ML Student",
  "Python Developer",
  "Data Science Enthusiast",
  "Future Researcher"
];

let roleIndex = 0;
let charIndex = 0;

const title = document.querySelector(".hero-content h2");

function typeEffect() {

  if (charIndex < roles[roleIndex].length) {
    title.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {

    setTimeout(() => {
      title.textContent = "";
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      typeEffect();
    }, 1500);

  }
}

title.textContent = "";
typeEffect();


// =========================
// EMAILJS CONTACT FORM
// =========================

emailjs.init("7pYbqXEnxz00Vtuu0");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const subject =
        document.getElementById("subject").value;

    const userMessage =
        document.getElementById("message").value;

    const formattedMessage =
`Hi Mr. Roy! I'm ${name}.

${userMessage}

--------------------------------
Sender Email: ${email}
Portfolio Contact Form`;

    emailjs.send(
        "service_ykbd3pl",
        "template_z05pyr7",
        {
            sender_name: name,
            sender_email: email,
            subject: subject,
            message: formattedMessage
        }
    )
    .then(() => {

        alert("Thank you! Your message has been sent.");

        form.reset();

    })
    .catch((error) => {

        alert("Failed to send message.");

        console.error(error);

    });

});


/* ===========================
AI Neural Network Background
=========================== */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null
};

window.addEventListener("mousemove", e=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("resize", ()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();

});

class Particle{

    constructor(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.radius = Math.random()*3+2;

        this.dx = (Math.random()-0.5)*0.4;
        this.dy = (Math.random()-0.5)*0.4;

    }

    update(){

        this.x += this.dx;
        this.y += this.dy;

        if(this.x<0||this.x>canvas.width) this.dx*=-1;
        if(this.y<0||this.y>canvas.height) this.dy*=-1;

    }

    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fillStyle="#38BDF8";

        ctx.shadowBlur=20;
        ctx.shadowColor="#38BDF8";

        ctx.fill();

    }

}

let particles=[];

function createParticles(){

    particles=[];

    for(let i=0;i<80;i++){

        particles.push(
            new Particle()
        );

    }

}

createParticles();

function connect(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            let dx=
            particles[a].x-particles[b].x;

            let dy=
            particles[a].y-particles[b].y;

            let distance=
            Math.sqrt(dx*dx+dy*dy);

            if(distance<150){

                ctx.beginPath();

                ctx.strokeStyle=
                "rgba(56,189,248,0.15)";

                ctx.lineWidth=1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

function mouseEffect(){

    particles.forEach(p=>{

        let dx=
        p.x-mouse.x;

        let dy=
        p.y-mouse.y;

        let distance=
        Math.sqrt(dx*dx+dy*dy);

        if(distance<120){

            ctx.beginPath();

            ctx.strokeStyle=
            "rgba(139,92,246,.4)";

            ctx.moveTo(
                p.x,
                p.y
            );

            ctx.lineTo(
                mouse.x,
                mouse.y
            );

            ctx.stroke();

        }

    });

}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        p.update();
        p.draw();

    });

    connect();

    mouseEffect();

    requestAnimationFrame(
        animate
    );

}

animate();

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", e=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});