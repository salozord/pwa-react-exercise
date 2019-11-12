import React, { Component } from 'react';

class CharacterCard extends Component {
    
    getLinks() {
        if (this.props.character.urls && this.props.character.urls.length > 0)
            return this.props.character.urls.map( (item, i) => <a key={i} className="card-link" href={item.url} target="_blank" rel="noopener noreferrer">{ item.type }</a>);
        else
            return (<p>No aditional links.</p>);
    }

    render() { 
        const c = this.props.character;
        let img = `${c.thumbnail.path}.${c.thumbnail.extension}`;
        //<div className="col-12 col-sm-6 col-md-4 col-lg-3">
        return (
            
                <div className="card mb-2">
                    <img src={img} alt={c.name + "Character"} className="card-img-top" />
                    <div className="card-body">
                        <h4 className="card-title">{ c.name }</h4>
                        <p className="card-text">{ c.description !== "" ? c.description : "No description to show." }</p>
                        {this.getLinks()}
                    </div>
                </div>
         );
    }
}
 
export default CharacterCard;