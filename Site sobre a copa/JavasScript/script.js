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
                // Se clicou em Home ou Álbum, fecha qualquer submenu aberto e acende o link clicado
                menuLocais.classList.remove('ativo');
                menuGrupos.classList.remove('ativo');
                this.classList.add('link-ativo');
            }
        });
    });

    // 4. Fecha os menus e limpa as cores se clicar em qualquer outro lugar fora do topo azul
    document.addEventListener('click', function(evento) {
        if (!evento.target.closest('.topo')) {
            if (menuLocais) menuLocais.classList.remove('ativo');
            if (menuGrupos) menuGrupos.classList.remove('ativo');
            links.forEach(l => l.classList.remove('link-ativo'));
        }
    });

});