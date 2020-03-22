import React from 'react';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {Growl} from 'primereact/growl';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.dropdownItems = [];

        this.state = {
            service: '',
            query: '',
            // ski resort
            skiResortCountry: '', // query = resortname
            skiResortMinPrice: '',
            skiResortMaxPrice: '',
            // companies
            companiesState: '',
            companiesFounded: '',  // query = company
            // museum
            museumState: '',
            museumAddress: '',
            museumCity: '',  // query = museumName
            // restaurants
            restaurantState: '',
            restaurantAddress: '',
            restaurantCity: '',  // query = restaurantName
            restaurantType: ''
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    componentDidMount() {
        console.log("Fetching dropdown items...");
        this.growl.show({severity: 'info', summary: 'Info', detail: 'Fetching live microservices...'});
        fetch('http://western01-gateway-pipeline.mybluemix.net/service/list', {
            mode: 'cors',
            headers: {'Access-Control-Allow-Origin': '*'},
            crossDomain:true,
            method: 'GET'
            })
            .then((res) => res.json())
            .then((data) => {
                //console.log("data = ", data);
                let items = [];
                console.log("Received dropdown items: ", data.responseBody);
                this.growl.show({severity: 'success', summary: 'Success', detail: 'Received live microservices'});
                if (data.responseBody){
                    if (data.responseBody.YP_SKIRESORT === 1){
                        items.push({label: 'Ski Resorts', value: 'skiResort'});
                    }
                    if (data.responseBody.YP_RESTAURANT === 1){
                        items.push({label: 'Restaurants', value: 'restaurants'});
                    }
                    if (data.responseBody.YP_MUSEUM === 1){
                        items.push({label: 'Museums', value: 'museums'});
                    }
                    if (data.responseBody.YP_COMPANY === 1){
                        items.push({label: 'Fortune Companies', value: 'companies'});
                    }
                }

                items.forEach((item) => {
                    this.dropdownItems.push(item);
                });

                this.forceUpdate();

            }).catch((err) => {
                this.growl.show({severity: 'error', summary: 'Error', detail: 'Error fetching microservices'});
                console.log("error fetching dropdown: ", err);
            });

        // fetch auth API
        axios({
            url: 'https://wesetern01-auth.mybluemix.net/user/signin',
            data: {
                email: "vatsalshah2210@gmail.com",
                password: "123456"
            },
            method: 'post'
        }).then((res) => {
            console.log("res = ", res);
        }).catch((err) => console.log("Error calling auth API: ", err));
    }

    handleSearchClick(){
        // serviceName:  ["skiResort", "restaurants", "museums", "companies"]
        let additionalQueries = "";
        if (this.state.service === 'skiResort'){
            additionalQueries = additionalQueries.concat("country=" + this.state.skiResortCountry,
                "&price=" + this.state.skiResortMinPrice + "-" + this.state.skiResortMaxPrice + "&resortname=" +
                this.state.query);
        }
        else if (this.state.service === 'restaurants'){
            additionalQueries = additionalQueries.concat("restaurantName=" + this.state.query + "&state=" +
                this.state.restaurantState + "&city=" + this.state.restaurantCity + "&address=" + this.state.restaurantAddress
                + "&type=" + this.state.restaurantType);
        }
        else if (this.state.service === 'museums'){
            additionalQueries = additionalQueries.concat("museumName=" + this.state.query + "&state=" + this.state.museumState +
            "&city=" + this.state.museumCity + "&address=" + this.state.museumCity);
        }
        else if (this.state.service === 'companies'){
            additionalQueries = additionalQueries.concat("companiesState=" + this.state.companiesState +
                "&companiesFounded=" + this.state.companiesFounded + "&company=" + this.state.query);
        }

        console.log("searchParam = ", additionalQueries);

        window.location='/microservice?serviceName=' + this.state.service +
            '&' + additionalQueries;
    }


    render(){
        return (
        <div>
            <Growl ref={(el) => this.growl = el} />
            <div style={{width: '50%', height: '85vh'}}>
                <div style={{position: 'relative', top: '40%', left: '50%', width: '100%'}}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-8">
                            <div className="p-inputgroup">
                                <div className='p-col-4 p-md-3' style={{width: '50%'}}>
                                    <Dropdown
                                        options={this.dropdownItems}
                                        value={this.state.service}
                                        onChange={(e) => {
                                            this.setState({service: e.value});
                                            console.log("service set to ", e.value);
                                        }}
                                        placeholder="Select service..." style={{maxWidth: '35%'}}
                                    />
                                </div>
                                <div className='p-col-8 p-md-3' style={{width: '100%'}}>
                                    <InputText
                                        placeholder={this.state.service === '' ? "Keywords..." : "Name..."}
                                        value={this.state.query}
                                        onChange={(e) => this.setState({query: e.target.value})}
                                    />
                                </div>
                                <div className={"p-col-2 p-md-2"}>
                                    <Button
                                        label="Search"
                                        disabled={this.state.service === ''}
                                        onClick={this.handleSearchClick}
                                    />
                                </div>
                            </div>
                            {
                                this.state.service === 'skiResort' ?
                                    <span>
                                        <InputText
                                            placeholder="Country..."
                                            value={this.state.skiResortCountry}
                                            onChange={(e) => this.setState({skiResortCountry: e.target.value})}
                                            style={{width: '30%', marginLeft: '25px'}}
                                        />
                                        <InputText
                                            placeholder="Min. Price $"
                                            value={this.state.skiResortMinPrice}
                                            onChange={(e) => this.setState({skiResortMinPrice: e.target.value})}
                                            style={{width: '18%'}}
                                            keyfilter={'int'}
                                        />
                                        <InputText
                                            placeholder="Max. Price $"
                                            value={this.state.skiResortMaxPrice}
                                            onChange={(e) => this.setState({skiResortMaxPrice: e.target.value})}
                                            style={{width: '18%'}}
                                            keyfilter={'int'}
                                        />
                                    </span>
                                    : null
                            }
                            {
                                this.state.service === 'companies' ?
                                    <span>
                                        <InputText
                                            placeholder="State"
                                            value={this.state.companiesState}
                                            onChange={(e) => this.setState({companiesState: e.target.value})}
                                            style={{width: '30%', marginLeft: '50px'}}
                                        />
                                        <InputText
                                           placeholder="Founded (year)"
                                           value={this.state.companiesFounded}
                                           onChange={(e) => this.setState({companiesFounded: e.target.value})}
                                           style={{width: '30%', marginLeft: '0px'}}
                                        />
                                    </span>
                                    : null
                            }
                            {
                                this.state.service === 'museums' ?
                                    <span>
                                        <InputText
                                            placeholder="State"
                                            value={this.state.museumState}
                                            onChange={(e) => this.setState({museumState: e.target.value})}
                                            style={{width: '25%', marginLeft: '50px'}}
                                        />
                                        <InputText
                                            placeholder="Address"
                                            value={this.state.museumAddress}
                                            onChange={(e) => this.setState({museumAddress: e.target.value})}
                                            style={{width: '25%', marginLeft: '0px'}}
                                        />
                                        <InputText
                                            placeholder="City"
                                            value={this.state.museumCity}
                                            onChange={(e) => this.setState({museumCity: e.target.value})}
                                            style={{width: '25%', marginLeft: '0px'}}
                                        />
                                    </span>
                                    : null
                            }
                            {
                                this.state.service === 'restaurants' ?
                                    <span>
                                        <InputText
                                            placeholder="State"
                                            value={this.state.restaurantState}
                                            onChange={(e) => this.setState({restaurantState: e.target.value})}
                                            style={{width: '25%', marginLeft: '50px'}}
                                        />
                                        <InputText
                                            placeholder="Address"
                                            value={this.state.restaurantAddress}
                                            onChange={(e) => this.setState({restaurantAddress: e.target.value})}
                                            style={{width: '22%', marginLeft: '0px'}}
                                        />
                                        <InputText
                                            placeholder="City"
                                            value={this.state.restaurantCity}
                                            onChange={(e) => this.setState({restaurantCity: e.target.value})}
                                            style={{width: '22%', marginLeft: '0px'}}
                                        />
                                        <InputText
                                            placeholder="Type"
                                            value={this.state.restaurantType}
                                            onChange={(e) => this.setState({restaurantType: e.target.value})}
                                            style={{width: '25%', marginLeft: '0px'}}
                                        />
                                    </span>
                                    : null
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>Western University</p>
            </div>
        </div>
    )};
}


export default Home;