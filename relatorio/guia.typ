#set page("a4")

#let mi(body) = {
  set text(fill: red)
  [#body]
}


#let ya(body) = {
  set text(fill: green)
  [#body]
}

= Guia para apresentação
\
#mi([*Miguel - vermelho*])

#ya([*Yathaarth - verde*])
\
== Início
+ Introdução (Olá eu sou o X / E eu sou o Y)
+ Ficamos com o tema dos filmes e decidimos fazer um site catálogo de filmes,
onde se pode navegar filmes e deixar comentários e avaliações
+ Não temos uma apresentação powerpoint mas vamos mostrar o site e falar

== Página Inicial
+ #mi([_Mostrar o carousel_])
+ #ya(
    [Aqui na página inicial temos uma navbar e como elemento principal temos o _carousel_, que é um dos componentes
      disponibilizados pelo Bootstrap, que permite fazer um _slideshow_ e mostrar elementos seguidos uns dos outros,
      as cores do site e este elemento foram inspirados no design do site da Netflix
    ],
  )
+ #mi(
    [_Mostrar o catálogo_ Aqui temos o conteúdo principal do nosso projeto, temos _cards_ que mostram os filmes, estes dados
      vêm de um ficheiro .json. Em cima podemos pesquisar os filmes por nome e por género _Mostrar a pesquisa a funcionar_],
  )
+ #ya(
    [_Mostrar learn more_ Ao clicar no card de um dos filmes é nos apresentado um modal com mais informações sobre o filme,
      também fizemos uma secção onde se pode deixar comentários e avaliar os mesmos],
  )
+ *Tentar adicionar um comentário e rating não vai dar e vai aparecer um toast em baixo a dizer que é preciso estar logged in*
+ #mi(
    [Para deixar avaliações temos de fazer login ou criar conta _ir para a pagina de criar conta_ aqui temos um modal de criação de conta
      _cria conta_],
  )
+ *Depois de criar conta ou fazer login o utilizador é remetido para a página account, onde mostra os dados do mesmo*
+ #ya(
    [Ao criar conta ou fazer login voltamos para esta página onde podemos ver os nossos dados de utilizador,
      *e não dá para voltar para a página de login ou signup até fazer logout*],
  )
+ #mi(
    [_volta para o catálogo e começa a deixar comentários_ Como podem ver dá para comentar e avaliar os filmes e se fecharmos e voltarmos a abrir
      o modal irão ficar guardados os comentários do filme],
  )
+ #ya(
    [Por fim vamos só mostrar as funcionalidades do administrador _faz logout e vai para a página de login, user:admin pass:admin_
      Agora fizemos login como administrador _voltar para catálogo_ e aqui em baixo podemos adicionar novos filmes],
  )
+ #mi([Foi este o nosso projeto e obrigado pela atenção])

