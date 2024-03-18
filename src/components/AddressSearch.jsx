import React, { useState } from 'react';

function AddressSearch() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({});
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError('CEP não encontrado');
        setAddress({});
      } else {
        setAddress(data);
        setError('');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setError('Erro ao buscar endereço. Tente novamente mais tarde.');
      setAddress({});
    }
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      <h1>Buscar Cep</h1>
      <div className="row justify-content-center p-3">
        <div className="card p-3 col-md-6">
          <div className="row p-3" >
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="col form-control mb-3"
              placeholder="Digite o CEP"
            />
            <button onClick={handleSearch} className="col mx-3 col-lg-2 btn btn-primary mb-3">
              Buscar
            </button>
          </div>
          {error && <div className="row alert alert-danger">{error}</div>}
          {address && (
            <div className="row">
              <p>
                <strong>CEP:</strong> {address.cep}
              </p>
              <p>
                <strong>Logradouro:</strong> {address.logradouro}
              </p>
              <p>
                <strong>Complemento:</strong> {address.complemento}
              </p>
              <p>
                <strong>Bairro:</strong> {address.bairro}
              </p>
              <p>
                <strong>Cidade:</strong> {address.localidade}
              </p>
              <p>
                <strong>Estado:</strong> {address.uf}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressSearch;