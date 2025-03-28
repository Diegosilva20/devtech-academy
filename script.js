let alunos = [];
let editando = false;
let editIndex = null;

document.getElementById("alunoForm").onsubmit = function (e){
    e.preventDefault(); 
    
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = document.getElementById("notaFinal").value;

    const aluno = {
        nome: nome,
        idade: idade,
        curso: curso, 
        notaFinal: notaFinal
    };
    if(editando){
        alunos[editIndex] = aluno;
        editando = false;
        editIndex = null;
        document.querySelector("#alunoForm button").textContent = "Cadastrar";
    } else{
        alunos.push(aluno);
    }
    
    renderTable();

    this.reset();
};

function renderTable(){
    const tbody = document.querySelector("#alunosTable tbody");
    tbody.innerHTML = "";

    for(let i = 0; i < alunos.length;i++){
        const aluno = alunos[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button onclick="editAluno(${i})">Editar</button>
                <button onclick="deleteAluno(${i})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);

    }
}

function deleteAluno(index) {
    alunos.splice(index, 1);
    renderTable();
}

function editAluno(index) {
    const aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;
    editando = true;
    editIndex = index;  
    document.querySelector("#alunoForm button").textContent = "Salvar";
}

