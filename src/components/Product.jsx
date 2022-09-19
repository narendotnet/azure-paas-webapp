import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import axios from 'axios';
export class Product extends Component
{
    constructor(props){
        super(props);


        this.state = {
            products: [],
            loading: true,
            failed: false,
            error: ''
        }
    }

    componentDidMount(){
        this.populateTripsData();
    }

    populateTripsData(){
        axios.get("https://bigpurplebankapi.azurewebsites.net/api/Product/getproducts").then(result => {
            const response = result.data;
            console.log(response);
            this.setState({products: response, loading: false, failed: false, error:""});
        }).catch(error => {
            this.setState({products: [], loading: false, failed: true, error:"Products could not be loaded"});
        });
    }

    renderAllTripsTable(products){
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Category</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Brand Name</th>
                        <th>Is Tailored</th>
                        <th>Addition Info</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                        <tr key={product.id}>
                            <td>{product.productId}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.brand}</td>
                            <td>{product.brandName}</td>
                            <td>{product.isTailored}</td>
                            <td>{product.additionalInformation.overviewUri}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        );
    }

    render(){
        const headerStyle = {
            width: '100%',
            padding: '1%',
            backgroundColor: "grey",
            color: 'black',
            textAlign: 'center'
        }
        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : ( this.state.failed ? (
            <div className="text-danger">
                <em>{this.state.error}</em>
            </div>
        ) : (
            this.renderAllTripsTable(this.state.products))
        )

        return (
            <div>
                <div style={headerStyle}>
                <h1>Big Purple Bank</h1>
                </div>
                <h2>Get Products Page</h2>
                <p>Here you can see all products</p>
                {content}
            </div>
        );
    }
}

export default Product;