"use strict";

/* Elementos principais */
const cabecalho = document.getElementById("cabecalho");
const botaoMenuMobile = document.getElementById("botao-menu-mobile");
const menuMobile = document.getElementById("menu-mobile");
const anoAtual = document.getElementById("ano-atual");

/* Ano automático no rodapé */
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

/* Cabeçalho escuro ao rolar */
function atualizarCabecalho() {
    if (!cabecalho) {
        return;
    }

    if (window.scrollY > 40) {
        cabecalho.classList.add("rolagem");
    } else {
        cabecalho.classList.remove("rolagem");
    }
}

window.addEventListener("scroll", atualizarCabecalho);
atualizarCabecalho();

/* Abrir e fechar menu do celular */
if (botaoMenuMobile && menuMobile) {
    botaoMenuMobile.addEventListener("click", () => {
        const menuEstaAberto = menuMobile.classList.toggle("ativo");

        botaoMenuMobile.setAttribute(
            "aria-expanded",
            String(menuEstaAberto)
        );

        botaoMenuMobile.innerHTML = menuEstaAberto
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    /* Fecha o menu quando clicar em um link */
    const linksMenuMobile = menuMobile.querySelectorAll("a");

    linksMenuMobile.forEach((link) => {
        link.addEventListener("click", () => {
            menuMobile.classList.remove("ativo");

            botaoMenuMobile.setAttribute(
                "aria-expanded",
                "false"
            );

            botaoMenuMobile.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* Fecha o menu ao aumentar a tela */
window.addEventListener("resize", () => {
    if (
        window.innerWidth > 950 &&
        menuMobile &&
        botaoMenuMobile
    ) {
        menuMobile.classList.remove("ativo");

        botaoMenuMobile.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenuMobile.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    }
});
/* ==========================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================== */

const elementosAnimados = document.querySelectorAll(
    ".animar-scroll, .animar-esquerda, .animar-direita"
);

const observadorAnimacoes = new IntersectionObserver(
    (entradas, observador) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) {
                return;
            }

            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        });
    },
    {
        threshold: 0.15
    }
);

elementosAnimados.forEach((elemento) => {
    observadorAnimacoes.observe(elemento);
});