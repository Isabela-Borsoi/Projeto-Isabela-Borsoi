let cancelar = document.getElementById('Add')

cancelar.addEventListener('click', () => {
    window.location = 'cadastro.shtml'
})

document.getElementById('Busca').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase(); // Obtém o valor do campo de entrada e converte para minúsculas
    let rows = document.querySelectorAll('table tbody tr'); // Seleciona todas as linhas da tabela
  
    rows.forEach(row => {
      let cells = row.querySelectorAll('td'); // Seleciona todas as células da linha
      let found = false;
  
      cells.forEach(cell => {
        if (cell.textContent.toLowerCase().includes(searchValue)) {
          found = true;
        }
      });
  
      if (found) {
        row.style.display = ''; // Mostra a linha se o valor for encontrado
      } else {
        row.style.display = 'none'; // Oculta a linha se o valor não for encontrado
      }
    });
  });



fetch('../../../src/aluno.php').then(function(resposta) {
    return resposta.json()
}).then(function(data) {
    let table = document.getElementById('lista_alunos')
    populate(table, data)
})

function insertCell(row, child) {
    let cell = row.insertCell()
    cell.setAttribute("class", "px-4 py-2")
    cell.appendChild(child)
}

function populate(table, data){
    let tbodyRef = table.getElementsByTagName('tbody')[0]

    for (let d of data) {
        let newRow = tbodyRef.insertRow()

        newRow.setAttribute("class", "border-b hover:bg-muted/50 transition-colors")

        insertCell(newRow, document.createTextNode(d['id']))
        insertCell(newRow, document.createTextNode(d['nome']))
        insertCell(newRow, document.createTextNode(d['data_nascimento_formatado']))

        let div = document.createElement('div')

        div.setAttribute("class", "flex items-center space-x-2")

        let editar = document.createElement('button')
        editar.setAttribute("class", "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-10 px-4 py-2 bg-[#e58ac7] text-black hover:bg-[#e58ac7]/90")
        editar.appendChild(editarSVG())
        editar.addEventListener('click', function() {
            const linha = this.parentNode.parentNode.parentNode
            window.location = 'cadastro.shtml?id=' + parseInt(linha.cells[0].innerHTML)
        })

        let spanEditar = document.createElement('span')
        spanEditar.setAttribute("class", "sr-only")
        spanEditar.innerHTML = "Editar"

        editar.appendChild(spanEditar)


        let remover = document.createElement('button')
        remover.setAttribute("class", "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-10 px-4 py-2 bg-[#e58ac7] text-black hover:bg-[#e58ac7]/90")
        remover.appendChild(removerSVG())

        remover.addEventListener('click', function() {
            const linha = this.parentNode.parentNode.parentNode
            

            if (!window.confirm("Tem certeza que deseja deletar o registro?")) {
                return
            }

            fetch('../../../src/aluno.php', {
                method: 'DELETE',
                body: JSON.stringify({id: parseInt(linha.cells[0].innerHTML)}),
                headers: {
                    'Content-Type': 'application/json'
                }            
            }).then(function(resposta) {
                return resposta.json()
            }).then(function(data) {
                window.alert(data.msg)
                if (data.status == "ok"){
                  window.location.reload(true)
                }
            })
        })
        
        let spanRemover = document.createElement('span')
        spanRemover.setAttribute("class", "sr-only")
        spanRemover.innerHTML = "Remover"

        editar.appendChild(spanRemover)

        div.appendChild(editar)
        div.appendChild(remover)

        insertCell(newRow, div)

    }
}

function editarSVG() {
    const svgNS = "http://www.w3.org/2000/svg"

    const svg = document.createElementNS(svgNS, "svg")
    svg.setAttribute("width", "24")
    svg.setAttribute("height", "24")
    svg.setAttribute("viewBox", "0 0 24 24")
    svg.setAttribute("fill", "none")
    svg.setAttribute("stroke", "currentColor")
    svg.setAttribute("stroke-width", "2")
    svg.setAttribute("stroke-linecap", "round")
    svg.setAttribute("stroke-linejoin", "round")
    svg.setAttribute("class", "h-4 w-4")

    const path1 = document.createElementNS(svgNS, "path")
    path1.setAttribute("d", "M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10")
    svg.appendChild(path1)

    const path2 = document.createElementNS(svgNS, "path")
    path2.setAttribute("d", "M14 2v4a2 2 0 0 0 2 2h4")
    svg.appendChild(path2)

    const path3 = document.createElementNS(svgNS, "path")
    path3.setAttribute("d", "M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z")
    svg.appendChild(path3)

    return svg
}

function removerSVG() {
    const svgNS = "http://www.w3.org/2000/svg"

    const svg = document.createElementNS(svgNS, "svg")
    svg.setAttribute("xmlns", svgNS)
    svg.setAttribute("width", "24")
    svg.setAttribute("height", "24")
    svg.setAttribute("viewBox", "0 0 24 24")
    svg.setAttribute("fill", "none")
    svg.setAttribute("stroke", "currentColor")
    svg.setAttribute("stroke-width", "2")
    svg.setAttribute("stroke-linecap", "round")
    svg.setAttribute("stroke-linejoin", "round")
    svg.setAttribute("class", "h-4 w-4")

    const path1 = document.createElementNS(svgNS, "path")
    path1.setAttribute("d", "M3 6h18")
    svg.appendChild(path1)

    const path2 = document.createElementNS(svgNS, "path")
    path2.setAttribute("d", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6")
    svg.appendChild(path2)

    const path3 = document.createElementNS(svgNS, "path")
    path3.setAttribute("d", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2")
    svg.appendChild(path3)

    return svg
}