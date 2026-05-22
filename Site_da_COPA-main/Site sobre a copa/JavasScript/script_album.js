/**
 * ==========================================================================
 * SISTEMA INTERATIVO DO ÁLBUM - FOTOS OFICIAIS COPA 2026
 * ==========================================================================
 */

const jogadoresCopa = [
    // GRUPO C
    { 
        id: "C1", 
        nome: "Neymar Jr", 
        pais: "Brasil", 
        flag: "br", 
        alvo: "elenco-grupo-c", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 20_57_59.png" 
    },
    { 
        id: "C2", 
        nome: "Achraf Hakimi", 
        pais: "Marrocos", 
        flag: "ma", 
        alvo: "elenco-grupo-c", 
        foto: "../img_figurinha/ChatGPT Image 18 de mai. de 2026, 20_23_43.png" 
    },
    { 
        id: "C3", 
        nome: "Duckens Nazon", 
        pais: "Haiti", 
        flag: "ht", 
        alvo: "elenco-grupo-c", 
        foto: "../img_figurinha/ChatGPT Image 18 de mai. de 2026, 20_26_14.png" 
    },
    { 
        id: "C4", 
        nome: "Scott McTominay", 
        pais: "Escócia", 
        flag: "gb-sct", 
        alvo: "elenco-grupo-c", 
        foto: "../img_figurinha/ChatGPT Image 18 de mai. de 2026, 20_31_02.png" 
    },

    // GRUPO F
    { 
        id: "F1", 
        nome: "Frenkie de Jong", 
        pais: "Holanda", 
        flag: "nl", 
        alvo: "elenco-grupo-f", 
        foto: "../img_figurinha/ChatGPT Image 18 de mai. de 2026, 20_37_34.png" 
    },
    { 
        id: "F2", 
        nome: "Kaoru Mitoma", 
        pais: "Japão", 
        flag: "jp", 
        alvo: "elenco-grupo-f", 
        foto: "../img_figurinha/ChatGPT Image 18 de mai. de 2026, 20_41_00.png" 
    },
    { 
        id: "F3", 
        nome: "Viktor Gyökeres", 
        pais: "Suécia", 
        flag: "se", 
        alvo: "elenco-grupo-f", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 21_03_06.png" 
    },
    { 
        id: "F4", 
        nome: "Elyes Skhiri", 
        pais: "Tunísia", 
        flag: "tn", 
        alvo: "elenco-grupo-f", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 20_45_46.png" 
    },

    // GRUPO I
    { 
        id: "I1", 
        nome: "Kylian Mbappé", 
        pais: "França", 
        flag: "fr", 
        alvo: "elenco-grupo-i", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 20_29_09.png" 
    },
    { 
        id: "I2", 
        nome: "Sadio Mané", 
        pais: "Senegal", 
        flag: "sn", 
        alvo: "elenco-grupo-i", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 20_35_02.png" 
    },
    { 
        id: "I3", 
        nome: "Aymen Hussein", 
        pais: "Iraque", 
        flag: "iq", 
        alvo: "elenco-grupo-i", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 20_37_03.png" 
    },
    { 
        id: "I4", 
        nome: "Erling Haaland", 
        pais: "Noruega", 
        flag: "no", 
        alvo: "elenco-grupo-i", 
        foto: "../img_figurinha/ChatGPT Image 19 de mai. de 2026, 20_52_38.png" 
    }
];

document.addEventListener("DOMContentLoaded", function() {
    
    function renderizarSlotsDoAlbum() {
        jogadoresCopa.forEach(jogador => {
            const containerAlvo = document.getElementById(jogador.alvo);
            if (containerAlvo) {
                const slot = document.createElement("div");
                slot.className = "quadrado-slot-cromo";
                slot.setAttribute("data-id", jogador.id);

                slot.innerHTML = `
                    <div class="numero-vazio-album">${jogador.id}</div>
                    <div class="corpo-cromo">
                        <div class="moldura-foto">
                            <img src="https://flagcdn.com/w40/${jogador.flag}.png" alt="Bandeira" class="mini-bandeira-cromo">
                            <img src="${jogador.foto}" alt="${jogador.nome}" class="foto-jogador-cromo" onerror="this.src='https://placehold.co/150x200?text=FIFA+2026'">
                        </div>
                        <div class="dados-texto-cromo">
                            <p class="nome-jogador-cromo">${jogador.nome}</p>
                            <p class="pais-jogador-cromo">${jogador.pais}</p>
                        </div>
                    </div>
                `;

                slot.addEventListener("click", function() {
                    this.classList.toggle("colada");
                    atualizarMetricasProgresso();
                });

                containerAlvo.appendChild(slot);
            }
        });
    }

    function atualizarMetricasProgresso() {
        const totalFigurinhas = jogadoresCopa.length;
        const totalColadas = document.querySelectorAll(".quadrado-slot-cromo.colada").length;
        const porcentagem = Math.round((totalColadas / totalFigurinhas) * 100);

        const barraPreenchimento = document.getElementById("progresso-preenchimento");
        const textoContador = document.getElementById("texto-contador-figurinhas");

        if (barraPreenchimento && textoContador) {
            barraPreenchimento.style.width = `${porcentagem}%`;
            textoContador.textContent = `Coladas: ${totalColadas} de ${totalFigurinhas} (${porcentagem}%)`;
        }
    }

    let paginaAtual = 1;
    const totalPaginasLivraria = 2;

    const btnAnterior = document.getElementById("btn-anterior");
    const btnProximo = document.getElementById("btn-proximo");
    const indicadorPagina = document.getElementById("indicador-pagina");

    function alterarPagina(direcao) {
        if (direcao === "proxima" && paginaAtual < totalPaginasLivraria) {
            paginaAtual++;
        } else if (direcao === "anterior" && paginaAtual > 1) {
            paginaAtual--;
        }

        document.querySelectorAll(".par-paginas").forEach((par, index) => {
            if (index + 1 === paginaAtual) {
                par.classList.add("ativo");
            } else {
                par.classList.remove("ativo");
            }
        });

        if (indicadorPagina) {
            indicadorPagina.textContent = `Página ${paginaAtual} de ${totalPaginasLivraria}`;
        }
    }

    if (btnAnterior && btnProximo) {
        btnAnterior.addEventListener("click", () => alterarPagina("anterior"));
        btnProximo.addEventListener("click", () => alterarPagina("proxima"));
    }

    renderizarSlotsDoAlbum();
    atualizarMetricasProgresso();
});