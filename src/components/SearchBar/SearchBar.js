import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSortByCange(sortByOption) {
        this.setState({sortBy: sortByOption});
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }

    handleTermChange(e) {
        this.setState({term: e.target.value});
    }

    handleLocationChange(e) {
        this.setState({location: e.target.value});
    }

    handleSearch(e) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            console.log('enter pressed');
            this.handleSearch(e);
        }
    }

    getSortByClass(sortByOption) {
        return this.state.sortBy === sortByOption ? 'active': '';
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
        return <li 
                 key={sortByOptionValue} 
                 className={this.getSortByClass(sortByOptionValue)}
                 onClick={this.handleSortByCange.bind(this, sortByOptionValue)}
                >
                    {sortByOption} 
                </li>
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" 
                            onChange={this.handleTermChange}
                    />
                    <input placeholder="Where?" 
                            onChange={this.handleLocationChange}
                    />
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearch} onKeyPress={this.handleKeyPress}>
                    <a>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;

