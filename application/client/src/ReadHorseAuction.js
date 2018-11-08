import React from "react";

class ReadHorseAuction extends React.Component {
  state = { dataKey: null };  

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.HorseAuction;
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.isOwner.cacheCall({from: this.props.drizzleState.accounts[0]});
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
    console.log(drizzle);
    console.log(drizzleState);
  }

  render() {
    // get the contract state from drizzleState
    const { HorseAuction } = this.props.drizzleState.contracts;

    debugger;

    // using the saved `dataKey`, get the variable we're interested in
    const myOwner = HorseAuction.isOwner[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myOwner && myOwner.value}</p>;
  }
}

export default ReadHorseAuction;