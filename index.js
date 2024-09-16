const {select, input, checkbox}=require("@inquirer/prompts")

let meta={
    value:"correr",
    checked:false
}

let metas=[];

const cadastrarMeta=async()=>{
    const meta=await input ({ message: "digite a meta:"})
    if (meta.length==0){
        console.log("a meta não pode ser vazia.");
        return 
    }
    metas.push({value:meta, checked:false})
}

const listarMetas=async()=>{
    const respostas= await checkbox({
        message:"use as setas para andar de meta, o espaço para marcar e desmarcar, e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions:false
    })
    
    metas.forEach((m)=>{
        m.checked=false
    })

    if(respostas.length==0){
        console.log("nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta)=>{
        const meta=metas.find((m)=>{
            return m.value==resposta
        })
        meta.checked=true
    })
    console.log("meta(s) marcada(s) como concluida(s)")
}

const metasRealizadas=async()=>{
    const realizadas=metas.filter((meta)=>{
        return meta.checked
    })
    if( realizadas.length==0){
        console.log("Não existem metas realizadas");
        return
    }
    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
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
                    name: "metas realizadas",
                    value: "realizadas"
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
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log(" saindo ↻")
                return
        }
    }
}
start();