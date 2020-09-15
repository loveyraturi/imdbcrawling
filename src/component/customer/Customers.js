import React, {Component} from 'react';
import axios from 'axios'
import ReactTooltip from "react-tooltip";
import ReactTable from "react-table";  
import "react-table/react-table.css" 

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }
handleHover(){
    this.setState(prevState => ({
        isHovered: !prevState.isHovered
    }));
}
  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('assets/myjsonfile.json').then(response => {
      this.setState({productList: response})
    })
  };

  render() {
    
    if (!this.state.productList)
      return (<p>Loading data</p>)
      console.log(this.state.productList.data)
    return (
      <div>
        {/* Add  ReactTooltip in the Cell only */}
        <ReactTooltip clickable={true} html={true} className="tiptool" place="right" type="success" effect="solid" />
        <ReactTable
          data={this.state.productList.data}
          columns={[
            {
              Header: "kickstarter",
              columns: [
                {
                  Header: "id",
                  accessor: "id",
                  Cell: (row) => {
                  return (<span data-tip={row.original["id"]}>{row.original["id"]}</span>);
                  }
                },{
                  Header: "Name",
                  accessor: "name",
                  Cell: (row) => {
                    return <span data-tip={row.original["name"]}>{row.original["name"]}</span>;
                  }
                },{
                  Header: "year",
                  accessor: "year",
                  Cell: (row) => {
                    return <span data-tip={row.original["year"]}>{row.original["year"]}</span>;
                  }
                },{
                  Header: "rating",
                  accessor: "rating",
                  Cell: (row) => {
                    return <span data-tip={row.original["rating"]}>{row.original["rating"]}</span>;
                  }
                }
              ]
            }
          ]}
          defaultPageSize={10}
          onPageSizeChange={() => {
            ReactTooltip.rebuild();
          }}
          className="-striped -highlight"
        />
        <br />
      </div>
    )
  }

}
