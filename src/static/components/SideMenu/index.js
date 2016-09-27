import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import { fetchCategories, fetchSubcategories, selectCategory } from '../../actions/data';
import './style.scss';

class SideMenu extends Component {

    static propTypes = {
        categories: React.PropTypes.array.isRequired,
        subcategories: React.PropTypes.array.isRequired,
        fetchCategories: React.PropTypes.func.isRequired,
        fetchSubcategories: React.PropTypes.func.isRequired,
        selectCategory: React.PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchCategories();
        this.props.fetchSubcategories();
    }

    renderCategories() {
        return this.props.categories.map((item) => {
            const subcategories = this.props.subcategories.filter((sub) => {
               return sub.enabled && sub.parentId === item.id;
            });
            const isSelected = item.selected ? 'active' : '';
            const hideSubcategories = (!item.selected || (subcategories.length === 0) ? 'hide' : '');

            return (
                <li key={item.id}
                    className={`side-menu__category ${isSelected}`}
                    onClick={() => { this.props.selectCategory(item); }}>

                    {item.name}

                    <ul className={`side-menu__subcategories ${hideSubcategories}`}>
                        {this.renderSubcategories(subcategories)}
                    </ul>
                </li>
            );
        });
    }

    renderSubcategories(subcategories) {
        // Don't return any subcategories if they haven't been requested yet
        // if (!this.props.subcategories[id]) {
        //     return [];
        // }
        return subcategories.map((sub) => {
            return (
                <li key={sub.id}
                    className={`side-menu__subcategory`}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}>
                    {sub.name}
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
                    <ul className="side-menu__categories">
                        <FlipMove enterAnimation="fade" leaveAnimation="fade">
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
        categories: state.data.categories,
        subcategories: state.data.subcategories,
    };
}

export default connect(mapStateToProps, { fetchCategories, fetchSubcategories, selectCategory })(SideMenu);
