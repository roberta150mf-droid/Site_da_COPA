// Aguarda o HTML carregar completamente para configurar o Menu Dropdown
document.addEventListener("DOMContentLoaded", function() {

    // 1. Seleciona todos os links do menu e os blocos de conteúdo
    const links = document.querySelectorAll('.links-menu a');
    const menuLocais = document.getElementById('dropdown-locais');
    const menuGrupos = document.getElementById('dropdown-grupos');

    // 2. Adiciona o evento de clique em CADA um dos links do menu
    links.forEach(link => {
        link.addEventListener('click', function(evento) {
            
            // Ignora essa lógica para o botão de cadastro (ele mantém o comportamento padrão dele)
            if (this.classList.contains('destaque-cadastro')) {
                return; 
            }

            // Remove a classe de cor ativa de TODOS os links antes de aplicar no novo
            links.forEach(l => l.classList.remove('link-ativo'));

            // 3. Controla a abertura e fechamento dos submenus baseados no clique
            if (this.id === 'btn-locais') {
                evento.preventDefault(); // Impede a página de subir/recarregar
                
                // Se já estava aberto, apenas fecha. Se não, abre e ativa o link.
                if (menuLocais.classList.contains('ativo')) {
                    menuLocais.classList.remove('ativo');
                } else {
                    menuLocais.classList.add('ativo');
                    menuGrupos.classList.remove('ativo'); // Garante que o outro fecha
                    this.classList.add('link-ativo');     // Acende o link "Locais"
                }
            } 
            else if (this.id === 'btn-grupos') {
                evento.preventDefault(); // Impede a página de subir/recarregar
                
                // Se já estava aberto, apenas fecha. Se não, abre e ativa o link.
                if (menuGrupos.classList.contains('ativo')) {
                    menuGrupos.classList.remove('ativo');
                } else {
                    menuGrupos.classList.add('ativo');
                    menuLocais.classList.remove('ativo'); // Garante que o outro fecha
                    this.classList.add('link-ativo');     // Acende o link "Grupos"
                }
            } 
            else {
                // Se clicou em Início ou Álbum, fecha qualquer submenu aberto e acende o link clicado
                if (menuLocais) menuLocais.classList.remove('ativo');
                if (menuGrupos) menuGrupos.classList.remove('ativo');
                this.classList.add('link-ativo');
            }
        });
    });

    // 4. Fecha os menus e limpa as cores se clicar em qualquer outro lugar fora do topo azul
    document.addEventListener('click', function(evento) {
        // Garante que não vai limpar se o clique for dentro do modal de cadastro
        if (!evento.target.closest('.topo') && !evento.target.closest('.secao-cadastro')) {
            if (menuLocais) menuLocais.classList.remove('ativo');
            if (menuGrupos) menuGrupos.classList.remove('ativo');
            links.forEach(l => {
                // Mantém o botão Início ativo por padrão se tudo fechar
                if(l.id === 'btn-inicio') {
                    l.classList.add('link-ativo');
                } else {
                    l.classList.remove('link-ativo');
                }
            });
        }
    });

    // ==========================================
    // VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
    // ==========================================
    const formularioCadastro = document.querySelector('#modal-cadastro form');
    
    if (formularioCadastro) {
        // Cria dinamicamente um container para exibir mensagens de erro no topo do formulário
        const containerErro = document.createElement('div');
        containerErro.className = 'mensagem-erro-cadastro';
        
        containerErro.style.color = '#e11d48';
        containerErro.style.backgroundColor = '#ffe4e6';
        containerErro.style.border = '1px solid #fda4af';
        containerErro.style.padding = '12px';
        containerErro.style.marginBottom = '15px';
        containerErro.style.borderRadius = '8px';
        containerErro.style.fontSize = '14px';
        containerErro.style.display = 'none';
        containerErro.style.lineHeight = '1.5';
        
        formularioCadastro.insertBefore(containerErro, formularioCadastro.firstChild);

        formularioCadastro.addEventListener('submit', function(event) {
            const campoNome = formularioCadastro.querySelector('input[type="text"]');
            const campoEmail = formularioCadastro.querySelector('input[type="email"]');
            const campoSenha = formularioCadastro.querySelector('input[type="password"]');
            
            let mensagens = [];

            // Validação do campo Nome
            if (campoNome && campoNome.value.trim() === "") {
                mensagens.push("⚠️ O campo Nome é obrigatório.");
            }

            // Validação do campo E-mail
            if (campoEmail) {
                const emailValue = campoEmail.value.trim();
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailValue === "") {
                    mensagens.push("⚠️ O campo E-mail é obrigatório.");
                } else if (!regexEmail.test(emailValue)) {
                    mensagens.push("⚠️ Insira um endereço de e-mail válido.");
                }
            }

            // Validação do campo Senha
            if (campoSenha) {
                if (campoSenha.value.trim() === "") {
                    mensagens.push("⚠️ O campo Senha é obrigatório.");
                } else if (campoSenha.value.length < 6) {
                    mensagens.push("⚠️ A senha deve conter pelo menos 6 caracteres.");
                }
            }

            // Controla a exibição das críticas
            if (mensagens.length > 0) {
                event.preventDefault(); 
                containerErro.innerHTML = mensagens.join('<br>');
                containerErro.style.display = 'block';
            } else {
                containerErro.style.display = 'none';
                alert("Cadastro realizado com sucesso!");
            }
        });
    }
}); // <--- FECHAMENTO CORRETO DO DOMCONTENTLOADED AQUI!

