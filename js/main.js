const form = document.querySelector(".adicionar");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []; //aqui eu peço para quando olhar para os itens, ver se eles tem algo guardado no localStorage, se isso for false ai ele cria array vazio
//só que como eu pedi para transformar em string lá em baixo não vai funcionar, então eu uso o parse para enquanto está aqui em cima não virar string ainda e assim o javascript reconhece

//todo formulário por padrão envia os dados para algum lugar quando vc apertya no submit, ele pode mandar para a propria pagina, só que quando aperta o submit por padrão
//envia e atualiza a pagina, por isso tem que dar p prevent defalt

itens.forEach((element) => {
  criaElemento(element);
});

//coloca nessa função pq ela que dá o submit, envio das informaçoes do form, então faz sentido ela já enviar e salvar no localstotage
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const nome = evt.target.elements.nome;
  const quantidade = evt.target.elements.quantidade;

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  const existe = itens.find((element) => element.nome === nome.value); //procurar no array do localstorage se o elemento figitado é igual ao elemento que está lá

  if (existe) {
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);
    itens[itens.findIndex((element) => element.id === existe.id)] = itemAtual; //quando atualiza ele ve se é o mesmo elemento e troca pelo conteudo atualizado, pq no local storage é melhor sobreescrever o conteudo
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens)); //se deixar assim o local storage só vê que é um objeto, pq o localstorage só lê string, então tem que stringficar o objeto usando Json
  //com isso eu salvo essa informação no localstorage, só que assim eu sempre sobrescrevo as informaçoes salvas
  //ainda assim, ele continua sobrescrevendo, então não adianta só criar um objeto, tem que criar um array vazia e ir mandando esses objetos para ele, ai tudo vai sendo salvo em um array
  //dentro do localstorage

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroitem = document.createElement("strong");
  numeroitem.innerHTML = item.quantidade;
  numeroitem.dataset.id = item.id;
  novoItem.appendChild(numeroitem);
  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  const atualiza = document.querySelector("[data-id='" + item.id + "']"); //acha o atribute  vê se tem o mesmo id e se tiver atualiza
  atualiza.innerHTML = item.quantidade;
}

//localstorage é um espaço para voce armazenar informaçoes no navegador, sites guardam informaçoes na sua maquina para poder ser usada posteriormente
// incluir item
//localStorage.setitem('chave', 'valor')
//no javascript sempre que voce quer salvar algo que tenha chave e valor e criar o que a gente chama de dicionario (ter uma lista de coisas sem sobreescrever) a gente cria um objeto

//recapitulando
//toda vez que eu tenho que criar um grupo de informaçoes quanto aquele mesmo elemento eu crio um objeto ('chave', 'valor') e ai para juntar esses objetos eu crio um array, ai usa o metodo
//stringfy do Json pq o local storage só lê string

//dados sensiveis se armazena em cookies não em localStorage

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  }); //alguns elementos criados como o button, tem que fazer o evento direto aonde ele foi criado

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );

  localStorage.setItem("itens", JSON.stringify(itens));
}
