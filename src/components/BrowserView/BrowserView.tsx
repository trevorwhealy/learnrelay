import * as React from 'react'
import * as Relay from 'react-relay'
import BrowserRow from '../BrowserRow/BrowserRow'

interface Props {
  viewer: any
}

interface State {
  name: string
  url: string
}

class BrowserView extends React.Component<Props, State> {

  state = {
    name: '',
    url: '',
  }

  render() {
    return (
      <div style={{height: 280, padding: 20}}>
        <div className='flex'>
          <div className='ttu' style={{padding: '0 0 13px 13px', minWidth: '30%'}}>
            Pokemon-Id
          </div>
          <div className='ttu' style={{padding: '0 0 13px 13px', minWidth: '30%'}}>
            Name
          </div>
          <div className='ttu' style={{padding: '0 0 13px 13px', minWidth: '40%'}}>
            Image Url
          </div>
        </div>
        <div className='overflow-scroll' style={{height: 229, paddingBottom: 20}}>
        {this.props.viewer.allPokemons.edges.map((edge) => edge.node).map((node) => <BrowserRow key={node.id} pokemon={node}/>)}
          <div className='w-100 flex'>
            <input
              className='i bg-transparent'
              style={{minWidth: '30%', padding: '12px', boxSizing: 'border-box', border: '1px solid #E5E5E5', color: 'rgba(242,107,0,0.6)'}}
              value={'Add new Pokémon (id will be generated)'}
              disabled
            />
            <input
              className='bg-transparent'
              placeholder='insert Pokemon name'
              style={{minWidth: '30%', padding: '12px', boxSizing: 'border-box', border: '1px solid #E5E5E5', color: 'rgba(242,107,0,0.6)'}}
              value={this.state.name}
              onChange={(e: any) => this.setState({name: e.target.value} as State)}
            />
            <input
              className='bg-transparent'
              placeholder='insert an image url'
              style={{minWidth: '40%', padding: '12px', boxSizing: 'border-box', border: '1px solid #E5E5E5', color: 'rgba(242,107,0,0.6)'}}
              value={this.state.url}
              onChange={(e: any) => this.setState({url: e.target.value} as State)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(BrowserView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allPokemons (first: 1000) {
          edges {
            node {
              id
              ${BrowserRow.getFragment('pokemon')}
            }
          }
        }
      }
    `,
  },
})
