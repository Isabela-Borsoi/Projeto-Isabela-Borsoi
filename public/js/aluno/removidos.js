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