import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import { fetchCategories, selectCategory } from '../../actions/data';
import './style.scss';

class SideMenu extends Component {

    static propTypes = {
        categories: React.PropTypes.array.isRequired,
        subcategories: React.PropTypes.object,
        fetchCategories: React.PropTypes.func.isRequired,
        selectCategory: React.PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchCategories();
    }

    renderCategories() {
        return this.props.categories.map((item) => {
            const isSelected = item.selected ? 'active' : '';
            const hideSubcategories = (!item.selected || !this.props.subcategories[item.id]) ? 'hide' : '';

            return (
                <li key={item.id}
                    className={`side-menu__category ${isSelected}`}
                    onClick={() => { this.props.selectCategory(item); }}>
                    {item.name}
                    <ul className={`side-menu__subcategories ${hideSubcategories}`}>
                        {this.renderSubcategories(item.id)}
                    </ul>
                </li>
            );
        });
    }

    renderSubcategories(id) {
        if (!this.props.subcategories[id]) {
            return;
        }

        return this.props.subcategories[id].map((subitem) => {
            const isSelected = subitem.selected ? 'active' : '';
            return (
                <li key={subitem.id}
                    className={`side-menu__subcategory ${isSelected}`}
                    onClick={(event) => {
                        console.log(subitem.name, ' was selected ヽ(´▽`)/');
                        event.preventDefault();
                        event.stopPropagation();
                    }}>
                    {subitem.name}
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
        subcategories: state.data.subcategories
    };
}

export default connect(mapStateToProps, { fetchCategories, selectCategory })(SideMenu);
