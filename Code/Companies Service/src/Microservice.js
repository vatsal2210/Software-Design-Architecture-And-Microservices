import React, { Component } from 'react';
import queryString from 'query-string';
import './Microservice.css';
import axios from "axios";
import {ProgressBar} from 'primereact/progressbar';

class Microservice extends Component {
    constructor(props){
        super(props);
        this.serviceMap = ['Ski Resorts', 'Restaurants', 'Museums', 'Fortune Companies'];

        this.state = {
            params: {},
            results: [],
            loading: true
        }
    }

    componentDidMount() {
        // calls ski resort endpoint at the moment
        let params = queryString.parse(this.props.location.search);
        console.log("params = ", params);
        this.setState({params: params});

        // build searchQuery from params
        let searchQuery = '';

        if (params.serviceName === 'skiResort'){
            searchQuery = "country=" + params.country + "&resortname=" + params.resortname + "&pricerange="
            + params.price;
        }
        else if (params.serviceName === 'museums'){
            searchQuery = "state=" + params.state + "&city=" + params.city + "&type="
                + params.type + '&museumName=' + params.museumName;
        }
        else if (params.serviceName === 'restaurants'){
            searchQuery = "state=" + params.state + "&city=" + params.city + "&type="
                + params.type + "&address=" + params.address + "&name=" + params.restaurantName;
        }
        else if (params.serviceName === 'companies'){
            searchQuery = "company=" + params.company + "&state=" + params.state + "&founded="
                + params.founded;
        }

        console.log("searchQuery = ", searchQuery);

        const body = {
            serviceName: params.serviceName,
            searchParam: searchQuery
        };
        console.log("body = ", body);
        axios.post( 'http://western01-gateway-pipeline.mybluemix.net/service/search', body)
            .then((res) => {
            console.log("res = ", res);
            if (res.data && Array.isArray(res.data)){
                this.setState({results: res.data.slice(0, 500), loading: false})
            }
        }).catch((err) => {
            console.log("Error retrieving results: ", err);
            this.setState({loading: false});
        });
    }

    render() {
        let pricerange = '';
        if (this.state.params && this.state.params.pricerange){
            pricerange = this.state.params.pricerange.split('-');
        }

        return (
            <div className="App">
                <div style={{height: '10vh', width: '100%'}}>
                    <button className="button" style={{display: 'inline-block', left:'5px'}}
                        onClick={() => window.location='/'}>
                        Back
                    </button>
                    <p style={{visibility: 'hidden', width: '50%', display: 'inline-block'}}> Results for "{this.state.params.searchParam}" in&nbsp;
                        {this.state.params.country} from ${pricerange[0]} to ${pricerange[1]}
                    </p>
                </div>

                {this.state.results && this.state.results.length !== 0 ?
                    <table style={{marginTop: '20px'}}>
                        <thead>
                        { this.state.params && this.state.params.serviceName === 'skiResort' ?
                        <tr>
                            <th>Resort Name</th>
                            <th>Continent</th>
                            <th>Country</th>
                            <th>Province</th>
                            <th>Altitude (m)</th>
                            <th>Slope Rating (/5)</th>
                            <th>Adult Ticket Price ($)</th>
                            <th>Youth Ticket Price ($)</th>
                            <th>Child Ticket Price ($)</th>
                        </tr>
                        : this.state.params && this.state.params.serviceName === 'restaurants' ?
                            <tr>
                                <th>Restaurant Name</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th>Postal Code</th>
                            </tr>
                        : this.state.params && this.state.params.serviceName === 'museums' ?
                            <tr>
                                <th>Museum Name</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Address</th>
                                <th>Website</th>
                                <th>Type</th>
                            </tr>
                        : this.state.params && this.state.params.serviceName === 'companies' ?
                            <tr>
                                <th>Company Name</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Industry</th>
                                <th>Founded</th>
                                <th>Website</th>
                            </tr>
                        : null
                        }
                            </thead>
                        <tbody>
                        { this.state.results.map((result) => {
                            return this.state.params && this.state.params.serviceName === 'skiResort' ?
                                    <tr key={result.resortName + result.country} style={{}}>
                                        <td>
                                            {result.resortName}
                                        </td>
                                        <td>
                                            {result.continent}
                                        </td>
                                        <td>
                                            {result.country}
                                        </td>
                                        <td>
                                            {result.province}
                                        </td>
                                        <td>
                                            {result.altitude}
                                        </td>
                                        <td>
                                            {result.slopeRating}
                                        </td>
                                        <td>
                                            {result.adultTicketPrice}
                                        </td>
                                        <td>
                                            {result.youthTicketPrice}
                                        </td>
                                        <td>
                                            {result.childTicketPrice}
                                        </td>
                                    </tr>
                                : this.state.params && this.state.params.serviceName === 'restaurants' ?
                                    <tr key={Math.random().toString(36).substring(7)}>
                                        <td>
                                            {result.name}
                                        </td>
                                        <td>
                                            {result.city}
                                        </td>
                                        <td>
                                            {result.state}
                                        </td>
                                        <td>
                                            {result.address}
                                        </td>
                                        <td>
                                            {result.type}
                                        </td>
                                        <td>
                                            {result.postalCode}
                                        </td>
                                    </tr>
                                : this.state.params && this.state.params.serviceName === 'museums' ?
                                    <tr key={Math.random().toString(36).substring(7)}>
                                        <td>
                                            {result.museumName}
                                        </td>
                                        <td>
                                            {result.city}
                                        </td>
                                        <td>
                                            {result.state}
                                        </td>
                                        <td>
                                            {result.address}
                                        </td>
                                        <td>
                                            {result.museumURL}
                                        </td>
                                        <td>
                                            {result.museumType}
                                        </td>
                                    </tr>
                                :  this.state.params && this.state.params.serviceName === 'companies' ?
                                    <tr key={Math.random().toString(36).substring(7)}>
                                        <td>
                                            {result.company}
                                        </td>
                                        <td>
                                            {result.city}
                                        </td>
                                        <td>
                                            {result.state}
                                        </td>
                                        <td>
                                            {result.industry}
                                        </td>
                                        <td>
                                            {result.founded}
                                        </td>
                                        <td>
                                            {result.website}
                                        </td>
                                    </tr>
                                    : null
                        }) }
                        </tbody>
                    </table>
                : !this.state.loading && this.state.results !== [] ? <p>No results found.</p>
                    : <div>
                        <p>Searching...</p>
                        <ProgressBar mode="indeterminate" width="50%"/>
                    </div>
                }


            </div>
        );
    }
}

export default Microservice;
