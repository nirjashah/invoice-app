import React from "react";
import BaseWidget from "web-shell-core/widgets/BaseWidget";
import ApolloClient, {createNetworkInterface} from "apollo-client";
import {ApolloProvider, withApollo} from "react-apollo";
import CompanyLookupReserve from "./CompanyLookupReserve";
import HASelect from "hui-react/HASelect";
import HAItem from "hui-react/HAItem";

// Import the main Plugin.scss file so that it gets transpiled
import "../../../sass/apollo-v4-example.scss";

class Hello extends BaseWidget {

    constructor(props) {
        console.log("hello: " + Object.keys(props));
        super(props);
        // Initialize Apollo Client with URL to our server
        this.client = new ApolloClient({
            networkInterface: createNetworkInterface({uri: "http://127.0.0.1:8080/v4/graphql",
            /*opts: {
                credentials: "include"
            }*/
            credentials: "same-origin",
            headers: {
                cookie: "OAM_GITO=M1eWb+NY+asSpdu7Mxf1Hg==~0xoH5BjgtZvLolTRM1PoU8zV2V59eW3WNpCacIi+FSWd39WUIu4yDdH9TasKcrKenaDCQAKfCcGW6HSXgZpa/wdq4yLvAYY/yaGOemDiG7mFwx7bibqBY5ySoqfmcXGnXC0J+OPe61+kwfLzKqIy/XiryEiJ5uLcLqhtbM+R7l4vsbYtNbPTUMGWO2y796YK5O4y2Nc4yXipuvcai9QAJ7bbs1UW4lifZV9Jq+3sK/8=; qboeuid=127.0.0.1.1501693644803515; ivid_b=353438dd-7396-4f64-9206-1398e1d32b3f; ivid=7b4fbe58-1b7e-4280-9e62-6b871a7eeb03",
                host: "localhost:8443"
            }
            })
        });
    }

    componentDidMount() {
        this.ready();
        this.props.sandbox.logger.log("Hello widget mounted.");
    }

    /**
     * Builds list of general filter options to filter data on
     *
     * @param {Array} allOptions    Map of possible options to filter data on
     * @return {Array}              Returns list of HAItem tags of options from the param
     */
    getGeneralOptions(allOptions) {
        return allOptions.map((option) => {
            return (<HAItem key={option} value={option}>{option}</HAItem>);
        });
    }

    render() {
        const CompanyLookupReserveWithApollo = withApollo(CompanyLookupReserve);

        return (
          <div>
              <div>
                  <HASelect className="col-md-6" label="Environment" onChange={this.handleEnvChange} value={this.props.selectedEnvironment}
                      disabled={this.props.disabled}
                      data-automation="selectedEnvironment">
                      {this.getGeneralOptions(["E2E", "Silver"])}
                  </HASelect>
              </div>
              <div>
                  <ApolloProvider client={this.client}>
                      <CompanyLookupReserveWithApollo />
                  </ApolloProvider>
              </div>
          </div>
        );
    }
}

export default Hello;
