import React from "react";

class WriteHorseAuction extends React.Component {
  state = { stackId: null };

  constructor() {
    super();
    this.amountRef = React.createRef();
    this.durationRef = React.createRef();
  }

  componentDidMount(){
    this.amount = this.amountRef.current
    this.duration = this.durationRef.current
  }
  
  sellBundle(amount,duration){
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.HorseAuction;

    debugger
    //not sure what amount and duration are now if .value is needed

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["sell"].cacheSend(parseInt(amount),parseInt(duration), {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus(){
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    const that = this;
    return (
      <div>
        <label>Amount </label><input type="text" ref={this.amountRef}/>
        <label>Duration </label><input type="text" ref={this.durationRef}/>
        <input
          type="button"
          value="Focus the text input"
          onClick={ function(){ that.sellBundle(that.amount.value, that.duration.value) } }
        />
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default WriteHorseAuction;