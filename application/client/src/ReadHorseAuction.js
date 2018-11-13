import React from "react";

class ReadHorseAuction extends React.Component {
  state = { dataKey: null };  

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.HorseAuction;
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.isOwner.cacheCall({from: this.props.drizzleState.accounts[0]});
    contract.events.NewBundle({/* eventOptions */ }, (error, event) => {
      debugger;
      console.log(error, event);
  })
    .on('data', (event) => console.log(event))
    .on('changed', (event) => console.log(event))
    .on('error', (error) => console.log(error));
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { HorseAuction } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myOwner = HorseAuction.isOwner[this.state.dataKey];

    console.log(HorseAuction.events);

    // if it exists, then we display its value
    return <p>I am owner: {myOwner && myOwner.value}</p>;
  }
}

export default ReadHorseAuction;