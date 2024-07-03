document.addEventListener('DOMContentLoaded', async _ => {

    const tableContainer = document.getElementById('tableContainer')
    const response = await fetch('/apiUsuarios')

    response.json()
    .then( users => {

        // Verificar se existe algo no banco
        if(users.length != 0){

            tableContainer.innerHTML = ''

            // Para cada usuário, criar uma <tr> e atribua os valores a cada <td> respectiva.
            users.forEach(user => {

            const tr = document.createElement('tr')

            tr.innerHTML = `
            <tr>
            <td>${user.id_usuario}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.cpf}</td>
            <td>${user.assinatura}</td>
            </tr>`

            tableContainer.appendChild(tr)

            });

        }

    })

} )