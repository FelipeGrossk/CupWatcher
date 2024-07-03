const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf')
const options = document.getElementById('options')


nomeInput.addEventListener('input', (event) => {
    const valor = nomeInput.value;
    const ultimoCaracter = valor.slice(-1)

    if(isNaN(parseInt(ultimoCaracter))){
        nomeInput.value = valor
    }else{
        nomeInput.value = valor.substr(0, valor.length - 1)
    }
    
});

cpfInput.addEventListener('input', (event) => {
const valor = cpfInput.value;
const ultimoCaracter = valor.slice(-1)

if(!isNaN(parseInt(ultimoCaracter))){
    cpfInput.value = valor
}else{
    cpfInput.value = valor.substr(0, valor.length - 1)
}
    
});

document.addEventListener('DOMContentLoaded', async _ =>{

    const response = await fetch('/getOptions')
    response.json()

    .then( assinaturas => {
        
        if(assinaturas.length != 0){

            options.innerHTML = ''

            assinaturas.forEach(assinatura => {
                
                const option = document.createElement('option')
                option.value = assinatura.nome
                option.textContent = assinatura.nome

                options.appendChild(option)

            });


        }

    })

})