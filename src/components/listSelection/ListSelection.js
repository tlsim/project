import React, {Component} from 'react';
import _ from 'lodash';
import './ListSelection.css';
import line from './line.svg';
import PropTypes from 'prop-types';

class ListSelection extends Component {
  startsWithLetter = str => {
    return str.match(/^[a-z]/i);
  };

  formattedItems = (() => {
    const items = Object.entries(
      _.groupBy(
        _.sortBy(this.props.items, 'name'),
        item =>
          this.startsWithLetter(item.name) ? item.name[0].toUpperCase() : '#'
      )
    );
    const offset = items[0][0] === '#' ? 64 : 65;
    for (let i = 65; i < 91; i++) {
      const expectedCharacter = String.fromCharCode(i);
      if (!items[i - offset] || items[i - offset][0] !== expectedCharacter)
        items.splice(i - offset, 0, [expectedCharacter, []]);
    }
    return items;
  })();

  render() {
    return (
      <div className="list-selection list-selection--body">
        <div className="list-selection list-selection--list">
          {this.props.items.length > 0 &&
            this.formattedItems.map(
              ([group, groupItems]) =>
                groupItems.length > 0 ? (
                  <div key={group} id={group}>
                    <p className="list-selection list-selection--list-text list-selection--list-text--group-header">
                      {group.toUpperCase()}
                    </p>
                    <img
                      src={line}
                      className="list-selection list-selection--group-splitter"
                      alt=""
                    />
                    {groupItems.map(item => (
                      <div
                        className={
                          'list-selection list-selection--list-item ' +
                          this.props.iconStyle +
                          '-holder'
                        }
                        key={item.id}
                        data-test={item.id}
                        onClick={() => this.props.onClick(item)}>
                        <img
                          className={
                            'list-selection list-selection--item-icon ' +
                            this.props.iconStyle
                          }
                          src={item.image}
                          alt=""
                        />
                        <p className="list-selection list-selection--list-text list-selection--list-text--item-name">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={group} />
                )
            )}
        </div>
        <div className="list-selection--scroll-select">
          {this.formattedItems.map(([group]) => (
            <div
              key={group}
              className="list-selection--scroll-select-element"
              onTouchStart={() => (window.location.hash = '#' + group)}>
              {group}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ListSelection.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconStyle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default ListSelection;
