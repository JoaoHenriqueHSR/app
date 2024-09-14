const {select}=require("@inquirer/prompts")

const start=async()=>{// async é dado pois não se sabe quanto tempo vai demorar ate obter uma respota na linha 6
    
    while(true){
        const opcao=await select({// o await seria a espera de uma promessa que o select ira retornar com uma resposta, isso é dado para que o codigo espere ate que o usuario de um respota. Por esse motivo a função start precisa ser assincrona
            message: "menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "listar metas",
                    value: "listar"
                },
                {
                    name: "sair",
                    value: "sair"
                }
            ]
        });
        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar");
                break
            case "sair":
                console.log(" saindo ↻")
                return
        }
    }
}
start();