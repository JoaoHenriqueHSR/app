const {select, input}=require("@inquirer/prompts")

let meta={
    value:"correr",
    checked:true
}

let metas=[meta];

const cadastrarMeta=async()=>{
    const meta=await input ({ message: "digite a meta:"})
    if (meta.length==0){
        console.log("a meta não pode ser vazia.");
        return 
    }
    metas.push({value:meta, checked:false})
}

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
                await cadastrarMeta()
                console.log(metas)
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