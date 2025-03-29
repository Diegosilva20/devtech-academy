class Aluno {
    constructor (nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome}, ${this.idade} anos, Curso: ${this.curso}, Nota: ${this.notaFinal}`;
    }   
}

let alunos = [];
let editando = false;
let editIndex = null;
//
document.getElementById("alunoForm").addEventListener("submit", function (e) {
    e.preventDefault(); 
    
    console.log("Evento submit disparado");

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("notaFinal").value;

    console.log("Valores capturados:", { nome, idade, curso, notaFinal });

    const aluno =  new Aluno(nome, idade, curso, notaFinal);

    console.log("Aluno criado:", aluno);

    if (editando) {
        alunos[editIndex] = aluno;
        alert("Aluno editado com sucesso: " + aluno.nome);
        console.log("Aluno editado:", aluno);
        editando = false;
        editIndex = null;
        document.querySelector("#alunoForm button").textContent = "Cadastrar";
    } else {
        alunos.push(aluno);
        alert("Aluno cadastrado com sucesso: " + aluno.nome);
        console.log("Aluno cadastrado:", aluno);
    }
    
    renderTable();

    this.reset();
});

const renderTable = () => {
    const tbody = document.querySelector("#alunosTable tbody");
    tbody.innerHTML = "";
    alunos.forEach((aluno, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);

        const editBtn = row.querySelector(".edit-btn");
        const deleteBtn = row.querySelector(".delete-btn");

        editBtn.addEventListener("click", function () {
            console.log("Botão Editar clicado, índice:", i);
            editAluno(i);
            alert("Editando aluno: " + aluno.nome);
        });

        deleteBtn.addEventListener("click", function () {
            console.log("Botão Excluir clicado, índice:", i);
            deleteAluno(i);
            alert("Aluno excluído: " + aluno.nome);
        });
    });
};

const deleteAluno = (index) => {
    alunos.splice(index, 1);
    renderTable();
};

const editAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;
    editando = true;
    editIndex = index;  
    document.querySelector("#alunoForm button").textContent = "Salvar";
};

const exibirRelatorio = (titulo, conteudo) => {
    const output = document.getElementById("relatoriosOutput");
    output.innerHTML = `<h3>${titulo}</h3><p>${conteudo}</p>`;
};

const listarAprovados = () => {
    const aprovados = alunos.filter(aluno => aluno.isAprovado());
    if (aprovados.length === 0) {
        exibirRelatorio("Alunos Aprovados", "Nenhum aluno aprovado encontrado.");
    } else {
        const lista = aprovados.map(aluno => aluno.toString()).join("<br>");
        exibirRelatorio("Alunos Aprovados", lista);
    }
};

const calcularMediaNotas = () => {
    if (alunos.length === 0) {
        exibirRelatorio("Média das Notas Finais", "Nenhum aluno cadastrado.");
        return;
    }
    const somaNotas = alunos.reduce((soma, aluno) => soma + parseFloat(aluno.notaFinal), 0);
    const media = (somaNotas / alunos.length).toFixed(2);
    exibirRelatorio("Média das Notas Finais", `Média: ${media}`);
};

const calcularMediaIdades = () => {
    if (alunos.length === 0) {
        exibirRelatorio("Média das Idades", "Nenhum aluno cadastrado.");
        return;
    }
    const somaIdades = alunos.reduce((soma, aluno) => soma + parseInt(aluno.idade), 0);
    const media = (somaIdades / alunos.length).toFixed(2);
    exibirRelatorio("Média das Idades", `Média: ${media}`);
};

const listarNomesOrdemAlfabetica = () => {
    if (alunos.length === 0) {
        exibirRelatorio("Nomes em Ordem Alfabética", "Nenhum aluno cadastrado.");
        return;
    }
    const nomesOrdenados = alunos
        .map(aluno => aluno.nome)
        .sort((a, b) => a.localeCompare(b))
        .join("<br>");
    exibirRelatorio("Nomes em Ordem Alfabética", nomesOrdenados);
};

const contarAlunosPorCurso = () => {
    if (alunos.length === 0) {
        exibirRelatorio("Quantidade de Alunos por Curso", "Nenhum aluno cadastrado.");
        return;
    }
    const cursos = ["JavaScript", "Python", "Java"];
    const contagem = cursos.map(curso => {
        const quantidade = alunos.filter(aluno => aluno.curso === curso).length;
        return `${curso}: ${quantidade}`;
    }).join("<br>");
    exibirRelatorio("Quantidade de Alunos por Curso", contagem);
};

document.getElementById("listarAprovados").addEventListener("click", listarAprovados);
document.getElementById("mediaNotas").addEventListener("click", calcularMediaNotas);
document.getElementById("mediaIdades").addEventListener("click", calcularMediaIdades);
document.getElementById("nomesOrdemAlfabetica").addEventListener("click", listarNomesOrdemAlfabetica);
document.getElementById("alunosPorCurso").addEventListener("click", contarAlunosPorCurso);
