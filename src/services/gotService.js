export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    getRes = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status : ${res.status}`)
        }
        return await res.json()
    }
    getAllCharacters = async () => {
        const res = await this.getRes('/characters?page=15&pageSize=10')
        return res.map(this._transformChar)
    }
    getChar = async (id) => {
        const character = await this.getRes(`/characters/${id}`);
        return this._transformChar(character)
    }

    getAllBooks = async () => {
        const res = await this.getRes('/books/');
        return res.map(this._transormBooks)
    }
    getBooks = async (id) => {
        const res = await this.getRes(`/books/${id}`);
        return this._transormBooks(res)
    }

    getAllHouses = async () => {
        const res = await this.getRes('/houses/');
        return res.map(this._transformHouses)
    }
    getHouses = async (id) => {
        const res = await this.getRes(`/houses/${id}`);
        return this._transformHouses(res)
    }

    isData(data) {
        if (data) {
            return data
        } else {
            return ' NO DATA'
        }
    }
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        // console.log(item.url)
        return item.url.match(idRegExp)[1];
    }

    _transformChar = (char) => {
        return {
            id: this._extractId(char),
            name: this.isData(char.name),
            gender: this.isData(char.gender),
            born: this.isData(char.born),
            died: this.isData(char.died),
            culture: this.isData(char.culture),
        }
    }
    _transformHouses = (house) => {
        return {
            id: this._extractId(house),
            name: this.isData(house.name),
            region: this.isData(house.region),
            words: this.isData(house.words),
            titles: this.isData(house.titles),
            overlord: this.isData(house.overlord),
            ancestralWeapons: this.isData(house.ancestralWeapons)
        }
    }

    _transormBooks = (book) => {
        return {
            id: this._extractId(book),
            name: this.isData(book.name),
            numberOfPages: this.isData(book.numberOfPages),
            publisher: this.isData(book.publisher),
            released: this.isData(book.released)
        }
    }

}