#set page(
  paper: "a4",
  margin: 25mm,
  numbering: "1",
)

#set par(justify: true)

#set heading(numbering: "1.1.")

#align(right)[
  #image("PPORTO.png", width: 12em)
]
\

#set figure(supplement: [Figura])
// Macro para figuras padrão
#let my-figure(img, cap) = figure(
  image(img),
  caption: cap,
)

#let title = [Relatório Trabalho de Grupo\ TSIW | Tecnologias Web]

#align(center, text(17pt)[*#title*])\


#align(center, text(
  12pt,
)[Realizado por\ Yathaarth Handa 40250254\ Miguel Silva 40230223])

#outline(title: "Conteúdo")\

= Introdução
Neste relatório vamos falar do desenvolvimento do projeto de grupo realizado no âmbito da unidade curricular de Tecnologias Web.

Este projeto teve como principal objetivo a consolidação dos conhecimentos adquiridos ao longo do semestre, através da criação de um _website_ interativo usando apenas HTML, Bootstrap e JavaScript.

Nós optamos pelo tema "Filmes" e então decidimos fazer um _website_ onde o utilizador pode criar uma conta, pode fazer _login_, pode ver um catálogo de filmes onde pode também avaliar os mesmos. Por fim também criámos a distinção de utilizadores normais e administradores, sendo dada a habilidade de inserir novos filmes no catálogo ao administrador.

= Objetivos do Projeto
Com a realização deste projeto tínhamos em mente evoluir as nossas capacidades de Bootstrap: como usar as classes e estilos pré-definidos para o desenvolvimento de um design mais rápido e consistente e também o uso de componentes do Bootstrap como o _Carousel_ e o _Toast_. Também tínhamos como objetivo evoluir na programação com JavaScript, nomeadamente a manipulação do DOM através do mesmo e o uso da _localStorage_ para guardar dados localmente.

= Estrutura do Website
O _website_ ficou com a seguinte estrutura:\
_Pasta do projeto_\
- _img_
  - _backdrops_
  - _posters_
- _js_
  - _account.js_
  - _admin.js_
  - _carousel.js_
  - _login.js_
  - _navbar.js_
  - _session.js_
  - _signup.js_
  - _store.js_
  - _toasts.js_
- _20_movies.json_
- _account.html_
- _index.html_
- _login.html_
- _signup.html_
- _store.html_

A pasta "_img/backdrops_" contém as imagens usadas no _Carousel_ da página inicial, onde ocupam a largura e altura toda da página (estilo inspirado no design do site da Netflix).
A pasta "_img/posters_" contém as imagens usadas na página de catálogo para os cartões dos filmes.

A pasta "_js_/" contém o código todo utilizado no _website_.

A raiz do projeto contém os ficheiros de HTML das páginas disponíveis a serem acessadas e o _20_movies.json_
sobre vários filmes e é utilizado como fonte de dados para o catálogo.

= Implementação Técnica
== Representação dos Dados com _Arrays_ de Objetos
Os dados dos filmes (título, descrição, género, capa de imagem) estão todos definidos no ficheiro _20_movies.json_
através de um _array_ de objetos.

Abaixo está o exemplo de um dos objetos no ficheiro, sendo informação sobre
o filme "_Inception_".

#align(center)[
  ```json
      {
        "Series_Title": "Inception",
        "Image": "inception.jpg",
        "Released_Year": 2010,
        "Certificate": "UA",
        "Runtime": "148 min",
        "Genre": "Action, Adventure, Sci-Fi",
        "IMDB_Rating": 8.8,
        "Overview": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        "Meta_score": 74,
        "Director": "Christopher Nolan",
        "Star1": "Leonardo DiCaprio",
        "Star2": "Joseph Gordon-Levitt",
        "Star3": "Elliot Page",
        "Star4": "Ken Watanabe",
        "No_of_Votes": 2067042,
        "Gross": 292576195
      },
  ```]

Este ficheiro é carregado na página de catálogo através da função _fetch()_
e após recebermos esta _array_ é feito um _loop_ pelos objetos da mesma
e chamada uma função para criar um elemento HTML (o cartão) com os dados deste objeto.

Nesta página também guardamos uma _array_ de objetos que guardam os filmes introduzidos pelos administradores, sendo esta _array_ juntada à previamente mencionada antes do _loop_.

\
== Sistema de Filtros e Pesquisa

Na página de catálogo é possível filtrar os filmes disponíveis por nome e género.
Para isto ser possível, decidimos a seguinte implementação:

