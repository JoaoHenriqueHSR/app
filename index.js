const {select, input, checkbox}=require("@inquirer/prompts")

let mensagem="Bem vindo ao app de metas";
let meta={
    value:"correr",
    checked:false
}

let metas=[];

const cadastrarMeta=async()=>{
    const meta=await input ({ message: "digite a meta:"})
    if (meta.length==0){
        mensagem="a meta não pode ser vazia.";
        return 
    }
    metas.push({value:meta, checked:false})
    mensagem="meta cadastrada com sucesso";
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
        mensagem="nenhuma meta selecionada";
        return
    }

    respostas.forEach((resposta)=>{
        const meta=metas.find((m)=>{
            return m.value==resposta
        })
        meta.checked=true
    })
    mensagem="meta(s) marcada(s) como concluida(s)"
}

const metasRealizadas=async()=>{
    const realizadas=metas.filter((meta)=>{
        return meta.checked
    })
    if( realizadas.length==0){
        mensagem="Não existem metas realizadas";
        return
    }
    await select({
        message: "Metas realizadas: "+realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas=async()=>{
    const abertas=metas.filter((meta)=>{
     return meta.checked!=true
    })
    if(abertas.length==0){
        console.log("não existem metas abertas");
        return
    }
    await select({
        message:"metas abertas: "+ abertas.length,
        choices:[...abertas]
    })
}

const deletarMetas=async()=>{
    const metasDesmarcadas=metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itemsDeletar= await checkbox({
        message:"selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions:false
    })

    if(itemsDeletar.length==0){
        mensagem="nenhum item para deletar";
        return
    }
    itemsDeletar.forEach((item)=>{
        metas=metas.filter((meta)=>{
            return meta.value!=item
        })
    })
    mensagem="meta(s) deletada(s) com sucesso!";
}

const mostrarMensagem=()=>{
    console.clear()  
    if(mensagem!=""){
        console.log(mensagem);
        console.log(" ");
        mensagem=""
    } 
}
const start=async()=>{// async é dado pois não se sabe quanto tempo vai demorar ate obter uma respota na linha 6
    
    while(true){
        mostrarMensagem();
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
                    name: "metas abertas",
                    value: "abertas"
                },
                {
                    name: "deltar metas",
                    value: "deletar"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log(" saindo ↻")
                return
        }
    }
}
start();