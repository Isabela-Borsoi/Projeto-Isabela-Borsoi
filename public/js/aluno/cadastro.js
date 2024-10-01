let cancelar = document.getElementById('Cancelar')

cancelar.addEventListener('click', () => {
    window.location = '../index.shtml'
})



let params = new URLSearchParams(window.location.search);
let id = params.get('id');

if (id) {
    fetch('../../../src/aluno.php?id='+id).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        populate(data)
    })
}



function populate(data){
    document.getElementById("id").value = data[0].id
    document.getElementById("name").value = data[0].nome
    document.getElementById("birthday").value = data[0].data_nascimento
}

let form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`../../../src/aluno.php${id ? '?id=' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({
            nome: document.getElementById("name").value,
            data_nascimento: document.getElementById("birthday").value
        }),
        headers: {
            'Content-Type': 'application/json'
        }    
    }).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        window.alert(data.msg)
        if (data.status == "ok"){
            window.location = 'lista_alunos.shtml'
        }
    })
})