import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`https://backend-produtoo.herokuapp.com/produto${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        return (
            <div className="produto-list">
                <Link to={`/criarProduto`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Preços</th>
                            <th scope="col">Quantidade em Estoque</th>
                            <th scope="col">Ativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto, index) => (
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.precos.String}</td>
                                <td>{produto.qtd_estoque }</td>
                                <td>{produto.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/produtos/${produto.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarProduto/${produto.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarProduto/${produto.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}