import React, {ChangeEvent} from "react";
import * as services from '../../backbone/services'

interface Props {
  onSave: (addresses: string[]) => void
  boxed: string[]
}

interface State {
  addresses: string[]
}

export function uniq<A>(array: A[]): A[] {
  return array.filter((v, i) => {
    return array.indexOf(v) === i;
  });
}

export class AddressesForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      addresses: uniq(this.props.boxed)
    }
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    this.props.onSave(this.state.addresses)
  }

  public async handleChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const value = e.target.value
    const web3 = await services.accountService.web3()
    const addresses = uniq(value.replace(/\s+/g, '').split(',').filter(smth => {
      return web3.utils.isAddress(smth)
    }))
    this.setState({
      addresses
    })
  }

  public render () {
    return <>
      <p>Please, use commas to separate the addresses:</p>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p><input type={"text"} onChange={this.handleChange.bind(this)} style={{width: '80%'}}/></p>
        <p>{this.state.addresses.join(', ')}</p>
        <p><button type={"submit"}>Save</button></p>
      <br/>
    </form>
      </>
  }
}
