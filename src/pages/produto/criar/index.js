import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: {
                nome: "",
                descricao:"",
                preco: "",
                qtd_estoque: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="usuario-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="nome">Descrição </label>
                            <br />
                            <input
                                type="text"
                                id="descricao"
                                name="descricao"
                                placeholder="Descrição"
                                required
                                value={this.state.usuario.descricao}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="preco">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                required
                                value={this.state.usuario.preco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="qtd_estoque">Quantidade em Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="qtd_estoque"
                                name="qtd_estoque"
                                placeholder="QTD_Estoque"
                                required
                                value={this.state.usuario.qtd_estoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="usuario-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.usuario.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.usuario.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("https://backend-produtoo.herokuapp.com/produto", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarProduto;
