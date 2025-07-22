  import axios from "axios";
  
  export const fetchAddressByCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) throw new Error("CEP não encontrado");
    return {
      street: response.data.logradouro,
      neighborhood: response.data.bairro,
      city: response.data.localidade,
      state: response.data.uf,
    };
  } catch (err) {
    throw new Error("Erro ao buscar endereço");
  }
};