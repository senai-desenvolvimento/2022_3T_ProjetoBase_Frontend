import React, {useState, useEffect} from "react";
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape/rodape";
import Titulo from "../../components/titulo/titulo";

import './style.css';

import axios from 'axios';
import { LerConteudoDaImagem } from "../../services/ocr";

export const Patrimonio = () => {
    
    // Cadastrar
    const[nomePatrimonio, setNomePatrimonio] = useState('');
    const[descricao, setDescricao] = useState('');
    const[imagem] = useState('');
    const[dataCadastro] = useState('02/02/2022');
    const[ativo, setAtivo] = useState(true);

    // Listar
    const[produtos, setProdutos] = useState([]);


    const Cadastrar = (event) => {

      event.preventDefault();
      
      var formData = new FormData();
      
      const target = document.getElementById('arquivo')
      const file = target.files[0]
      formData.append('arquivo', file, file.name)
      
      formData.append('id', 0);
      formData.append('imagem', imagem);
      formData.append('descricao', descricao);
      formData.append('ativo', ativo);
      formData.append('dataCadastro', dataCadastro);
      formData.append('nomePatrimonio', nomePatrimonio);

      axios({
        method: "post",
        url: "http://localhost:5000/api/Equipamentos",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response);
        Listar();
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    }

    const Listar = () => {
      axios.get('http://localhost:5000/api/Equipamentos')
      .then(resposta => {
        setProdutos(resposta.data);
      })
      .catch(erro => console.log(erro))
    }

    const Remover = (id) => {
      axios.delete('http://localhost:5000/api/Equipamentos/'+id)
      .then(() => {
        Listar();
      })
      .catch(erro => console.log(erro))
    }

    const LerOCR = (event) => {

      event.preventDefault();

      var formData = new FormData();

      const element = document.getElementById("codigo");
      const file = element.files[0];

      formData.append("url", file, file.name);

      let resultado_OCR = LerConteudoDaImagem(formData);
      resultado_OCR.then(res => setDescricao(res))
    }

    useEffect(() => {
      Listar();      
    },[]);

    return(
        <>
          <Cabecalho />
          <Titulo titulosecao="Patrimônios" />
          <main className="container">

            <h2>Adicionar Patrimônio</h2>
            <form encType="multipart/form-data">
              <input
                className="input__login" 
                type="text" 
                name="nomePatrimonio" 
                id="nomePatrimonio" 
                placeholder="Nome do Patrimonio"
                value={nomePatrimonio}
                onChange={(e) => setNomePatrimonio(e.target.value)}
              />

              <input
                className="input__login" 
                type="text" 
                name="nomePatrimonio" 
                id="nomePatrimonio" 
                placeholder="Código do Patrimonio"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <input 
                type="file" 
                id="codigo" 
                accept="image/png, image/jpeg" 
                onChange={(e) => LerOCR(e)} 
              />

              <label htmlFor="ativo">
              <input 
                type="checkbox" 
                name="ativo" 
                id="ativo" 
                checked={ativo} 
                onChange={(e) => setAtivo(e.target.checked)} 
              /> Produto ativo? 
              </label>

              <input type="file" id="arquivo" accept="image/png, image/jpeg" />

              <button 
                type="submit" 
                className="btn btn__cadastro"
                onClick={(e) => Cadastrar(e)}
              >
                Cadastrar
              </button>

            </form>

            <h2>Lista de Patrimônios</h2>

            {produtos.map(item => 
              <div className="card" key={item.id}>
                <img src={"http://localhost:5000/StaticFiles/Images/"+item.imagem} alt="" />
                <div>
                  <h4>{item.nomePatrimonio}</h4>
                  <span>Patrimônio: {item.descricao}</span>
                  <span>Cadastrado em {new Date(item.dataCadastro).toLocaleDateString()}</span>
                </div>
                <button className="excluir" onClick={() => Remover(item.id)}>Excluir</button>
              </div>
            )}

          </main>
          <Rodape />
        </>
    )
}

export default Patrimonio;