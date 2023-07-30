import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ filter, handlerFilter }) {
  return (
    <label className={css.lable}>
      Find contacts by name or phone-number
      <input
        className={css.input}
        type="text"
        name="name"
        value={filter}
        onChange={handlerFilter}
      />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handlerFilter: PropTypes.func.isRequired,
};