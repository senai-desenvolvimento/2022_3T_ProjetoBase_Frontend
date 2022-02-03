import axios from 'axios'

export const LerConteudoDeImagem = async (formData) => {

    let resultado;

    let retorno = await axios({
        method: "post",
        url: "https://equipamentos.cognitiveservices.azure.com/vision/v3.2/ocr?language=unk&detectOrientation=true&model-version=latest",
        data: formData,
        headers: { 
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": "fa6dae9a092348a6bd041c1dbe7397be",
        },
      })
      .then(response => {
          resultado = LerJSON(response.data);
      })
      .catch(response => {
        console.log(response);
    });   

    return resultado;
}

export const LerJSON = (obj) => {
    let resultado;
    obj.regions.forEach(element => {
        element.lines.forEach(element2 => {
            element2.words.forEach(words => {
                if(words.text[0] === '1'){
                    resultado =  words.text;
                }
            });
        });
    });
    return resultado;
}

export default LerConteudoDeImagem;