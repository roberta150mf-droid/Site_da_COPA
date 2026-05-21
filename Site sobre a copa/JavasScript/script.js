// Aguarda o HTML carregar completamente
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
    // FUNÇÕES DO MODAL DE CADASTRO
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

    // ==========================================
    // VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
    // ==========================================
    const formulario = document.querySelector('#modal-cadastro form');
    
    if (formulario) {
        // Cria dinamicamente um container para exibir mensagens de erro no topo do formulário
        const containerErro = document.createElement('div');
        containerErro.className = 'mensagem-erro-cadastro';
        
        // Estilização injetada para garantir visibilidade da crítica na tela
        containerErro.style.color = '#e11d48';
        containerErro.style.backgroundColor = '#ffe4e6';
        containerErro.style.border = '1px solid #fda4af';
        containerErro.style.padding = '12px';
        containerErro.style.marginBottom = '15px';
        containerErro.style.borderRadius = '8px';
        containerErro.style.fontSize = '14px';
        containerErro.style.display = 'none';
        containerErro.style.fontWeight = '6px';
        containerErro.style.lineHeight = '1.5';
        
        formulario.insertBefore(containerErro, formulario.firstChild);

        formulario.addEventListener('submit', function(event) {
            // Captura os campos internos do seu formulário
            const campoNome = formulario.querySelector('input[type="text"]');
            const campoEmail = formulario.querySelector('input[type="email"]');
            const campoSenha = formulario.querySelector('input[type="password"]');
            
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

            // Controle de fluxo de exibição das críticas
            if (mensagens.length > 0) {
                event.preventDefault(); // Bloqueia o envio incorreto do formulário
                containerErro.innerHTML = mensagens.join('<br>');
                containerErro.style.display = 'block'; // Exibe o container com os erros
            } else {
                containerErro.style.display = 'none';
                alert("Cadastro realizado com sucesso!");
            }
        });
    }

    // Função auxiliar para limpar mensagens antigas quando fechar o modal
    function limparFormularioECriticas() {
        if (formulario) {
            formulario.reset();
            const boxErro = formulario.querySelector('.mensagem-erro-cadastro');
            if (boxErro) boxErro.style.display = 'none';
        }
    }

}); // Fim do DOMContentLoaded