import React, { Component } from 'react';
import crypto from 'crypto';

import CharacterCard from './CharacterCard';

class CharacterList extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            characters: [],
            marvelURL: "https://gateway.marvel.com:443/v1/public/characters",
            ts: "marvelapi",
            publickey: "cc84d5cf2e62472f44c94ea879f0280f",
            privatekey: "2609a480c1ee2fb17626f2fc6a57440ba8e4fb64"
        };

        let md5 = crypto.createHash('md5');
        md5.update(`${this.state.ts}${this.state.privatekey}${this.state.publickey}`);
        this.hash = md5.digest('hex');
    }

    componentDidMount() {
        if(!navigator.onLine) {
            let all = localStorage.getItem('characters');
            if(all) {
                this.setState({ isLoading: false, characters: JSON.parse(all) });
            }
        }
        else {
            fetch(`${this.state.marvelURL}?ts=${this.state.ts}&hash=${this.hash}&apikey=${this.state.publickey}`)
                .then( res => res.json())
                .then( ans => { 
                    this.setState({ isLoading: false, characters: ans.data.results });
                    localStorage.setItem('characters', JSON.stringify(ans.data.results));
                })
                .catch((err) => this.setState({ isLoading: true }));
        }
    }

    showCharacters() {
        if(this.state.isLoading)
            return <h2>Loading . . .</h2>;
        else 
            return this.state.characters.map( (e, i) =>  <CharacterCard key={i} character={e} /> );
    }

    render() { 
        return (
            <div>
                <h1>Marvel Characters</h1>
                <div className="card-columns">
                    {this.showCharacters()}
                </div>
            </div>
        );
    }
}
 
export default CharacterList;