+ Guardamos o valor dos elementos HTML em variáveis
  - Uma variável guarda a _string_ para a pesquisa de nome
  - Outra para a _string_ para a pesquisa de género
+ No _loop_ pelos filmes todos apagamos os cartões todos (se existirem), verificamos se a _string_ do nome está no título do item do _loop_ atual e verificamos a mesmo para o género.

Quando estas 2 variáveis são _""_ (vazias) não fazemos nenhuma filtragem.

#align(center)[
  ```js
    inputSearch.addEventListener("input", (e) => {
    search = e.target.value;
    updateTableData();
  });

  select.addEventListener("input", (e) => {
    genre = e.target.value;
    updateTableData();
  });
  ```]

\
== Sistema de Criação de Conta de _Login_

Este sistema foi implementado através de um _script_ _session.js_ que é um módulo (permite ser acessado por outros _scripts_) e aqui é guardada uma variável chamada _session_. Esta variável é um objeto que nos diz se o utilizador está _logged in_
e se sim, mostra-nos também informação sobre o mesmo como o _username_, _email_ e _password_.

Como este _script_ expõe esta variável e também outras funções para facilitar o processo de fazer _login_, criar conta, fazer _logout_ torna-se fazer o conteúdo de outras páginas dinâmicas apenas acessando esta informação.

As funções também usam o _localStorage_, ou seja caso a página seja fechada e aberta de novo a sessão continuará a mesma até o utilizador fazer _logout_ ou apagar manualmente os dados no _Browser_.

#align(center)[
  ```js
  export const session = {
    loggedIn: false,
    user: null,

  export function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    session.user = user;

    localStorage.setItem("loggedIn", true);
    session.loggedIn = true;
  }
  };
  ```]
\
== Catálogo de Filmes

Como foi mencionado previamente, o catálogo de filmes é populado através de um ficheiro _.json_
como cartões de Bootstrap onde se mostra cada cartão possui a imagem de capa do filme que tapa o cartão inteiro, na parte de cima do cartão possui os géneros do filme e em baixo um botão que abre o modal de informação.

#align(center)[
  ```js
  function UpdateCardContainerInnerHTML(data) {
    cardContainer.innerHTML = data
      .map((movie) =>
        getCardFromMovieData(
          "./img/posters/" + movie.Image,
          movie.Series_Title,
          movie.Overview,
          movie.Genre,
        ),
      )
      .join(" ");
  }
  ```]
\
O modal de informação é um elemento único da página mas que quando é aberto o mesmo é populado com os dados do filme selecionado.
Possui toda a informação sobre o filme, como o título, capa, descrição, géneros e também possui uma secção onde o utilizador pode introduzir e publicar comentários com avaliação sobre este filme selecionado.
#align(center)[
  ```js
  function setModalData(image, title, overview, genre) {
    modalImage.src = image;
    modalTitle.innerHTML = title;
    modalDesc.innerHTML = overview;
    modalGenre.innerHTML = genre;
  }
  ```]

\
Uma dificuldade que encontrámos foi como separar os comentários por cada filme, mas conseguímos realizar isto
com uma variável chamada _comments_ que é um objeto que tem mais objetos dentro: os objetos diretamente dentro desta variável são a _string_ do título do filme, e dentro deste objeto temos uma _array_ dos comentários,
sendo então possível acessar os comentários de um filme específico como _comments[NomeDoFilme]_.

== _Toasts_
Também implementamos um sistema de _toasts_ (notificações) com o uso do componente
disponibilizado pelo bootstrap.

Essencialmente expõe uma função chamada _addToast_ que primeiro verifica se existe um _container_ para os toasts (é necessário para que eles apareçam verticalmente numa _stack_), se não houver adiciona este elemento. Após isto pegamos numa template (_string_) de um toast e adicionamos como filho deste
_container_ e também chamamos a função do Bootstrap para iniciar o _toast_ e a respetiva animação.

#align(center)[
  ```js
    toastContainer.insertAdjacentHTML("beforeend", toastTemplate);

    const toastEl = document.getElementById(newToastUid);
    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
      delay: 2500,
      autohide: true,
    });

    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
    toast.show();
  ```]
\
= Conclusão

Para concluir, este projeto permitiu-nos aplicar os conhecimentos adquiridos durante as aulas e sentimos que o _website_ cumpre todos os requisitos definidos na proposta.

Para além dos conhecimentos técnicos também conseguimos desenvolver as nossas competências de trabalho em grupo e organização de tarefas.

#my-figure("initial_page.png", [Página inicial do _website_ final])