// ==========================================================================
// PROCESSO DE VALIDAÇÃO DO QUIZ (ESCOPO GLOBAL - ACESSÍVEL PELO ONCLICK)
// ==========================================================================

function verificarQuiz() {
    // Gabarito oficial do teste
    const gabarito = { 
        p1: 'C', p2: 'B', p3: 'B', p4: 'B', p5: 'C', 
        p6: 'B', p7: 'B', p8: 'A', p9: 'A', p10: 'B' 
    };
    
    let totalAcertos = 0;
    const formulario = document.getElementById('form-quiz');
    const caixaResultado = document.getElementById('resultado-bloco');
    
    // Validação para garantir que os elementos existem na página antes de executar
    if (!formulario) {
        console.error("Erro: O formulário com id='form-quiz' não foi encontrado.");
        return;
    }
    if (!caixaResultado) {
        console.error("Erro: A div de resultado com id='resultado-bloco' não foi encontrada.");
        return;
    }
    
    // Varre o gabarito computando os acertos (ignora as perguntas vazias sem quebrar o código)
    for (let ref in gabarito) {
        const marcada = formulario.querySelector(`input[name="${ref}"]:checked`);
        if (marcada) {
            if (marcada.value === gabarito[ref]) {
                totalAcertos++;
            }
        }
    }
    
    // Define os títulos e textos baseados nos acertos
    let nivelTitulo = "";
    let nivelDescricao = "";
    
    if (totalAcertos <= 3) {
        nivelTitulo = "Novato de Arquibancada ⚽";
        nivelDescricao = "Você ainda está começando a sua jornada no futebol! Conhece o básico, e a Copa de 2026 será a oportunidade perfeita para você aprender muito mais.";
    } else if (totalAcertos <= 6) {
        nivelTitulo = "Torcedor Casual 🏟️";
        nivelDescricao = "Bom nível! Você conhece bem as regras e acompanha os grandes eventos do esporte sem nenhuma dificuldade.";
    } else if (totalAcertos <= 8) {
        nivelTitulo = "Fanático por Futebol 🌟";
        nivelDescricao = "Excelente pontuação! Você se lembra de dados históricos e está mais do que pronto para dar palpites certeiros na próxima Copa do Mundo.";
    } else {
        nivelTitulo = "Diretor Esportivo / Enciclopédia Viva 🏆";
        nivelDescricao = "Impressionante! Você domina recordes antigos e detalhes minuciosos que a maioria das pessoas desconhece. Um verdadeiro mestre do futebol!";
    }
    
    // Monta o HTML do resultado injetando os dados de forma legível
    caixaResultado.innerHTML = `
        <p style="font-size: 20px; font-weight: bold; margin-bottom: 10px; color: #ffffff;">Você acertou ${totalAcertos} de 10 perguntas!</p>
        <p style="margin-bottom: 5px; font-weight: normal; opacity: 0.85; color: #ffffff;">Seu nível de conhecimento é:</p>
        <div class="titulo-nivel-badge" style="display: inline-block; background-color: #00ffcc; color: #0052cc; padding: 8px 20px; border-radius: 20px; font-size: 16px; margin: 15px 0; font-weight: 900; text-transform: uppercase;">
            ${nivelTitulo}
        </div>
        <p style="font-weight: normal; font-size: 14px; margin-top: 15px; line-height: 1.5; opacity: 0.95; color: #ffffff;">${nivelDescricao}</p>
    `;
    
    // Força a exibição do bloco mudando o 'none' para 'block'
    caixaResultado.style.display = 'block';
    
    // Rola a tela suavemente até o resultado obtido
    caixaResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ==========================================
// FUNÇÕES DO MODAL DE CADASTRO (ESCOPO GLOBAL)
// ==========================================

// Função global para abrir a janela flutuante de cadastro
window.abrirCadastro = function(event) {
    event.preventDefault(); 
    const modal = document.getElementById('modal-cadastro');
    if (modal) modal.style.display = 'flex';
};

// Função global para fechar ao clicar no X
window.fecharCadastro = function() {
    const modal = document.getElementById('modal-cadastro');
    if (modal) {
        modal.style.display = 'none';
        limparFormularioECriticas();
    }
};

// Função global para fechar ao clicar fora da janela (na área escura)
window.fecharCadastroExterno = function(event) {
    const modal = document.getElementById('modal-cadastro');
    if (event.target === modal) {
        modal.style.display = 'none';
        limparFormularioECriticas();
    }
};

// Função auxiliar para limpar mensagens antigas quando fechar o modal
function limparFormularioECriticas() {
    const formularioCadastro = document.querySelector('#modal-cadastro form');
    if (formularioCadastro) {
        formularioCadastro.reset();
        const boxErro = formularioCadastro.querySelector('.mensagem-erro-cadastro');
        if (boxErro) boxErro.style.display = 'none';
    }
}