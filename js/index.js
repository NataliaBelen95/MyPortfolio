document.addEventListener("DOMContentLoaded", () => {



  /*nav */
  
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("activo");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("activo");
    }
  });
});

/*nav menu hamburguesa*/
const toggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav_lista");

toggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

  /* =========================
     PROYECTOS (FETCH + RENDER)
  ========================= */
  fetch('./json/proyectos.json')
    .then(res => res.json())
    .then(data => {
     const contenedor = document.querySelector('.proyectos');

      data.forEach((proyecto) => {
        const card = document.createElement('article');
        card.classList.add('tarjeta');

        card.innerHTML = `
          ${
            proyecto.imagenes.length > 0
              ? `
              <div class="proyecto-img">
                <img src="${proyecto.imagenes[0]}" class="img-activa">

                ${
                  proyecto.imagenes.length > 1
                    ? `
                    <div class="controles">
                      <button class="prev">‹</button>
                      <button class="next">›</button>
                    </div>
                    `
                    : ""
                }
              </div>
              `
              : `
              <div class="sin-img">
                <i class="fa-solid fa-code"></i>
                <span>Full Stack Project</span>
              </div>
              `
          }

          <div class="contenido-card">
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>

            <div class="tech-group">
              ${
                proyecto.tecnologias.frontend
                  ? proyecto.tecnologias.frontend.map(t => `<span class="tag front">${t}</span>`).join('')
                  : ''
              }
              ${
                proyecto.tecnologias.backend
                  ? proyecto.tecnologias.backend.map(t => `<span class="tag back">${t}</span>`).join('')
                  : ''
              }
              ${
                proyecto.tecnologias.database
                  ? proyecto.tecnologias.database.map(t => `<span class="tag db">${t}</span>`).join('')
                  : ''
              }
            </div>

            <a href="${proyecto.github}" target="_blank" class="boton">
              <i class="fa-brands fa-github"></i> Ver código
            </a>
          </div>
        `;

        contenedor.appendChild(card);

        /* =========================
           CARRUSEL POR CARD
        ========================= */
        if (proyecto.imagenes.length > 1) {
          let current = 0;
          const img = card.querySelector('.img-activa');
          const next = card.querySelector('.next');
          const prev = card.querySelector('.prev');

          next.addEventListener('click', () => {
            current = (current + 1) % proyecto.imagenes.length;
            img.src = proyecto.imagenes[current];
          });

          prev.addEventListener('click', () => {
            current = (current - 1 + proyecto.imagenes.length) % proyecto.imagenes.length;
            img.src = proyecto.imagenes[current];
          });
        }

      });
    });

  /* =========================
     MODAL IMAGEN
  ========================= */
  const modal = document.getElementById("modalImg");
  const modalImg = document.getElementById("imgZoom");
  const cerrar = document.querySelector(".cerrar");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("img-activa")) {
      modal.style.display = "flex";
      modalImg.src = e.target.src;
    }
  });

  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });



  

  /* =========================
     TECNOLOGÍAS (ANIMACIÓN)
  ========================= */
  const techGrids = document.querySelectorAll(".tech-grid");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const icons = entry.target.querySelectorAll("img");

        icons.forEach((icon, index) => {
          setTimeout(() => {
            icon.classList.add("show");
          }, index * 100);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  techGrids.forEach((grid) => observer.observe(grid));

  /* =========================
     FOOTER AÑO AUTOMÁTICO
  ========================= */
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});



