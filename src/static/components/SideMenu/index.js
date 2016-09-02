import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import { fetchCategories, selectCategory } from '../../actions/data';
import './style.scss';

class SideMenu extends Component {

    static propTypes = {
        categories: React.PropTypes.array.isRequired,
        fetchCategories: React.PropTypes.func.isRequired,
        selectCategory: React.PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchCategories();
    }

    renderCategories() {
        return this.props.categories.map((item) => {
            return (
                <li key={item.id}
                    className={item.selected ? 'active' : ''}
                    onClick={() => { this.props.selectCategory(item); }}>
                    {item.name}
                </li>
            );
        });
    }

    render() {
        const hasCategories = () => {
            return this.props.categories.length > 0 ? '' : 'hide';
        };

        return (
            <div className="side-menu">
                <div className={`side-menu__content ${hasCategories()}`}>
                    <h2 className="side-menu__title">Categories</h2>
                    <ul>
                        <FlipMove staggerDelayBy={50} enterAnimation="fade" leaveAnimation="fade">
                            {this.renderCategories()}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.data.categories
    };
}

export default connect(mapStateToProps, { fetchCategories, selectCategory })(SideMenu);
